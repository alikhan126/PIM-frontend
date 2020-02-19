import { Component,OnInit } from '@angular/core';
import { PermissionService} from '../manufacturer-perm.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


declare var require: any;

@Component({
    selector: 'app-dt-editing',
    templateUrl: './perm-editing.component.html',
    styleUrls: ['./perm-editing.component.scss']
})

export class PermManufacturerEditComponent {
    editing = {};
    rows = [];
    products :any[];
    totalRecords:number;
    temp = [];
    roles =[];
    permission :string;
    closeResult: string;

    // @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;

    constructor(private modalService: NgbModal, private permissionService: PermissionService, private router: Router) {
    }
    ngOnInit() {
        this.getRoles();
        this.permissionService.getAll().subscribe(data => {
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

    MANUFACTURER_FIELD_CHOICES = [
        {name: 'Name'},
    ]

    // Editing content code
    updateValue(event, cell, rowIndex) {
        this.editing[rowIndex + '-' + cell] = false;
        this.permissionService.get(this.rows[rowIndex]['id']).subscribe(data => {
            this.rows[rowIndex] = data;
            this.rows[rowIndex][cell] = event.target.value;
            this.permissionService.update(this.rows[rowIndex]).subscribe(data => {
                this.permissionService.getAll().subscribe(data => {
                    this.rows = data;
                });
            });
        });
    }

    updateRelationship(value, cell, rowIndex) {
        this.editing[rowIndex + '-' + cell] = false;
        this.permissionService.get(this.rows[rowIndex]['id']).subscribe(data => {
            this.rows[rowIndex] = data;
            this.rows[rowIndex][cell] = value;
            this.permissionService.update(this.rows[rowIndex]).subscribe(data => {
                this.permissionService.getAll().subscribe(data => {
                    this.rows = data;
                });
            });
        });
    }

    updateRelationshipValue(value, cell, rowIndex) {
        this.editing[rowIndex + '-' + cell] = false;
        this.permissionService.get(this.rows[rowIndex]['id']).subscribe(data => {
            this.rows[rowIndex] = data;
            this.rows[rowIndex][cell] = value;
            this.permissionService.update(this.rows[rowIndex]).subscribe(data => {
                this.permissionService.getAll().subscribe(data => {
                    this.rows = data;
                });
            });
        });
    }

    deleteRole(event, cell, rowIndex) {
        this.editing[rowIndex + '-' + cell] = false;
        this.permissionService.get(this.rows[rowIndex]['id']).subscribe(data => {
            this.rows[rowIndex] = data;
            this.rows[rowIndex][cell] = event.target.value;
            this.permissionService.delete(this.rows[rowIndex]['id']).subscribe(data => {
                this.permissionService.getAll().subscribe(data => {
                    this.rows = data;
                });
            });
        });
    }

    addPerm(){
        this.router.navigate(['/fields/manufacturer/0']);

    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();

        const temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1;
        });

        // update the rows
        this.rows = temp;
    }

    getRoles(){
            this.permissionService.getAllRoles().subscribe(data => {
            this.roles = data;
        });
    }

}