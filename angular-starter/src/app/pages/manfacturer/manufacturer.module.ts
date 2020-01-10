import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { ManufacturerRoutingModule } from "./manufacturer-routing.module";

import { ManufacturerPageComponent } from './manufacturer.component';
import { AddMaufacturerComponent} from './add/addManufacturer.component';
import { ReactiveFormsModule,FormControl,FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { ManufacturerEditComponent } from './editing/manufacturer-editing.component';
import { ManufacturerViewComponent } from './manufacturer-views/manufacturerViews.component';
import { ManufacturerHiddenComponent } from './hidden/manufacturer-hidden.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        // FormControl,
        ManufacturerRoutingModule ,
        Ng2SmartTableModule ,
        NgSelectModule,
        NgOptionHighlightModule,
        NgxDatatableModule
    ],
    declarations: [ 
        ManufacturerPageComponent,
        AddMaufacturerComponent,
        ManufacturerEditComponent,
        ManufacturerViewComponent,
        ManufacturerHiddenComponent
        
    ]
})
export class ManufacturerPagesModule { }
