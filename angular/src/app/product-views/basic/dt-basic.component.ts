import { Component,OnInit } from '@angular/core';
import { ProductService} from '../../pages/products/products.service';
import { Router } from '@angular/router';

declare var require: any;
declare var require: any;
// const data: any = require('../../shared/data/company.json');

@Component({
    selector: 'app-dt-basic',
    templateUrl: './dt-basic.component.html',
    styleUrls: ['./dt-basic.component.scss']
})

export class DTBasicComponent {
    editing = {};
    rows = [];
    products :any[];
    totalRecords:number;
    constructor(private productService: ProductService, private router: Router) {
    }
    ngOnInit() {
        this.productService.getAll().subscribe(data => {
            this.rows = data['results'];
            console.log(this.rows)
        });
    }
    loadingIndicator: boolean = true;
    reorderable: boolean = true;

    // DataTable Content Titles
    columns = [
        { prop: 'name' },
        { name: 'Type' },
        { name: 'SKU' },
        { name: 'MPN' },
        { name: 'EAN' },
        { name: 'productStatus' },
        { name: 'amount' }
    ];

    // constructor() {
    //     this.rows = data;
    //     setTimeout(() => { this.loadingIndicator = false; }, 1500);
    // }

    getRowHeight(row) {
      return row.height;
    }
}
