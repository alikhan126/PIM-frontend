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
    roles = [];
    products :any[];
    permissions :any[];
    categories :any[];
    totalRecords:number;
    temp = []
    closeResult: string;
    permission: string;
    perm: string;
    
    constructor(private modalService: NgbModal, private categoryService: CategoryService, private router: Router) {
    }
    ngOnInit() {                
        this.categoryService.getAll().subscribe(data => {
            this.rows = data;
            this.temp = data;

        });
        this.getCategories();
        this.getUserRole();
        this.getFieldsPermissions();

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
        let user=JSON.parse(localStorage.getItem('currentUser'));
        if (user.is_admin == false){
            this.permission = "Update";
            this.perm = "All";
            let cellvalue = this.titleCaseWord(cell);
            if(user.roles['categories'].includes(this.permission) || user.roles['categories'].includes(this.perm) || this.roles['categories'].includes(this.perm) || this.roles['categories'].includes(this.permission)){
                if(this.permissions.includes(cellvalue)){
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
                } else{
                    alert("You don't have access to edit " + cellvalue +" field!");
                }
            } else{
                alert("You don't have permission to edit categories!");
            }
        } else {
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
    }
    addCategory(){
        let user=JSON.parse(localStorage.getItem('currentUser'));
        if (user.is_admin == false){
            this.permission = "Create";
            this.perm = "All";
            if(user.roles['categories'].includes(this.permission) || user.roles['categories'].includes(this.perm) || this.roles['categories'].includes(this.perm) || this.roles['categories'].includes(this.permission)){
                this.router.navigate(['/categories/0']);
            } else {
                alert("You don't have permission to add the categories!");
            }
        } else {
            this.router.navigate(['/categories/0']);
        }
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

    getUserRole(){
        let user=JSON.parse(localStorage.getItem('currentUser'));
        this.categoryService.getUserRole(user.user_id).subscribe(data => {
          this.roles = data['role'];
      });
    }

    getFieldsPermissions(){
        let user=JSON.parse(localStorage.getItem('currentUser'));
        this.categoryService.getFieldPermissions(user.user_id).subscribe(data => {
            this.permissions = data.edit;
        })
    }

    updateRelationshipValue(value, cell, rowIndex) {
        let user=JSON.parse(localStorage.getItem('currentUser'));
        if (user.is_admin == false){
            this.permission = "Update";
            this.perm = "All";
            let cellvalue = "ParentCategory";
            if(user.roles['categories'].includes(this.permission) || user.roles['categories'].includes(this.perm) || this.roles['categories'].includes(this.perm) || this.roles['categories'].includes(this.permission)){
                if(this.permissions.includes(cellvalue)){
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
                } else {
                    alert("You don't have access to edit " + cellvalue +" field!");                    
                }
            } else {
                alert("You don't have permission to edit the categories!");
            }
        } else {
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
    }

    deleteCategory(event, cell, rowIndex) {
        let user=JSON.parse(localStorage.getItem('currentUser'));
        if (user.is_admin == false){
            this.permission = "Delete";
            this.perm = "All";
            if(user.roles['categories'].includes(this.permission) || user.roles['categories'].includes(this.perm) || this.roles['categories'].includes(this.perm) || this.roles['categories'].includes(this.permission)){
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
            } else {
                alert("You don't have permission to delete the categories!");
            }
        } else {
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

}