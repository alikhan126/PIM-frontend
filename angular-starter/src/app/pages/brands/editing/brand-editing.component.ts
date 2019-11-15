import { Component,OnInit } from '@angular/core';
import { BrandService} from '../brands.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


declare var require: any;

@Component({
    selector: 'app-dt-editing',
    templateUrl: './brand-editing.component.html',
    styleUrls: ['./brand-editing.component.scss']
})

export class BrandsEditComponent {
    editing = {};
    rows = [];
    products :any[];
    totalRecords:number;
    temp = [];
    manufacturers =[];
    permission :string;
    perm :string;
    closeResult: string;

    // @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;

    constructor(private modalService: NgbModal, private brandService: BrandService, private router: Router) {
    }
    ngOnInit() {
        this.getManufacturers();
        this.brandService.getAll().subscribe(data => {
            this.rows = data;
            this.temp = data
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
        this.permission = "Update";
        this.perm = "All";
        if(user.roles['brands'].includes(this.permission) || user.roles['brands'].includes(this.perm)){
            this.editing[rowIndex + '-' + cell] = false;
            this.brandService.get(this.rows[rowIndex]['id']).subscribe(data => {
                this.rows[rowIndex] = data;
                this.rows[rowIndex][cell] = event.target.value;
                this.brandService.update(this.rows[rowIndex]).subscribe(data => {
                    this.brandService.getAll().subscribe(data => {
                        this.rows = data;
                    });
                });
            });
        } else {
            alert("You don't have the permission to edit Brands!");
        }
    }

    updateRelationshipValue(value, cell, rowIndex) {
        let user=JSON.parse(localStorage.getItem('currentUser'));
        this.permission = "Update";
        this.perm = "All";
        if(user.roles['brands'].includes(this.permission) || user.roles['brands'].includes(this.perm)){
            this.editing[rowIndex + '-' + cell] = false;
            this.brandService.get(this.rows[rowIndex]['id']).subscribe(data => {
                this.rows[rowIndex] = data;
                this.rows[rowIndex][cell] = value;
                this.brandService.update(this.rows[rowIndex]).subscribe(data => {
                    this.brandService.getAll().subscribe(data => {
                        this.rows = data;
                    });
                });
            });
        } else {
            alert("You don't have the permission to edit Brands!");
        }
    }

    deleteBrand(event, cell, rowIndex) {
        let user=JSON.parse(localStorage.getItem('currentUser'));
        this.permission = "Delete";
        this.perm = "All";
        if(user.roles['brands'].includes(this.permission) || user.roles['brands'].includes(this.perm)){
            this.editing[rowIndex + '-' + cell] = false;
            this.brandService.get(this.rows[rowIndex]['id']).subscribe(data => {
                this.rows[rowIndex] = data;
                this.rows[rowIndex][cell] = event.target.value;
                this.brandService.delete(this.rows[rowIndex]['id']).subscribe(data => {
                    this.brandService.getAll().subscribe(data => {
                        this.rows = data;
                    });
                });
            });
        } else{
            alert("You don't have the permission to delete Brands!");

        }
    }

    addBrand(){
        let user=JSON.parse(localStorage.getItem('currentUser'));
        this.permission = "Create";
        this.perm = "All";
        if(user.roles['brands'].includes(this.permission) || user.roles['brands'].includes(this.perm)){
            this.router.navigate(['/brands/0']);
        } else{
            alert("You don't have the permission to add Brands!");
        }
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();

        const temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val || d.manufacturer['name'].toLowerCase().indexOf(val) !== -1;
        });

        // update the rows
        this.rows = temp;
    }

    getManufacturers(){
            this.brandService.getAllManufacturers().subscribe(data => {
            this.manufacturers = data;
        });
    }

}