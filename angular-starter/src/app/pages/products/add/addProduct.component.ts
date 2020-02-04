import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {ProductService} from '../products.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';

@Component({
  selector: 'app-product',
  templateUrl: './addProduct.component.html',
  styleUrls: ['./addProduct.component.scss']
})
export class AddProductComponent implements OnInit{

  pObj:any={};
  images:any=[];
  websites:any=[];
  tagsList:any=[];
  brands:any=[];
  categories:any=[];
  productFamilies:any=[];
  taxes:any=[];
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
  Stocked:any=[];
  SpecialOrder:any=[];
  FromPartners:any=[];
  FSD:any=[];

  isNew :boolean = false;
  loading:boolean=false;
  constructor(private toastService:NGXToastrService, private route : ActivatedRoute, private router : Router, private productService: ProductService){

  }
  ngOnInit () {
     this.getProduct();
     this.getImages();
     this.getWebsites();
     this.getTags();
     this.getBrands();
     this.getCategories();
     // this.getProductFamilies();
     //  this.getTaxes();
     this.Simple = "simple";
     this.Grouped = "grouped";
     this.Configurable = "configurable";
     this.Virtual = "virtual";
     this.Bundle = "bundle";
     this.Downloadable = "downloadable";
     this.Catalog = "Catalog";
     this.Search = "Search";
     this.NotVisibleIndividually = "Not Visible Individually";
     this.FoodProducts = "Food Products";
     this.NonFoodProducts = "Non Food Products";
     this.Stocked = "Stocked";
     this.SpecialOrder = "Special Order";
     this.FromPartners = "From Partners";
     this.FSD = "FSD";
  }


  test(val){
    alert(val)
  }
  getProduct(){
    const id = +this.route.snapshot.paramMap.get('id');

    id ? this.productService.get(id)
    .subscribe(data => {
    this.pObj=data;

    }):this.isNew=true;
  }


  save(): void {

  this.loading=true;
    if(this.isNew){
      this.productService.add(this.pObj)
      .subscribe(result => {
        this.pObj=result;
        this.pObj && this.pObj.id //&& this.router.navigate(['products/']);
        this.toastService.typeSuccessCustom("Success","Your product request is submitted for Admin's approval")
        // this.ts.success("Operation Performed Successfully");
      })
    }
      else {
        //ToDO change
        // let tempArray=[];
        //  this.pObj.images.map(image=>{  tempArray.push(image.id?image.id:image)});
        //  this.pObj.images=tempArray;
        //  tempArray=[];
        //  this.pObj.tags.map(image=>{  tempArray.push(image.id?image.id:image)});
        //  this.pObj.tags=tempArray;
        //  tempArray=[];
        //  this.pObj.websites.map(image=>{  tempArray.push(image.id?image.id:image)});
        //  this.pObj.websites=tempArray;
        //  tempArray=[];
        //  this.pObj.category.map(image=>{  tempArray.push(image.id?image.id:image)});
        //  this.pObj.category=tempArray;
        //  tempArray=[];
         
        
        this.productService.update(this.pObj).subscribe(aResult=>{
         alert("Updated Successfully")
        });
  }
      
      // this.location.back();
  }

  VISIBILITY_CHOICES = [
    {name : 'Search'},
    {name : 'Catalog'},
    {name : 'NotVisibleIndividually'},
  ]


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
    this.tagsList = data;
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

// getTaxes(){
//   this.productService.getAllTaxes().subscribe(data => {
//     this.taxes = data['results'];
// });
// }

}
