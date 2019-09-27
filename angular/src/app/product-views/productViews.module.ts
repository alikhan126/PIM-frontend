import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProductsViewRoutingModule } from "./productViews-routing.module";

import { ProductViewsComponent } from "./ProductView/productViews.component";

@NgModule({
    imports: [
        CommonModule,
        ProductsViewRoutingModule,
        NgxDatatableModule
    ],
    declarations: [
        ProductViewsComponent,
    ]
})
export class ProductsViewModule { }
