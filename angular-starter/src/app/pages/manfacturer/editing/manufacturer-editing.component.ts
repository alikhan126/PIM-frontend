import { Component,OnInit } from '@angular/core';
import { ManufacturerService } from '../manufacturer.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

declare var require: any;

@Component({
    selector: 'app-dt-editing',
    templateUrl: './manufacturer-editing.component.html',
    styleUrls: ['./manufacturer-editing.component.scss']
})

export class ManufacturerEditComponent {
    editing = {};
    rows = [];
    products :any[];
    totalRecords:number;
    temp = [];
    closeResult: string;

    constructor(private modalService: NgbModal, private manufacturerService: ManufacturerService, private router: Router) {
    }
    ngOnInit() {
        this.manufacturerService.getAll().subscribe(data => {
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
        this.editing[rowIndex + '-' + cell] = false;
        this.manufacturerService.get(this.rows[rowIndex]['id']).subscribe(data => {
            this.rows[rowIndex] = data;
            this.rows[rowIndex][cell] = event.target.value;
            this.manufacturerService.update(this.rows[rowIndex]).subscribe(data => {
                this.manufacturerService.getAll().subscribe(data => {
                    this.rows = data;
                    console.log(this.rows)
                });
            });
        });
    }

    deleteManufacturer(event, cell, rowIndex) {
        this.editing[rowIndex + '-' + cell] = false;
        this.manufacturerService.get(this.rows[rowIndex]['id']).subscribe(data => {
            this.rows[rowIndex] = data;
            this.rows[rowIndex][cell] = event.target.value;
            this.manufacturerService.delete(this.rows[rowIndex]['id']).subscribe(data => {
                this.manufacturerService.getAll().subscribe(data => {
                    this.rows = data;
                    console.log(this.rows)
                });
            });
        });
    }

    addManfacturer(){
        this.router.navigate(['/manufacturer/0']);

    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
    
        const temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
    
        // update the rows
        this.rows = temp;
    }

}