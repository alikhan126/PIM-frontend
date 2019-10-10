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
    category:any=[];
    // productFamilies:any=[];
    taxes:any=[];  
    editing = {};
    rows = [];
    products :any[];
    Downloadable:any=[];
    Simple:any=[];
    Grouped:any=[];
    Bundle:any=[];
    Configurable:any=[];
    Catalog:any=[];
    NotVisibleIndividually:any=[];
    Search:any=[];
    FoodProducts:any=[];
    NonFoodProducts:any=[];
    Virtual:any=[];
    totalRecords:number;
    temp = [];
    constructor(private productService: ProductService, private router: Router) {
    }
    ngOnInit() {
        this.productService.getAll().subscribe(data => {
            this.rows = data['results'];
            this.temp = data['results'];
            console.log(this.rows)
        });
        this.getImages();
        this.getWebsites();
        this.getTags();
        this.getBrands();
        this.getCategories();
        this.Simple = "Simple";
        this.Grouped = "Grouped";
        this.Configurable = "Configurable";
        this.Virtual = "Virtual";
        this.Bundle = "Bundle";
        this.Downloadable = "Downloadable";
        this.Catalog = "Catalog";
        this.Search = "Search";
        this.NotVisibleIndividually = "NotVisibleIndividually";
        this.FoodProducts = "FoodProducts";
        this.NonFoodProducts = "NonFoodProducts";
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
            this.productService.update(this.rows[rowIndex]).subscribe(data => {
                this.productService.getAll().subscribe(data => {
                    this.rows = data['results'];
                    console.log(this.rows)
                });
            });
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
    this.category = data;
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

// getProductFamilies(){
//   this.productService.getAllProductFamilies().subscribe(data => {
//     this.productFamilies = data;
// });
// }

updateFilter(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function (d) {
        return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
}


}