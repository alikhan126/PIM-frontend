import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { ProductsRoutingModule } from "./category-routing.module";

import { CategoryPageComponent } from './category.component';
import { AddCategoryComponent } from './add/addCategory.component';
import { ReactiveFormsModule,FormControl,FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { CategoryEditComponent } from './editing/category-editing.component';
import { CategoryViewComponent } from './category-views/categoriesViews.component';

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
        NgxDatatableModule
    ],
    declarations: [ 
        CategoryPageComponent,
        AddCategoryComponent,
        CategoryEditComponent,
        CategoryViewComponent
        
    ]
})
export class CategoryPagesModule { }
