import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import { ContentPagesRoutingModule } from "./content-pages-routing.module";
import { ContentLayoutPageComponent } from './content-layout-page.component';
import { LoginPageComponent } from './login/login-page.component';
import { RegisterPageComponent } from './register/register-page.component';
import { VerifiedEmailPageComponent } from './verified-email/verified-email-page.component';



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
        VerifiedEmailPageComponent
    ]
})
export class ContentPagesModule { }
