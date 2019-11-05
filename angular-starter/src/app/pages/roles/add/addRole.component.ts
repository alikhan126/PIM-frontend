import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { RoleService } from '../roles.service';

@Component({
  selector: 'app-product',
  templateUrl: './addRole.component.html',
  styleUrls: ['./addRole.component.scss']
})
export class AddRoleComponent implements OnInit{

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

  constructor( private route : ActivatedRoute, private router : Router, private roleService: RoleService){
  }
  ngOnInit () {
     this.getRole();
     this.getUsers();
  }

  getRole(){
    const id = +this.route.snapshot.paramMap.get('id');
    id ? this.roleService.get(id)
    .subscribe(data => {
    this.pObj=data;

    }):this.isNew=true;
  }

  permissions = [
        {name: 'CAN_CREATE_PRDOUCTS'},
        {name: 'CAN_UPDATE_PRDOUCTS'},
        {name: 'CAN_DELETE_PRDOUCTS'},
        {name: 'CAN_CREATE_MANUFACTURER'},
        {name: 'CAN_UPDATE_MANUFACTURER'},
        {name: 'CAN_DELETE_MANUFACTURER'},
        {name: 'CAN_CREATE_BRANDS'},
        {name: 'CAN_UPDATE_BRANDS'},
        {name: 'CAN_DELETE_BRANDS'},
        {name: 'CAN_CREATE_CATALOGS'},
        {name: 'CAN_UPDATE_CATALOGS'},
        {name: 'CAN_DELETE_CATALOGS'},
        {name: 'CAN_CREATE_CATEGORY'},
        {name: 'CAN_UPDATE_CATEGORY'},
        {name: 'CAN_DELETE_CATEGORY'},
        {name: 'CAN_CREATE_TAGS'},
        {name: 'CAN_UPDATE_TAGS'},
        {name: 'CAN_DELETE_TAGS'},
        {name: 'CAN_CREATE_WEBSITE'},
        {name: 'CAN_UPDATE_WEBSITE'},
        {name: 'CAN_DELETE_WEBSITE'},
        {name: 'CAN_CREATE_IMAGES'},
        {name: 'CAN_UPDATE_IMAGES'},
        {name: 'CAN_DELETE_IMAGES'},
    ]


  save(): void {
      if(this.isNew){
        this.roleService.add(this.pObj)
        .subscribe(result => {
          this.pObj=result;
          console.log(this.pObj)
          this.pObj && this.pObj.id && this.router.navigate(['roles/'])
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
           
          
          this.roleService.update(this.pObj).subscribe(aResult=>{
           alert("Updated Successfully")
          });
      }
  }



  goToRoles(){
    this.router.navigate(['/roles']);

}


getImages(){
  this.roleService.getAllImages().subscribe(data => {
    this.images = data;

});
}

getUsers(){
  this.roleService.getAllUsers().subscribe(data => {
    this.users = data['results'];
});
}

getCategories(){
  this.roleService.getAllCategories().subscribe(data => {
    this.categories = data;
});
}
getTags(){
  this.roleService.getAllTags().subscribe(data => {
    this.tagsList = data;
});
}
getBrands(){
  this.roleService.getAllBrands().subscribe(data => {
    this.brands = data;
});
}

getWebsites(){
  this.roleService.getAllWebsites().subscribe(data => {
    this.websites = data;
});
}

getProductFamilies(){
  this.roleService.getAllProductFamilies().subscribe(data => {
    this.productFamilies = data;
});
}

// getTaxes(){
//   this.roleService.getAllTaxes().subscribe(data => {
//     this.taxes = data['results'];
// });
// }

}
