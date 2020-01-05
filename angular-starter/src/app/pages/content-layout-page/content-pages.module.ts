import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import { ContentPagesRoutingModule } from "./content-pages-routing.module";
import { ContentLayoutPageComponent } from './content-layout-page.component';
import { LoginPageComponent } from './login/login-page.component';
import { RegisterPageComponent } from './register/register-page.component';
import { ForgotPasswordPageComponent } from './forgot-password/forgot-password-page.component';
import { ForgotPasswordConfirmPageComponent } from './forgot-password-confirm/forgot-password-page.component';
import { VerifiedEmailPageComponent } from './verified-email/verified-email-page.component';
import { ChangePasswordPageComponent } from './change-password/change-password-page.component';


@NgModule({
    imports: [
        CommonModule,
        ContentPagesRoutingModule,
        FormsModule,
        ReactiveFormsModule         
    ],
    declarations: [
        ContentLayoutPageComponent,
        LoginPageComponent,
        RegisterPageComponent,
        VerifiedEmailPageComponent,
        ForgotPasswordPageComponent,
        ForgotPasswordConfirmPageComponent,
        ChangePasswordPageComponent
    ]
})
export class ContentPagesModule { }
