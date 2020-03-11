import { Component, ViewChild, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import {AuthService} from "../../../shared/auth/auth.service";
@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit{

    @ViewChild('f', {static: false}) loginForm: NgForm;
    regularForm: FormGroup;

    constructor(private router: Router,
        private route: ActivatedRoute,private authService:AuthService) { }


        ngOnInit(){
            this.authService.isAuthenticated() ? this.router.navigate(['products']):null; 
            this.regularForm = new FormGroup({
                'email': new FormControl(null, [Validators.required, Validators.email]),
                'password': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]),
                
            });
        }
    // On submit button click
    onSubmit() {
        this.authService.signinUser(this.regularForm.value.email,this.regularForm.value.password).subscribe(resp=>{
            console.log(JSON.stringify(resp))
            if(!resp){
                alert("Invalid Credentials")
            }
        })
        // this.loginForm.reset();
    }
    // On Forgot password link click
    onForgotPassword() {
        this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
    }
    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }
}
