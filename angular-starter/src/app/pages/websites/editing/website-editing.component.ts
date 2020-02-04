import { Component,OnInit } from '@angular/core';
import { WebsiteService} from '../websites.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NGXToastrService } from 'app/shared/services/toastr.service';

declare var require: any;

@Component({
    selector: 'app-dt-editing',
    templateUrl: './website-editing.component.html',
    styleUrls: ['./website-editing.component.scss']
})

export class WebsitesEditComponent {
    editing = {};
    rows = [];
    roles = [];
    products :any[];
    totalRecords:number;
    temp = [];
    closeResult: string;
    permission: string;
    perm: string;
    patternUrl='(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    regex = RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
    constructor(private ts:NGXToastrService, private modalService: NgbModal, private websiteService: WebsiteService, private router: Router) {
    }
    ngOnInit() {
        this.getUserRole();
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

    titleCaseWord(word: string) {
        if (!word) return word;
        return word[0].toUpperCase() + word.substr(1).toLowerCase();
    }

    // Editing content code
    updateValue(event, cell, rowIndex) {
        if(cell =='url' && !this.regex.test(event.target.value) ){
            this.ts.typeError('Validation Failed','Please enter a valid url');
            this.editing[rowIndex + '-' + cell] = false;
            return;
        }
        let user=JSON.parse(localStorage.getItem('currentUser'));
        if (user.is_admin == false){
            this.permission = "Update";
            this.perm = "All";
            let cellvalue = this.titleCaseWord(cell);
            if(this.roles['websites'].includes(this.perm) || this.roles['websites'].includes(this.permission)){
                this.websiteService.getFieldPermissions(user.role).subscribe(data => {
                    if(data[0].edit.includes(cellvalue)){
                        this.editing[rowIndex + '-' + cell] = false;
                        this.websiteService.get(this.rows[rowIndex]['id']).subscribe(data => {
                            this.rows[rowIndex] = data;
                            this.rows[rowIndex][cell] = event.target.value;
                            this.websiteService.update(this.rows[rowIndex]).subscribe(data => {
                                this.ts.typeSuccessCustom("Success","Your website request is submitted for Admin's approval")
                                this.websiteService.getAll().subscribe(data => {
                                    this.rows = data;
                                });
                            });
                        });
                    } else {
                        this.ts.typeError('Forbidden!',"You don't have access to edit " + cellvalue +" field!")
                    }
                });
            } else {
                this.ts.typeError('Forbidden',"You don't have the permission to edit the websites")
            }
        } else {
            this.editing[rowIndex + '-' + cell] = false;
            this.websiteService.get(this.rows[rowIndex]['id']).subscribe(data => {
                this.rows[rowIndex] = data;
                this.rows[rowIndex][cell] = event.target.value;
                this.websiteService.update(this.rows[rowIndex]).subscribe(data => {
                    this.websiteService.getAll().subscribe(data => {
                        this.rows = data;
                    });
                });
            });
        }
    }

    deleteWebsite(event, cell, rowIndex) {
        let user=JSON.parse(localStorage.getItem('currentUser'));
        if (user.is_admin == false){
            this.permission = "Delete";
            this.perm = "All";
            if(this.roles['websites'].includes(this.perm) || this.roles['websites'].includes(this.permission)){
                this.editing[rowIndex + '-' + cell] = false;
                this.websiteService.get(this.rows[rowIndex]['id']).subscribe(data => {
                    this.rows[rowIndex] = data;
                    this.rows[rowIndex][cell] = event.target.value;
                    this.websiteService.delete(this.rows[rowIndex]['id']).subscribe(data => {
                        this.ts.typeSuccessCustom("Success","Your website request is submitted for Admin's approval")
                        this.websiteService.getAll().subscribe(data => {
                            this.rows = data;
                        });
                    });
                });
            } else {
                this.ts.typeError('Forbidden!',"You don't have the permission to delete the websites")
            }
        } else {
            this.editing[rowIndex + '-' + cell] = false;
            this.websiteService.get(this.rows[rowIndex]['id']).subscribe(data => {
                this.rows[rowIndex] = data;
                this.rows[rowIndex][cell] = event.target.value;
                this.websiteService.delete(this.rows[rowIndex]['id']).subscribe(data => {
                    this.websiteService.getAll().subscribe(data => {
                        this.rows = data;
                    });
                });
            });
        }
    }

    addWebsite(){
        let user=JSON.parse(localStorage.getItem('currentUser'));
        if (user.is_admin == false) {
            this.permission = "Create";
            this.perm = "All";
            if(this.roles['websites'].includes(this.perm) || this.roles['websites'].includes(this.permission)){
                this.router.navigate(['/websites/0']);
            } else {
                alert("You don't have the permission to add the websites")
            }
        } else{
            this.router.navigate(['/websites/0']);
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

    getUserRole(){
        let user=JSON.parse(localStorage.getItem('currentUser'));
        this.websiteService.getUserRole(user.user_id).subscribe(data => {
          this.roles = data['role'];
      });
    }
}