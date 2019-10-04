import { Component,OnInit } from '@angular/core';
import { ProductService} from '../products.service';
import { Router } from '@angular/router';

declare var require: any;

@Component({
    selector: 'app-dt-editing',
    templateUrl: './product-editing.component.html',
    styleUrls: ['./product-editing.component.scss']
})

export class ProductsEditComponent {

    images:any=[];
    websites:any=[];
    tags:any=[];
    brands:any=[];
    categories:any=[];
    productFamilies:any=[];
    taxes:any=[];  
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
        this.getImages();
        this.getWebsites();
        this.getTags();
        this.getBrands();
        this.getCategories();
    }



    getValues(values,key){
        let valArray=[];
        values.map(value=> valArray.push(value[key]));
        return valArray.join(" , ");
    }
    
    

    getIds(values){
        let valArray=[];
        values.map(value=> valArray.push(value.id));
        return valArray;
    }

    // Editing content code
    updateValue(event, cell, rowIndex) {
        this.editing[rowIndex + '-' + cell] = false;
        this.productService.get(this.rows[rowIndex]['id']).subscribe(data => {
            this.rows[rowIndex] = data;
            this.rows[rowIndex][cell] = event.target.value;
            // this.productService.update(this.rows[rowIndex]).subscribe(data => {
            //     this.productService.getAll().subscribe(data => {
            //         this.rows = data['results'];
            //         console.log(this.rows)
            //     });
            // });
        });
    }


    updateRelationshipValue(value, cell, rowIndex) {
        this.editing[rowIndex + '-' + cell] = false;
        this.productService.get(this.rows[rowIndex]['id']).subscribe(data => {
            this.rows[rowIndex] = data;
            this.rows[rowIndex][cell] = value;
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


    

  goToProducts(){
    this.router.navigate(['/products']);

}


getImages(){
  this.productService.getAllImages().subscribe(data => {
    this.images = data;

});
}

getCategories(){
  this.productService.getAllCategories().subscribe(data => {
    this.categories = data;
});
}
getTags(){
  this.productService.getAllTags().subscribe(data => {
    this.tags = data;
});
}
getBrands(){
  this.productService.getAllBrands().subscribe(data => {
    this.brands = data;
});
}

getWebsites(){
  this.productService.getAllWebsites().subscribe(data => {
    this.websites = data;
});
}

getProductFamilies(){
  this.productService.getAllProductFamilies().subscribe(data => {
    this.productFamilies = data;
});
}


}