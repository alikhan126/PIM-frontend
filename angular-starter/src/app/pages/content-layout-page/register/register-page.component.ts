import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import {AuthService} from "../../../shared/auth/auth.service";
import { NGXToastrService } from 'app/shared/services/toastr.service';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent {

    regularForm: FormGroup;
    terms:boolean=true;
    constructor(private router: Router,
        private route: ActivatedRoute,private authService:AuthService, private toastService:NGXToastrService) { }
        pa="^[a-zA-Z ]{3,25}$";
        
    ngOnInit(){
        this.authService.isAuthenticated() ? this.router.navigate(['products']):null; 
        this.regularForm = new FormGroup({
            'fullName': new FormControl(null, [Validators.required, Validators.minLength(4),Validators.pattern(this.pa)]),
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]),
            'confirmPassword': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]),
            
        });
    }

    matchPAss(){
      if( this.regularForm && this.regularForm.value && this.regularForm.value.confirmPassword  ){
        if( this.regularForm.value.password  != this.regularForm.value.confirmPassword ){
            return false 
      }
      else {
          return true;
      }
  
      }
      else{
          return true;
      }
    }
    //  On submit click, reset field value
    onSubmit() {
        let {
            confirmPassword,...postObj
        }=this.regularForm.value;
  
        this.authService.signupUser(postObj).subscribe(resp=>{
            if(!resp){
                this.toastService.typeError("Error","Email already exists!");
            }
            else {
                console.log("Signed up successfully!")  
                this.authService.signinUser(this.regularForm.value.email,this.regularForm.value.password).subscribe(resp=>{
                    if(!resp){
                        console.log("Invalid Credentials!");
                    } else {
                        console.log("Logged In Successfully!");
                    }
                });
                this.regularForm.reset();              
            }
        })
        // this.registerForm.reset();
    }
}
