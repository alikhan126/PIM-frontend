import { Component,OnInit } from '@angular/core';
import { ProductService} from '../products.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-extended-table',
    templateUrl: './extended-table.component.html',
    styleUrls: ['./extended-table.component.scss']
})

export class ExtendedTableComponent implements OnInit {
  
    products :any[];
    totalRecords:number;
    constructor(public productService: ProductService, private router: Router) {
    }
    ngOnInit() {
        this.productService.getAll().subscribe(data => {
            this.products = data['results'];
            console.log(this.products)
            this.totalRecords = data['count'];
        });
    }


    editProduct(id){
        alert(id)
    }

}