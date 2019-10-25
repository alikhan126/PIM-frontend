import { Component,OnInit } from '@angular/core';
import { BrandService} from '../brands.service';
import { Router } from '@angular/router';

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


    // @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;

    constructor(private brandService: BrandService, private router: Router) {
    }
    ngOnInit() {
        this.getManufacturers();
        this.brandService.getAll().subscribe(data => {
            this.rows = data;
            this.temp = data
        });
    }

    // Editing content code
    updateValue(event, cell, rowIndex) {
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
    }

    updateRelationshipValue(value, cell, rowIndex) {
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
    }

    deleteBrand(event, cell, rowIndex) {
        this.editing[rowIndex + '-' + cell] = false;
        this.brandService.get(this.rows[rowIndex]['id']).subscribe(data => {
            this.rows[rowIndex] = data;
            this.rows[rowIndex][cell] = event.target.value;
            this.brandService.delete(this.rows[rowIndex]['id']).subscribe(data => {
                this.brandService.getAll().subscribe(data => {
                    this.rows = data;
                    console.log(this.rows)
                });
            });
        });
    }

    addBrand(){
        this.router.navigate(['/brands/0']);

    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();

        const temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });

        // update the rows
        this.rows = temp;
    }

    getManufacturers(){
            this.brandService.getAllManufacturers().subscribe(data => {
            this.manufacturers = data;
            console.log(this.manufacturers)

        });
    }

}