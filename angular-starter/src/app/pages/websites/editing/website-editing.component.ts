import { Component,OnInit } from '@angular/core';
import { WebsiteService} from '../websites.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

declare var require: any;

@Component({
    selector: 'app-dt-editing',
    templateUrl: './website-editing.component.html',
    styleUrls: ['./website-editing.component.scss']
})

export class WebsitesEditComponent {
    editing = {};
    rows = [];
    products :any[];
    totalRecords:number;
    temp = [];
    closeResult: string;
    permission: string;

    constructor(private modalService: NgbModal, private websiteService: WebsiteService, private router: Router) {
    }
    ngOnInit() {
        this.websiteService.getAll().subscribe(data => {
            this.rows = data;
            this.temp = data;
            console.log(this.rows)
        });
    }

    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    // Editing content code
    updateValue(event, cell, rowIndex) {
        let user=JSON.parse(localStorage.getItem('currentUser'));
        this.permission = "CAN_UPDATE_WEBSITE";
        if(user.roles['permissions'].includes(this.permission)){
            this.editing[rowIndex + '-' + cell] = false;
            this.websiteService.get(this.rows[rowIndex]['id']).subscribe(data => {
                this.rows[rowIndex] = data;
                this.rows[rowIndex][cell] = event.target.value;
                this.websiteService.update(this.rows[rowIndex]).subscribe(data => {
                    this.websiteService.getAll().subscribe(data => {
                        this.rows = data;
                        console.log(this.rows)
                    });
                });
            });
        } else {
            alert("You don't have the permission to edit the websites")
        }
    }

    deleteWebsite(event, cell, rowIndex) {
        let user=JSON.parse(localStorage.getItem('currentUser'));
        this.permission = "CAN_CREATE_WEBSITE";
        if(user.roles['permissions'].includes(this.permission)){
            this.editing[rowIndex + '-' + cell] = false;
            this.websiteService.get(this.rows[rowIndex]['id']).subscribe(data => {
                this.rows[rowIndex] = data;
                console.log("test", this.rows[rowIndex]['id'])
                this.rows[rowIndex][cell] = event.target.value;
                this.websiteService.delete(this.rows[rowIndex]['id']).subscribe(data => {
                    this.websiteService.getAll().subscribe(data => {
                        this.rows = data;
                        console.log(this.rows)
                    });
                });
            });
        } else {
            alert("You don't have the permission to delete the websites")
        }
    }

    addWebsite(){
        let user=JSON.parse(localStorage.getItem('currentUser'));
        this.permission = "CAN_CREATE_WEBSITE";
        if(user.roles['permissions'].includes(this.permission)){
            this.router.navigate(['/websites/0']);
        } else {
            alert("You don't have the permission to add the websites")
        }       
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
    
        const temp = this.temp.filter(function (d) {
            return d.url.toLowerCase().indexOf(val) !== -1 || !val;
        });
    
        // update the rows
        this.rows = temp;
    }
}