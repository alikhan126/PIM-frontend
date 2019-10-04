import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { BrandsRoutingModule } from "./brands-routing.module";

import { BrandsPageComponent } from './brands.component';
import { AddBrandComponent} from './add/addBrand.component';
import { ReactiveFormsModule,FormControl,FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { BrandsEditComponent } from './editing/brand-editing.component';
import { BrandsViewComponent } from './brand-views/brandsViews.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        // FormControl,
        BrandsRoutingModule ,
        Ng2SmartTableModule ,
        NgSelectModule,
        NgOptionHighlightModule,
        NgxDatatableModule
    ],
    declarations: [ 
        BrandsPageComponent,
        AddBrandComponent,
        BrandsEditComponent,
        BrandsViewComponent
        
    ]
})
export class BrandsPagesModule { }
