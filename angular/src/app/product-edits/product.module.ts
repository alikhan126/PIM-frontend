import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProductEditRoutingModule } from "./product-routing.module";

import { ProductsEditComponent } from "./editing/product-editing.component";

@NgModule({
    imports: [
        CommonModule,
        ProductEditRoutingModule,
        NgxDatatableModule
    ],
    declarations: [
        ProductsEditComponent
    ]
})
export class ProductsEditModule { }
