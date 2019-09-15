import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ExtendedTableComponent } from "./extended/extended-table.component";


import { ProductsRoutingModule } from "./products-routing.module";

import { ProductsPageComponent } from './products.component';
import {AddProductComponent} from './add/addProduct.component';
import { ReactiveFormsModule,FormControl,FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        // FormControl,
        ProductsRoutingModule ,
        Ng2SmartTableModule  
    ],
    declarations: [ 
        ExtendedTableComponent,
        ProductsPageComponent,
        AddProductComponent
        
    ]
})
export class ProductsPagesModule { }
