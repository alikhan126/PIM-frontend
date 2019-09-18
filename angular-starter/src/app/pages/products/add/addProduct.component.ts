import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {ProductService} from '../products.service';

@Component({
  selector: 'app-product',
  templateUrl: './addProduct.component.html',
  styleUrls: ['./addProduct.component.scss']
})
export class AddProductComponent implements OnInit{

  pObj:any={};
  isNew :boolean = false;

  constructor( private route : ActivatedRoute, private router : Router, private productService: ProductService){

  }
  ngOnInit () {
     this.getProduct();
  }

  getProduct(){
    const id = +this.route.snapshot.paramMap.get('id');

    id ? this.productService.get(id)
    .subscribe(data => {
    this.pObj=data;

    }):this.isNew=true;
  }


  save(): void {


    if(this.isNew){
      this.pObj.images=[1];
      this.pObj.tags=[1];
      this.pObj.websites=[1];
      this.pObj.category=[];

      this.productService.add(this.pObj)
      .subscribe(result => {
        this.pObj=result;
        this.pObj && this.pObj.id && this.router.navigate(['products/'+this.pObj.id])
        // this.ts.success("Operation Performed Successfully");
      })
    }
      else {
        //ToDO change
        let tempArray=[];
         this.pObj.images.map(image=>{  tempArray.push(image.id?image.id:image)});
         this.pObj.images=tempArray;
         tempArray=[];
         this.pObj.tags.map(image=>{  tempArray.push(image.id?image.id:image)});
         this.pObj.tags=tempArray;
         tempArray=[];
         this.pObj.websites.map(image=>{  tempArray.push(image.id?image.id:image)});
         this.pObj.websites=tempArray;
         tempArray=[];
         this.pObj.category.map(image=>{  tempArray.push(image.id?image.id:image)});
         this.pObj.category=tempArray;
         tempArray=[];
         
        
        this.productService.update(this.pObj).subscribe(aResult=>{
         alert("Updated Successfully")
        });
  }
      
      // this.location.back();
  }



  goToProducts(){
    this.router.navigate(['/products']);

}
}
