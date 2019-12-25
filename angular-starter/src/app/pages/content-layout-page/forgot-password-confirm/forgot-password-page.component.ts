import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import {AuthService} from "../../../shared/auth/auth.service";
import { NGXToastrService} from  '../../../shared/services/toastr.service';

@Component({
    selector: 'app-forgot-password-page',
    templateUrl: './forgot-password-page.component.html',
    styleUrls: ['./forgot-password-page.component.scss']
})

export class ForgotPasswordConfirmPageComponent {
    @ViewChild('f', {static: false}) forogtPasswordForm: NgForm;
    
    regularForm: FormGroup;
    url : string;
    newurl : string[];

    constructor(private router: Router,private toasterService: NGXToastrService,
        private route: ActivatedRoute, private authService:AuthService) { }

    ngOnInit(){
        this.regularForm = new FormGroup({
            'password1': new FormControl(null, [Validators.required]),
            'password2': new FormControl(null, [Validators.required])
            
        });
    }

    matchPAss(){
      if( this.regularForm && this.regularForm.value && this.regularForm.value.password2  ){
        if( this.regularForm.value.password1  != this.regularForm.value.password2 ){
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

    // On submit click, reset form fields
    onSubmit() {
        this.url = window.location.pathname
        this.newurl = this.url.split('/')
        this.regularForm.value.token = this.newurl[4]
        this.regularForm.value.uid = this.newurl[3]
        this.authService.forgotPasswordconfirm(this.regularForm.value).subscribe(resp=>{
            if(!resp){
                    console.log("Error");
            } else {
                this.toasterService.typeSuccessCustom("Success!","Password Recovered Successfully!");
                this.router.navigate(['/auth/login/']);
            }
        });
    }

    // On login link click
    onLogin() {
        this.router.navigate(['login'], { relativeTo: this.route.parent });
    }

    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }
}
