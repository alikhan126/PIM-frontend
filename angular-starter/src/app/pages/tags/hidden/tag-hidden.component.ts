import { Component,OnInit } from '@angular/core';
import { TagService } from '../tags.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

declare var require: any;

@Component({
    selector: 'app-dt-hidden',
    templateUrl: './tag-hidden.component.html',
    styleUrls: ['./tag-hidden.component.scss']
})

export class TagHiddenComponent {
    editing = {};
    rows = [];
    roles = [];
    products :any[];
    totalRecords:number;
    temp = [];
    closeResult: string;
    permission: string;
    perm: string;

    constructor(private modalService: NgbModal, private tagService: TagService, private router: Router) {
    }
    ngOnInit() {
        this.getUserRole();
        this.tagService.getAllHidden().subscribe(data => {
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
        let user=JSON.parse(localStorage.getItem('currentUser'));
        if (user.is_admin == false){
            this.permission = "Update";
            this.perm = "All";
            let cellvalue = this.titleCaseWord(cell);
            if(user.roles['tags'].includes(this.permission) || user.roles['tags'].includes(this.perm) || this.roles['tags'].includes(this.perm) || this.roles['tags'].includes(this.permission) ){
                this.tagService.getFieldPermissions(user.user_id).subscribe(data => {
                    if(data.edit.includes(cellvalue)){
                        this.editing[rowIndex + '-' + cell] = false;
                        this.tagService.get(this.rows[rowIndex]['id']).subscribe(data => {
                            this.rows[rowIndex] = data;
                            this.rows[rowIndex][cell] = event.target.value;
                            this.tagService.update(this.rows[rowIndex]).subscribe(data => {
                                this.tagService.getAllHidden().subscribe(data => {
                                    this.rows = data;
                                    console.log(this.rows)
                                });
                            });
                        });
                    } else{
                        alert("You don't have access to edit " + cellvalue +" field!");
                    }
                });
            } else {
                alert("You don't have access to edit tag!");
            }
        } else {
            this.editing[rowIndex + '-' + cell] = false;
            this.tagService.get(this.rows[rowIndex]['id']).subscribe(data => {
                this.rows[rowIndex] = data;
                this.rows[rowIndex][cell] = event.target.value;
                this.tagService.update(this.rows[rowIndex]).subscribe(data => {
                    this.tagService.getAllHidden().subscribe(data => {
                        this.rows = data;
                        console.log(this.rows)
                    });
                });
            });
        }
    }    

    deletetag(event, cell, rowIndex) {
        let user=JSON.parse(localStorage.getItem('currentUser'));
        if (user.is_admin == false){
            this.permission = "Delete";
            this.perm = "All";
            if(user.roles['tags'].includes(this.permission) || user.roles['tags'].includes(this.perm) || this.roles['tags'].includes(this.perm) || this.roles['tags'].includes(this.permission)){
                this.editing[rowIndex + '-' + cell] = false;
                this.tagService.get(this.rows[rowIndex]['id']).subscribe(data => {
                    this.rows[rowIndex] = data;
                    this.rows[rowIndex][cell] = event.target.value;
                    this.tagService.delete(this.rows[rowIndex]['id']).subscribe(data => {
                        this.tagService.getAllHidden().subscribe(data => {
                            this.rows = data;
                            console.log(this.rows)
                        });
                    });
                });
            } else {
                alert("You don't have access to delete tag!");
            }
        } else {
            this.editing[rowIndex + '-' + cell] = false;
            this.tagService.get(this.rows[rowIndex]['id']).subscribe(data => {
                this.rows[rowIndex] = data;
                this.rows[rowIndex][cell] = event.target.value;
                this.tagService.delete(this.rows[rowIndex]['id']).subscribe(data => {
                    this.tagService.getAllHidden().subscribe(data => {
                        this.rows = data;
                        console.log(this.rows)
                    });
                });
            });
        }
    }

    approveTag(event, cell, rowIndex) {
        let user=JSON.parse(localStorage.getItem('currentUser'));
        if (user.is_admin == false){ 
            alert("Only admin can approve this Tag.");
        } else {
            this.editing[rowIndex + '-' + cell] = false;
            this.tagService.get(this.rows[rowIndex]['id']).subscribe(data => {
                let result = data;
                result['hidden'] = false
                this.tagService.update(result).subscribe(data => {
                    this.tagService.getAllHidden().subscribe(data => {
                        this.rows = data;
                    });
                });
            });
        }
    }

    addTag(){
        let user=JSON.parse(localStorage.getItem('currentUser'));
        if (user.is_admin == false){
            this.permission = "Create";
            this.perm = "All";
            if(user.roles['tags'].includes(this.permission) || user.roles['tags'].includes(this.perm) || this.roles['tags'].includes(this.perm) || this.roles['tags'].includes(this.permission)){
                this.router.navigate(['/tags/0']);
            } else {
                alert("You don't have access to add tag!");
            }
        } else {
            this.router.navigate(['/tags/0']);
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

    getUserRole(){
        let user=JSON.parse(localStorage.getItem('currentUser'));
        this.tagService.getUserRole(user.user_id).subscribe(data => {
          this.roles = data['role'];
      });
    }

}