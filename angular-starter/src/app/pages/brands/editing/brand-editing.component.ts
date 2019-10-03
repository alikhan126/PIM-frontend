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
    constructor(private brandService: BrandService, private router: Router) {
    }
    ngOnInit() {
        this.brandService.getAll().subscribe(data => {
            this.rows = data;
            console.log(this.rows)
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
                    console.log(this.rows)
                });
            });
        });
    }

    addBrand(){
        this.router.navigate(['/brands/0']);

    }

}