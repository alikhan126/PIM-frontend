import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import {AuthService} from "../../../shared/auth/auth.service";
import { NGXToastrService} from  '../../../shared/services/toastr.service';

@Component({
    selector: 'app-change-password-page',
    templateUrl: './change-password-page.component.html',
    styleUrls: ['./change-password-page.component.scss']
})

export class ChangePasswordPageComponent {
    @ViewChild('f', {static: false}) forogtPasswordForm: NgForm;
    
    regularForm: FormGroup;
    url : string;
    newurl : string[];

    constructor(private router: Router,private toasterService: NGXToastrService,
        private route: ActivatedRoute, private authService:AuthService) { }

    ngOnInit(){
        this.regularForm = new FormGroup({
            'old_password': new FormControl(null, [Validators.required]),
            'new_password': new FormControl(null, [Validators.required]),
            'confirm_new_password': new FormControl(null, [Validators.required])
            
        });
    }

    matchPAss(){
      if( this.regularForm && this.regularForm.value && this.regularForm.value.confirm_new_password  ){
        if( this.regularForm.value.new_password  != this.regularForm.value.confirm_new_password ){
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
        this.authService.changePassword(this.regularForm.value).subscribe(resp=>{
            if(!resp){
                    console.log("Error");
            } else {
                this.toasterService.typeSuccessCustom("Success!","Password Changed Successfully!");
                this.authService.logout();
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
