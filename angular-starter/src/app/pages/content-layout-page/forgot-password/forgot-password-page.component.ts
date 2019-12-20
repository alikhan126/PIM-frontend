import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-forgot-password-page',
    templateUrl: './forgot-password-page.component.html',
    styleUrls: ['./forgot-password-page.component.scss']
})

export class ForgotPasswordPageComponent {
    @ViewChild('f', {static: false}) forogtPasswordForm: NgForm;
    
    regularForm: FormGroup;

    constructor(private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit(){
        this.regularForm = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            
        });
    }

    // On submit click, reset form fields
    onSubmit() {
        console.log(this.regularForm.value)
        this.regularForm.reset();
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
