import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { ManufacturerService } from '../manufacturer.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';

@Component({
  selector: 'app-product',
  templateUrl: './addManufacturer.component.html',
  styleUrls: ['./addManufacturer.component.scss']
})
export class AddMaufacturerComponent implements OnInit{

  pObj:any={};
  images:any=[];
  websites:any=[];
  tagsList:any=[];
  brands:any=[];
  categories:any=[];
  productFamilies:any=[];
  taxes:any=[];

  isNew :boolean = false;

  constructor(private toastService:NGXToastrService, private route : ActivatedRoute, private router : Router, private manufacturerService: ManufacturerService){

  }
  ngOnInit () {
     this.getManufacturer();
     // this.getImages();
     // this.getWebsites();
     // this.getTags();
     // this.getBrands();
     // this.getCategories();
     // this.getProductFamilies();
    //  this.getTaxes();
  }

  getManufacturer(){
    const id = +this.route.snapshot.paramMap.get('id');

    id ? this.manufacturerService.get(id)
    .subscribe(data => {
    this.pObj=data;

    }):this.isNew=true;
  }


  save(): void {


    if(this.isNew){
      this.manufacturerService.add(this.pObj)
      .subscribe(result => {
        this.pObj=result;
        console.log(this.pObj)
        this.pObj && this.pObj.id //&& this.router.navigate(['manufacturer/'])
        this.toastService.typeSuccessCustom("Success","Your brand request is submitted for Admin's approval")
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
         
        
        this.manufacturerService.update(this.pObj).subscribe(aResult=>{
         alert("Updated Successfully")
        });
  }
      
      // this.location.back();
  }



  goToManufacturer(){
    this.router.navigate(['/manufacturer']);

}


getImages(){
  this.manufacturerService.getAllImages().subscribe(data => {
    this.images = data;

});
}

getCategories(){
  this.manufacturerService.getAllCategories().subscribe(data => {
    this.categories = data;
});
}
getTags(){
  this.manufacturerService.getAllTags().subscribe(data => {
    this.tagsList = data;
});
}
getBrands(){
  this.manufacturerService.getAllBrands().subscribe(data => {
    this.brands = data;
});
}

getWebsites(){
  this.manufacturerService.getAllWebsites().subscribe(data => {
    this.websites = data;
});
}

getProductFamilies(){
  this.manufacturerService.getAllProductFamilies().subscribe(data => {
    this.productFamilies = data;
});
}

// getTaxes(){
//   this.manufacturerService.getAllTaxes().subscribe(data => {
//     this.taxes = data['results'];
// });
// }

}
