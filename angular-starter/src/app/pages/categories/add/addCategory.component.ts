import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-product',
  templateUrl: './addCategory.component.html',
  styleUrls: ['./addCategory.component.scss']
})
export class AddCategoryComponent implements OnInit{

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
  
  regularForm: FormGroup;
  constructor( private route : ActivatedRoute, private router : Router, private categoryService: CategoryService){

  }
  ngOnInit () {
     this.getCategory();
     // this.getImages();
     // this.getWebsites();
     // this.getTags();
    //  this.getBrands();
     this.getCategories();
     // this.getProductFamilies();
    //  this.getTaxes();
    this.regularForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'level': new FormControl(null, [Validators.required]),
      'description': new FormControl(null),
      'parentCategory': new FormControl(null),
    });
  }

  getCategory(){
    const id = +this.route.snapshot.paramMap.get('id');

    id ? this.categoryService.get(id)
    .subscribe(data => {
    // this.pObj=data;
    console.log(data)

    this.regularForm.get('name').setValue(data.name);
    this.regularForm.get('level').setValue(data.level);
    this.regularForm.get('description').setValue(data.description);
    this.regularForm.get('parentCategory').setValue(data.parentCategory);

    }):this.isNew=true;
  }


  save(): void {


    if(this.isNew){
      this.categoryService.add(this.regularForm.value)
      .subscribe(result => {
        this.pObj=result;
        console.log(this.pObj)
        this.pObj && this.pObj.id && this.router.navigate(['categories/'])
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
         
        
        this.categoryService.update(this.regularForm.value).subscribe(aResult=>{
         alert("Updated Successfully")
        });
  }
      
      // this.location.back();
  }



  goToCategories(){
    this.router.navigate(['/categories']);

}


getImages(){
  this.categoryService.getAllImages().subscribe(data => {
    this.images = data;

});
}

getCategories(){
  this.categoryService.getAllCategories().subscribe(data => {
    this.categories = data;
});
}
getTags(){
  this.categoryService.getAllTags().subscribe(data => {
    this.tagsList = data;
});
}
getBrands(){
  this.categoryService.getAllBrands().subscribe(data => {
    this.brands = data;
});
}

getWebsites(){
  this.categoryService.getAllWebsites().subscribe(data => {
    this.websites = data;
});
}

getProductFamilies(){
  this.categoryService.getAllProductFamilies().subscribe(data => {
    this.productFamilies = data;
});
}

// getTaxes(){
//   this.categoryService.getAllTaxes().subscribe(data => {
//     this.taxes = data['results'];
// });
// }

}
