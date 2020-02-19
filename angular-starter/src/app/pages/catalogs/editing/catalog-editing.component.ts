import { Component,OnInit } from '@angular/core';
import { CatalogService} from '../catalogs.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NGXToastrService } from 'app/shared/services/toastr.service';

declare var require: any;

@Component({
    selector: 'app-dt-editing',
    templateUrl: './catalog-editing.component.html',
    styleUrls: ['./catalog-editing.component.scss']
})

export class CatalogsEditComponent {
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
    constructor(private ts:NGXToastrService, private modalService: NgbModal, private catalogService: CatalogService, private router: Router) {
    }
    ngOnInit() {
        this.getUserRole();
        this.catalogService.getAll().subscribe(data => {
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
            // if(user.roles['websites'].includes(this.permission) || user.roles['websites'].includes(this.perm) || this.roles['websites'].includes(this.perm) || this.roles['websites'].includes(this.permission)){
                // this.catalogService.getFieldPermissions(user.user_id).subscribe(data => {
                    // if(data.edit.includes(cellvalue)){
            this.editing[rowIndex + '-' + cell] = false;
            this.catalogService.get(this.rows[rowIndex]['id']).subscribe(data => {
                this.rows[rowIndex] = data;
                this.rows[rowIndex][cell] = event.target.value;
                this.catalogService.update(this.rows[rowIndex]).subscribe(data => {
                    this.catalogService.getAll().subscribe(data => {
                        this.rows = data;
                    });
                });
            });
                //     } else {
                //         this.ts.typeError('Forbidden!',"You don't have access to edit " + cellvalue +" field!")
                //     }
                // });
            // } else {
            //     this.ts.typeError('Forbidden',"You don't have the permission to edit the websites")
            // }
        } else {
            this.editing[rowIndex + '-' + cell] = false;
            this.catalogService.get(this.rows[rowIndex]['id']).subscribe(data => {
                this.rows[rowIndex] = data;
                this.rows[rowIndex][cell] = event.target.value;
                this.catalogService.update(this.rows[rowIndex]).subscribe(data => {
                    this.catalogService.getAll().subscribe(data => {
                        this.rows = data;
                        console.log(this.rows)
                    });
                });
            });
        }
    }

    deleteCatalog(event, cell, rowIndex) {
        let user=JSON.parse(localStorage.getItem('currentUser'));
        if (user.is_admin == false){
            this.permission = "Delete";
            this.perm = "All";
            // if(user.roles['websites'].includes(this.permission) || user.roles['websites'].includes(this.perm) || this.roles['websites'].includes(this.perm) || this.roles['websites'].includes(this.permission)){
            this.editing[rowIndex + '-' + cell] = false;
            this.catalogService.get(this.rows[rowIndex]['id']).subscribe(data => {
                this.rows[rowIndex] = data;
                this.rows[rowIndex][cell] = event.target.value;
                this.catalogService.delete(this.rows[rowIndex]['id']).subscribe(data => {
                    this.catalogService.getAll().subscribe(data => {
                        this.rows = data;
                        console.log(this.rows)
                    });
                });
            });
            // } else {
            //     this.ts.typeError('Forbidden!',"You don't have the permission to delete the websites")
            // }
        } else {
            this.editing[rowIndex + '-' + cell] = false;
            this.catalogService.get(this.rows[rowIndex]['id']).subscribe(data => {
                this.rows[rowIndex] = data;
                this.rows[rowIndex][cell] = event.target.value;
                this.catalogService.delete(this.rows[rowIndex]['id']).subscribe(data => {
                    this.catalogService.getAll().subscribe(data => {
                        this.rows = data;
                        console.log(this.rows)
                    });
                });
            });
        }
    }

    addCatalog(){
        this.router.navigate(['/websites/0']);
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
        this.catalogService.getUserRole(user.user_id).subscribe(data => {
          this.roles = data['role'];
      });
    }
}