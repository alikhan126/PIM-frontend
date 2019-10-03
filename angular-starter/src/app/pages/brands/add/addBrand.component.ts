import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { BrandService } from '../brands.service';

@Component({
  selector: 'app-product',
  templateUrl: './addBrand.component.html',
  styleUrls: ['./addBrand.component.scss']
})
export class AddBrandComponent implements OnInit{

  pObj:any={};
  images:any=[];
  websites:any=[];
  tagsList:any=[];
  brands:any=[];
  categories:any=[];
  productFamilies:any=[];
  taxes:any=[];

  isNew :boolean = false;

  constructor( private route : ActivatedRoute, private router : Router, private brandService: BrandService){

  }
  ngOnInit () {
     this.getBrand();
     // this.getImages();
     // this.getWebsites();
     // this.getTags();
     // this.getBrands();
     // this.getCategories();
     // this.getProductFamilies();
    //  this.getTaxes();
  }

  getBrand(){
    const id = +this.route.snapshot.paramMap.get('id');

    id ? this.brandService.get(id)
    .subscribe(data => {
    this.pObj=data;

    }):this.isNew=true;
  }


  save(): void {


    if(this.isNew){
      this.brandService.add(this.pObj)
      .subscribe(result => {
        this.pObj=result;
        console.log(this.pObj)
        this.pObj && this.pObj.id && this.router.navigate(['brands/'+this.pObj.id])
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
         
        
        this.brandService.update(this.pObj).subscribe(aResult=>{
         alert("Updated Successfully")
        });
  }
      
      // this.location.back();
  }



  goToBrands(){
    this.router.navigate(['/brands']);

}


getImages(){
  this.brandService.getAllImages().subscribe(data => {
    this.images = data;

});
}

getCategories(){
  this.brandService.getAllCategories().subscribe(data => {
    this.categories = data;
});
}
getTags(){
  this.brandService.getAllTags().subscribe(data => {
    this.tagsList = data;
});
}
getBrands(){
  this.brandService.getAllBrands().subscribe(data => {
    this.brands = data;
});
}

getWebsites(){
  this.brandService.getAllWebsites().subscribe(data => {
    this.websites = data;
});
}

getProductFamilies(){
  this.brandService.getAllProductFamilies().subscribe(data => {
    this.productFamilies = data;
});
}

// getTaxes(){
//   this.brandService.getAllTaxes().subscribe(data => {
//     this.taxes = data['results'];
// });
// }

}
