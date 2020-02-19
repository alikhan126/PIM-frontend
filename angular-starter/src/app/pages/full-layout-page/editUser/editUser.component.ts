import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { Router,ActivatedRoute } from '@angular/router';
import {AuthService} from "../../../shared/auth/auth.service";
import { NGXToastrService } from 'app/shared/services/toastr.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './editUser.component.html',
  styleUrls: ['./editUser.component.scss']
})
export class EditUserComponent implements OnInit{

  pObj:any={};

  isNew :boolean = false;

  constructor(private toastService:NGXToastrService, private route : ActivatedRoute, private router : Router, private authService: AuthService){

  }
  ngOnInit () {
     this.getUser();
     // this.getImages();
     // this.getWebsites();
     // this.getTags();
     // this.getBrands();
     // this.getCategories();
     // this.getProductFamilies();
    //  this.getTaxes();
  }

  getUser(){
    const id = +this.route.snapshot.paramMap.get('id');

    id ? this.authService.getUser(id)
    .subscribe(data => {
    this.pObj=data;

    }):this.isNew=true;
  }


  save(): void {


    if(this.isNew){
        // this.ts.success("Operation Performed Successfully");
    }
    else {
      this.authService.updateUser(this.pObj).subscribe(aResult=>{
        this.toastService.typeSuccessCustom("Profile","User Updated Successfully!")

        this.router.navigate(['/user/profile']);
       });
    }


  }
}
