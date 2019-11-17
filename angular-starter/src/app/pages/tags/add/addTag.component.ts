import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { TagService } from '../tags.service';

@Component({
  selector: 'app-product',
  templateUrl: './addTag.component.html',
  styleUrls: ['./addTag.component.scss']
})
export class AddTagsComponent implements OnInit{

  pObj:any={};
  images:any=[];
  websites:any=[];
  tagsList:any=[];
  brands:any=[];
  categories:any=[];
  productFamilies:any=[];
  taxes:any=[];

  isNew :boolean = false;

  constructor( private route : ActivatedRoute, private router : Router, private tagService: TagService){

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

    id ? this.tagService.get(id)
    .subscribe(data => {
    this.pObj=data;

    }):this.isNew=true;
  }


  save(): void {


    if(this.isNew){
      this.tagService.add(this.pObj)
      .subscribe(result => {
        this.pObj=result;
        console.log(this.pObj)
        this.pObj && this.pObj.id && this.router.navigate(['tags/'])
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
         
        
        this.tagService.update(this.pObj).subscribe(aResult=>{
         alert("Updated Successfully")
        });
  }
      
      // this.location.back();
  }



  goToTag(){
    this.router.navigate(['/tags']);

}


getImages(){
  this.tagService.getAllImages().subscribe(data => {
    this.images = data;

});
}

getCategories(){
  this.tagService.getAllCategories().subscribe(data => {
    this.categories = data;
});
}
getTags(){
  this.tagService.getAllTags().subscribe(data => {
    this.tagsList = data;
});
}
getBrands(){
  this.tagService.getAllBrands().subscribe(data => {
    this.brands = data;
});
}

getWebsites(){
  this.tagService.getAllWebsites().subscribe(data => {
    this.websites = data;
});
}

getProductFamilies(){
  this.tagService.getAllProductFamilies().subscribe(data => {
    this.productFamilies = data;
});
}

// getTaxes(){
//   this.tagService.getAllTaxes().subscribe(data => {
//     this.taxes = data['results'];
// });
// }

}
