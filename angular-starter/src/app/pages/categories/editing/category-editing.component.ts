import { Component,OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


declare var require: any;

@Component({
    selector: 'app-dt-editing',
    templateUrl: './category-editing.component.html',
    styleUrls: ['./category-editing.component.scss']
})

export class CategoryEditComponent {
    editing = {};
    rows = [];
    products :any[];
    categories :any[];
    totalRecords:number;
    temp = []
    closeResult: string;
    
    constructor(private modalService: NgbModal, private categoryService: CategoryService, private router: Router) {
    }
    ngOnInit() {                
        this.categoryService.getAll().subscribe(data => {
            this.rows = data;
            this.temp = data;

        });
        this.getCategories();

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
        this.editing[rowIndex + '-' + cell] = false;
        this.categoryService.get(this.rows[rowIndex]['id']).subscribe(data => {
            this.rows[rowIndex] = data;
            this.rows[rowIndex][cell] = event.target.value;
            this.categoryService.update(this.rows[rowIndex]).subscribe(data => {
                this.categoryService.getAll().subscribe(data => {
                    this.rows = data;
                });
            });
        });
    }

    addCategory(){
        this.router.navigate(['/categories/0']);

    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
    
        const temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
    
        // update the rows
        this.rows = temp;
    }

    getCategories(){
            this.categoryService.getAllCategories().subscribe(data => {
            this.categories = data;
            console.log(this.categories)
        });
    }

    updateRelationshipValue(value, cell, rowIndex) {
        this.editing[rowIndex + '-' + cell] = false;
        this.categoryService.get(this.rows[rowIndex]['id']).subscribe(data => {
            this.rows[rowIndex] = data;
            this.rows[rowIndex][cell] = value;
            this.categoryService.update(this.rows[rowIndex]).subscribe(data => {
                this.categoryService.getAll().subscribe(data => {
                    this.rows = data;
                    console.log(this.rows)
                });
            });
        });
    }

    deleteCategory(event, cell, rowIndex) {
        this.editing[rowIndex + '-' + cell] = false;
        this.categoryService.get(this.rows[rowIndex]['id']).subscribe(data => {
            this.rows[rowIndex] = data;
            this.rows[rowIndex][cell] = event.target.value;
            this.categoryService.delete(this.rows[rowIndex]['id']).subscribe(data => {
                this.categoryService.getAll().subscribe(data => {
                    this.rows = data;
                    console.log(this.rows)
                });
            });
        });
    }

}