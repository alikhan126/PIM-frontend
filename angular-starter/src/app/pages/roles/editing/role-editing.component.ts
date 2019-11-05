import { Component,OnInit } from '@angular/core';
import { RoleService} from '../roles.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


declare var require: any;

@Component({
    selector: 'app-dt-editing',
    templateUrl: './role-editing.component.html',
    styleUrls: ['./role-editing.component.scss']
})

export class RolesEditComponent {
    editing = {};
    rows = [];
    products :any[];
    totalRecords:number;
    temp = [];
    users =[];
    permission :string;
    closeResult: string;

    // @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;

    constructor(private modalService: NgbModal, private roleService: RoleService, private router: Router) {
    }
    ngOnInit() {
        this.getUsers();
        this.roleService.getAll().subscribe(data => {
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

    permissions = [
        {name: 'CAN_CREATE_PRDOUCTS'},
        {name: 'CAN_UPDATE_PRDOUCTS'},
        {name: 'CAN_DELETE_PRDOUCTS'},
        {name: 'CAN_CREATE_MANUFACTURER'},
        {name: 'CAN_UPDATE_MANUFACTURER'},
        {name: 'CAN_DELETE_MANUFACTURER'},
        {name: 'CAN_CREATE_BRANDS'},
        {name: 'CAN_UPDATE_BRANDS'},
        {name: 'CAN_DELETE_BRANDS'},
        {name: 'CAN_CREATE_CATALOGS'},
        {name: 'CAN_UPDATE_CATALOGS'},
        {name: 'CAN_DELETE_CATALOGS'},
        {name: 'CAN_CREATE_CATEGORY'},
        {name: 'CAN_UPDATE_CATEGORY'},
        {name: 'CAN_DELETE_CATEGORY'},
        {name: 'CAN_CREATE_TAGS'},
        {name: 'CAN_UPDATE_TAGS'},
        {name: 'CAN_DELETE_TAGS'},
        {name: 'CAN_CREATE_WEBSITE'},
        {name: 'CAN_UPDATE_WEBSITE'},
        {name: 'CAN_DELETE_WEBSITE'},
        {name: 'CAN_CREATE_IMAGES'},
        {name: 'CAN_UPDATE_IMAGES'},
        {name: 'CAN_DELETE_IMAGES'},
    ]

    // Editing content code
    updateValue(event, cell, rowIndex) {
        
        this.editing[rowIndex + '-' + cell] = false;
        this.roleService.get(this.rows[rowIndex]['id']).subscribe(data => {
            this.rows[rowIndex] = data;
            this.rows[rowIndex][cell] = event.target.value;
            this.roleService.update(this.rows[rowIndex]).subscribe(data => {
                this.roleService.getAll().subscribe(data => {
                    this.rows = data;
                });
            });
        });
    }

    updateRelationship(value, cell, rowIndex) {


        this.editing[rowIndex + '-' + cell] = false;
        this.roleService.get(this.rows[rowIndex]['id']).subscribe(data => {
            this.rows[rowIndex] = data;
            this.rows[rowIndex][cell] = value;
            this.roleService.update(this.rows[rowIndex]).subscribe(data => {
                this.roleService.getAll().subscribe(data => {
                    this.rows = data;
                });
            });
        });
    }

    updateRelationshipValue(value, cell, rowIndex) {
        this.editing[rowIndex + '-' + cell] = false;
        this.roleService.get(this.rows[rowIndex]['id']).subscribe(data => {
            this.rows[rowIndex] = data;
            this.rows[rowIndex][cell] = value;
            this.roleService.update(this.rows[rowIndex]).subscribe(data => {
                this.roleService.getAll().subscribe(data => {
                    this.rows = data;
                });
            });
        });
    }

    deleteRole(event, cell, rowIndex) {
        this.editing[rowIndex + '-' + cell] = false;
        this.roleService.get(this.rows[rowIndex]['id']).subscribe(data => {
            this.rows[rowIndex] = data;
            this.rows[rowIndex][cell] = event.target.value;
            this.roleService.delete(this.rows[rowIndex]['id']).subscribe(data => {
                this.roleService.getAll().subscribe(data => {
                    this.rows = data;
                });
            });
        });
    }

    addRole(){
        this.router.navigate(['/roles/0']);

    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();

        const temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val || d.manufacturer['name'].toLowerCase().indexOf(val) !== -1;
        });

        // update the rows
        this.rows = temp;
    }

    getUsers(){
            this.roleService.getAllUsers().subscribe(data => {
            this.users = data;
        });
    }

}