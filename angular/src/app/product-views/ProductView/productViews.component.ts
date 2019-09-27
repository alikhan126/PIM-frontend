import { Component,OnInit } from '@angular/core';
import { ProductService} from '../../pages/products/products.service';
import { Router } from '@angular/router';

declare var require: any;
// const data: any = require('../../shared/data/company.json');

@Component({
    selector: 'app-dt-basic',
    templateUrl: './productViews.component.html',
    styleUrls: ['./productViews.component.scss']
})

export class ProductViewsComponent {
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
        { name: 'amount' },
        { name: 'description' },
        { name: 'taxClassName' },
        { name: 'shortDescription' },
        { name: 'weight' },
        { name: 'productsOnline' },
        { name: 'visibility' },
        { name: 'price' },
        { name: 'specialPrice' },
        { name: 'specialPriceFromDate' },
        { name: 'specialPriceToDate' },
        { name: 'metaTitle' },
        { name: 'metaKeywords' },
        { name: 'metaDescription' },
        { name: 'mapPrice' },
    ];

    // constructor() {
    //     this.rows = data;
    //     setTimeout(() => { this.loadingIndicator = false; }, 1500);
    // }

    getRowHeight(row) {
      return row.height;
    }
}
