import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { PermissionService } from '../perm.service';

@Component({
  selector: 'app-product',
  templateUrl: './addPerm.component.html',
  styleUrls: ['./addPerm.component.scss']
})
export class AddPermComponent implements OnInit{

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

  PRODUCT_FIELD_CHOICES = [
    {name : 'Name'},
    {name : 'Type'},
    {name : 'Sku'},
    {name : 'Mpn'},
    {name : 'Ean'},
    {name : 'Amount'},
    {name : 'Description'},
    {name : 'Taxclassname'},
    {name : 'Shortdescription'},
    {name : 'Weight'},
    {name : 'Productsonline'},
    {name : 'Visibility'},
    {name : 'Price'},
    {name : 'Specialprice'},
    {name : 'Specialpricefromdate'},
    {name : 'Specialpricetodate'},
    {name : 'Metatitle'},
    {name : 'Metakeywords'},
    {name : 'Metadescription'},
    {name : 'Mapprice'},
    {name : 'Msrpprice'},
    {name : 'Mapenabled'},
    {name : 'Giftmessageavailable'},
    {name : 'Customdesign'},
    {name : 'Customdesignfrom'},
    {name : 'Customdesignto'},
    {name : 'Customlayoutupdate'},
    {name : 'Pagelayout'},
    {name : 'Productoptionscontainer'},
    {name : 'Msrpdisplayactualpricetype'},
    {name : 'Countryofmanufacture'},
    {name : 'Quantity'},
    {name : 'Outofstockquantity'},
    {name : 'Useconfigminqty'},
    {name : 'Isqtydecimal'},
    {name : 'Outofstock'},
    {name : 'Allowbackorders'},
    {name : 'Useconfigbackorders'},
    {name : 'Mincartqty'},
    {name : 'Useconfigminsaleqty'},
    {name : 'Maxcartqty'},
    {name : 'Useconfigmaxsaleqty'},
    {name : 'Isinstock'},
    {name : 'Notifyonstockbelow'},
    {name : 'Useconfignotifystockqty'},
    {name : 'Managestock'},
    {name : 'Useconfigmanagestock'},
    {name : 'Useconfigqtyincrements'},
    {name : 'Qtyincrements'},
    {name : 'Useconfigenableqtyinc'},
    {name : 'Enableqtyincrements'},
    {name : 'Hidefromproductpage'},
    {name : 'Customoptions'},
    {name : 'Bundlepricetype'},
    {name : 'Bundleskutype'},
    {name : 'Bundlepriceview'},
    {name : 'Bundlevalues'},
    {name : 'Bundleshipmenttype'},
    {name : 'Configurablevariations'},
    {name : 'Configurablevariationlabels'},
    {name : 'Allergencontent'},
    {name : 'Casequantity'},
    {name : 'Distributor'},
    {name : 'Foodnutrition'},
    {name : 'Foodpropertycontent'},
    {name : 'Foodpropertieslist'},
    {name : 'Fsdcategoryreference'},
    {name : 'Fsdproductsreference'},
    {name : 'Fsdproductreference'},
    {name : 'Giftwrappingavailable'},
    {name : 'Skuheight'},
    {name : 'Skulength'},
    {name : 'Skuwidth'},
    {name : 'Shelflife'},
    {name : 'Shippingtemp'},
    {name : 'Shippingweight'},
    {name : 'Shipsin'},
    {name : 'Stocktype'},
    {name : 'Tsdimensionsheight'},
    {name : 'Tsdimensionslength'},
    {name : 'Tsdimensionswidth'},
    {name : 'Unitamount'},
    {name : 'Unitamounttype'},
    {name : 'Upc'},
    {name : 'Volume'},
    {name : 'Bulletpoints'},
    {name : 'H1tag'},
    {name : 'H2tag'},
    {name : 'H3tag'},
    {name : 'Alttag'},
    {name : 'Isdecimaldivided'},
    {name : 'Crosssellskus'},
    {name : 'Crosssellposition'},
    {name : 'Upsellskus'},
    {name : 'Upsellposition'},
    {name : 'Deferredstockupdate'},
    {name : 'Brand'},
    {name : 'Tags'},
    {name : 'Websites'},
    {name : 'Images'},
    {name : 'Category'},
  ]


  save(): void {
      if(this.isNew){
        this.permissionService.add(this.pObj)
        .subscribe(result => {
          if(result){
            this.pObj=result;
            console.log(this.pObj)
            this.pObj && this.pObj.id //&& this.router.navigate(['fields/product'])
            
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
    this.router.navigate(['/roles']);

}


getImages(){
  this.permissionService.getAllImages().subscribe(data => {
    this.images = data;

});
}

getUsers(){
  this.permissionService.getAllUsers().subscribe(data => {
    this.users = data['results'];
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
