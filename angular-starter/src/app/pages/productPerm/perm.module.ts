import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { PermRoutingModule } from "./perm-routing.module";

import { PermPageComponent } from './perm.component';
import { AddPermComponent} from './add/addPerm.component';
import { ReactiveFormsModule,FormControl,FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { PermEditComponent } from './editing/perm-editing.component';
import { AddBrandPermComponent} from './add-brand/addPerm.component';
import { PermBrandEditComponent } from './editing-brand/perm-editing.component';
import { AddCategoryPermComponent} from './add-category/addPerm.component';
import { PermCategoryEditComponent } from './editing-category/perm-editing.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        // FormControl,
        PermRoutingModule ,
        Ng2SmartTableModule ,
        NgSelectModule,
        NgOptionHighlightModule,
        NgxDatatableModule
    ],
    declarations: [ 
        PermPageComponent,
        AddPermComponent,
        PermEditComponent,
        AddBrandPermComponent,
        PermBrandEditComponent,
        AddCategoryPermComponent,
        PermCategoryEditComponent
    ]
})
export class PermPagesModule { }
