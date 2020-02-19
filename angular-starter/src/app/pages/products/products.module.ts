import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ExtendedTableComponent } from "./extended/extended-table.component";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { ProductsRoutingModule } from "./products-routing.module";

import { ProductsPageComponent } from './products.component';
import {AddProductComponent} from './add/addProduct.component';
import { ReactiveFormsModule,FormControl,FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { ProductsEditComponent } from './editing/product-editing.component';
import { ProductViewsComponent } from './product-views/productViews.component';
import { ProductsEditsComponent } from './product-edits/product-editing.component';
import { ProductsHiddenComponent } from './hidden/product-hidden.component';
import { RegularTableComponent } from "./regular/regular-table.component";
import {ExportComponent} from "./export/export.component"
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        // FormControl,
        ProductsRoutingModule ,
        Ng2SmartTableModule ,
        NgSelectModule,
        NgOptionHighlightModule,
        NgxDatatableModule,
        FileUploadModule
    ],
    declarations: [ 
        ExtendedTableComponent,
        ProductsPageComponent,
        AddProductComponent,
        ProductsEditComponent,
        ProductViewsComponent,
        ProductsEditsComponent,
        RegularTableComponent,
        ExportComponent,
        ProductsHiddenComponent
        
    ]
})
export class ProductsPagesModule { }
