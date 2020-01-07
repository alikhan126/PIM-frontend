import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { PermissionService } from '../manufacturer-perm.service';

@Component({
  selector: 'app-product',
  templateUrl: './addPerm.component.html',
  styleUrls: ['./addPerm.component.scss']
})
export class AddManufacturerPermComponent implements OnInit{

  pObj:any={};
  images:any=[];
  websites:any=[];
  tagsList:any=[];
  brands:any=[];
  categories:any=[];
  productFamilies:any=[];
  taxes:any=[];
  users:any=[];

  isNew :boolean = false;

  constructor( private route : ActivatedRoute, private router : Router, private permissionService: PermissionService){
  }
  ngOnInit () {
     this.getRole();
     this.getUsers();
  }

  getRole(){
    const id = +this.route.snapshot.paramMap.get('id');
    id ? this.permissionService.get(id)
    .subscribe(data => {
    this.pObj=data;

    }):this.isNew=true;
  }

  MANUFACTURER_FIELD_CHOICES = [
    {name: 'Name'},
  ]

  save(): void {
      if(this.isNew){
        this.permissionService.add(this.pObj)
        .subscribe(result => {
          if(result){
            this.pObj=result;
            console.log(this.pObj)
            this.pObj && this.pObj.id
          }
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
           
          
          this.permissionService.update(this.pObj).subscribe(aResult=>{
           alert("Updated Successfully")
          });
      }
  }



  goToRoles(){
    this.router.navigate(['/fields/manufacturer']);

}


getImages(){
  this.permissionService.getAllImages().subscribe(data => {
    this.images = data;

});
}

getUsers(){
  this.permissionService.getAllUsers().subscribe(data => {
    this.users = data;
});
}

getCategories(){
  this.permissionService.getAllCategories().subscribe(data => {
    this.categories = data;
});
}
getTags(){
  this.permissionService.getAllTags().subscribe(data => {
    this.tagsList = data;
});
}
getBrands(){
  this.permissionService.getAllBrands().subscribe(data => {
    this.brands = data;
});
}

getWebsites(){
  this.permissionService.getAllWebsites().subscribe(data => {
    this.websites = data;
});
}

getProductFamilies(){
  this.permissionService.getAllProductFamilies().subscribe(data => {
    this.productFamilies = data;
});
}

// getTaxes(){
//   this.permissionService.getAllTaxes().subscribe(data => {
//     this.taxes = data['results'];
// });
// }

}
