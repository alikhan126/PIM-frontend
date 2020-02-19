import { Component,OnInit } from '@angular/core';
import { ProductService} from '../products.service';
import { Router } from '@angular/router';

declare var require: any;

@Component({
    selector: 'app-dt-editing',
    templateUrl: './product-editing.component.html',
    styleUrls: ['./product-editing.component.scss']
})

export class ProductsEditsComponent {
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

    // Editing content code
    updateValue(event, cell, rowIndex) {
        this.editing[rowIndex + '-' + cell] = false;
        this.productService.get(this.rows[rowIndex]['id']).subscribe(data => {
            this.rows[rowIndex] = data;
            this.rows[rowIndex][cell] = event.target.value;
            this.productService.update(this.rows[rowIndex]).subscribe(data => {
                this.productService.getAll().subscribe(data => {
                    this.rows = data['results'];
                    console.log(this.rows)
                });
            });
        });
    }

    addProduct(){
        this.router.navigate(['/products/0']);

    }

}