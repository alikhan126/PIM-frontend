import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { CatalogService } from '../catalogs.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';

@Component({
  selector: 'app-product',
  templateUrl: './addCatalog.component.html',
  styleUrls: ['./addCatalog.component.scss']
})
export class AddCatalogComponent implements OnInit{

  pObj:any={};
  images:any=[];
  websites:any=[];
  tagsList:any=[];
  brands:any=[];
  categories:any=[];
  productFamilies:any=[];
  taxes:any=[];

  isNew :boolean = false;
  loading :boolean = false;

 patternUrl='(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
 regularForm: FormGroup;
  constructor( private ts:NGXToastrService, private route : ActivatedRoute, private router : Router, private catalogService: CatalogService){

  }
  ngOnInit () {
     this.getWebsite();
     this.regularForm = new FormGroup({
      'url': new FormControl(null, [Validators.required, Validators.pattern(this.patternUrl)]),
      'kind': new FormControl(null, [Validators.required]),
      // 'url': new FormControl(null),
      // 'kind': new FormControl(null),
      
  });
     // this.getImages();
     // this.getWebsites();
     // this.getTags();
     // this.getBrands();
     // this.getCategories();
     // this.getProductFamilies();
    //  this.getTaxes();
  }


  getWebsite(){
    const id = +this.route.snapshot.paramMap.get('id');

    id ? this.catalogService.get(id)
    .subscribe(data => {
    this.regularForm.get('url').setValue(data.url);
    this.regularForm.get('kind').setValue(data.kind);
    }):this.isNew=true;
  }


  save(): void {

    this.loading=true;
    if(this.isNew){

       this.catalogService.add(this.regularForm.value)
      .subscribe(result => {
        this.pObj=result;
        console.log(this.pObj)
        this.pObj && this.pObj.id //&& this.router.navigate(['websites/'])
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
         
        
        this.catalogService.update(this.regularForm.value).subscribe(aResult=>{
         alert("Updated Successfully")
        });
  }
      
      // this.location.back();
  }



  goToWebsites(){
    this.router.navigate(['/websites']);

}


getImages(){
  this.catalogService.getAllImages().subscribe(data => {
    this.images = data;

});
}

getCategories(){
  this.catalogService.getAllCategories().subscribe(data => {
    this.categories = data;
});
}
getTags(){
  this.catalogService.getAllTags().subscribe(data => {
    this.tagsList = data;
});
}
getBrands(){
  this.catalogService.getAllBrands().subscribe(data => {
    this.brands = data;
});
}

getWebsites(){
  this.catalogService.getAllWebsites().subscribe(data => {
    this.websites = data;
});
}

getProductFamilies(){
  this.catalogService.getAllProductFamilies().subscribe(data => {
    this.productFamilies = data;
});
}

// getTaxes(){
//   this.catalogService.getAllTaxes().subscribe(data => {
//     this.taxes = data['results'];
// });
// }

}
