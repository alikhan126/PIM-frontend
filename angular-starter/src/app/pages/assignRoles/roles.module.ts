import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { AssignRolesRoutingModule } from "./roles-routing.module";

import { AssignRolesPageComponent } from './roles.component';
import { AddRoleComponent} from './add/addRole.component';
import { ReactiveFormsModule,FormControl,FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { RolesEditComponent } from './editing/role-editing.component';
import { RolesViewComponent } from './roles-views/rolesViews.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        // FormControl,
        AssignRolesRoutingModule ,
        Ng2SmartTableModule ,
        NgSelectModule,
        NgOptionHighlightModule,
        NgxDatatableModule
    ],
    declarations: [ 
        AssignRolesPageComponent,
        AddRoleComponent,
        RolesEditComponent,
        RolesViewComponent
        
    ]
})
export class AssingRolePagesModule { }
