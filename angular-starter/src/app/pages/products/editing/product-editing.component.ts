import { Component,OnInit } from '@angular/core';
import { ProductService} from '../products.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
    Stocked:any=[];
    SpecialOrder:any=[];
    FromPartners:any=[];
    closeResult: string;
    permission: string;
    perm: string;
    
    constructor(private modalService: NgbModal, private productService: ProductService, private router: Router) {
    }
    ngOnInit() {
        this.productService.getAll().subscribe(data => {
            this.rows = data;
            this.temp = data;
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
        this.Stocked = "Stocked";
        this.SpecialOrder = "SpecialOrder";
        this.FromPartners = "FromPartners";
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

    titleCaseWord(word: string) {
        if (!word) return word;
        return word[0].toUpperCase() + word.substr(1).toLowerCase();
    }
    // Editing content code
    updateValue(event, cell, rowIndex) {
        const user=JSON.parse(localStorage.getItem('currentUser'));
        this.permission = "Update";
        this.perm = "All";
        let cellvalue = this.titleCaseWord(cell);
        if(user.roles['products'].includes(this.permission) ||user.roles['products'].includes(this.perm) ){
            this.productService.getFieldPermissions(user.user_id).subscribe(data => {
                if(data.edit.includes(cellvalue)){
                    this.editing[rowIndex + '-' + cell] = false;
                    this.productService.get(this.rows[rowIndex]['id']).subscribe(data => {
                        this.rows[rowIndex] = data;
                        this.rows[rowIndex][cell] = event.target.value;
                        this.productService.update(this.rows[rowIndex]).subscribe(data => {
                            this.productService.getAll().subscribe(data => {
                                this.rows = data;
                                console.log(this.rows)
                            });
                        });
                    });
                } else {
                    alert("You don't have access to edit " + cell +" field!");
                };
            });
        } else {
            alert("You don't have access to edit products!");
        }
    }

    deleteProduct(event, cell, rowIndex) {
        let user=JSON.parse(localStorage.getItem('currentUser'));
        this.permission = "Delete";
        this.perm = "All";
        if(user.roles['products'].includes(this.permission) || user.roles['products'].includes(this.perm)){
            this.editing[rowIndex + '-' + cell] = false;
            this.productService.get(this.rows[rowIndex]['id']).subscribe(data => {
                this.rows[rowIndex] = data;
                console.log(this.rows[rowIndex])
                this.rows[rowIndex][cell] = event.target.value;
                this.productService.delete(this.rows[rowIndex]['id']).subscribe(data => {
                    this.productService.getAll().subscribe(data => {
                        this.rows = data;
                        console.log(this.rows)
                    });
                });
            });
        } else {
            alert("You don't have access to delete products!");
        }
    }

    updateRelationshipValue(value, cell, rowIndex) {
        let user=JSON.parse(localStorage.getItem('currentUser'));
        this.permission = "Update";
        this.perm = "All";
        if(user.roles['products'].includes(this.permission) || user.roles['products'].includes(this.perm) ){
            this.productService.getFieldPermissions(user.user_id).subscribe(data => {
                if(data.edit.includes(cell)){
                    this.editing[rowIndex + '-' + cell] = false;
                    this.productService.get(this.rows[rowIndex]['id']).subscribe(data => {
                        this.rows[rowIndex] = data;
                        this.rows[rowIndex][cell] = value;
                        this.productService.update(this.rows[rowIndex]).subscribe(data => {
                            this.productService.getAll().subscribe(data => {
                                this.rows = data;
                                console.log(this.rows)
                            });
                        });
                    });
                } else {
                    alert("You don't have access to edit " + cell +" field!");
                };
            });
        } else {
            alert("You don't have access to edit products!");
        }
    }

    addProduct(){
        let user=JSON.parse(localStorage.getItem('currentUser'));
        this.permission = "Create";
        this.perm = "All";
        if(user.roles['products'].includes(this.permission) || user.roles['products'].includes(this.perm) ){
            this.router.navigate(['/products/0']);
        } else {
            alert("You don't have access to add products!");
        }
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