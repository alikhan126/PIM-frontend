import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule,FormControl,FormsModule } from '@angular/forms';

import { FullPagesRoutingModule } from "./full-pages-routing.module";

import { FullLayoutPageComponent } from './full-layout-page.component';
import { UserProfilePageComponent } from "./user-profile/user-profile-page.component";
import { EditUserComponent } from "./editUser/editUser.component";

@NgModule({
    imports: [
        CommonModule,
        // FormControl,
        FormsModule,
        ReactiveFormsModule,
        FullPagesRoutingModule   
    ],
    declarations: [       
        FullLayoutPageComponent,
        UserProfilePageComponent,
        EditUserComponent
    ]
})
export class FullPagesModule { }
