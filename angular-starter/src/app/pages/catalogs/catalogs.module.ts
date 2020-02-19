import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { WebsitesRoutingModule } from "./catalogs-routing.module";

import { CatalogsPageComponent } from './catalogs.component';
import { AddCatalogComponent} from './add/addCatalog.component';
import { ReactiveFormsModule,FormControl,FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { CatalogsEditComponent } from './editing/catalog-editing.component';
import { CatalogsViewComponent } from './catalog-views/catalogViews.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        // FormControl,
        WebsitesRoutingModule ,
        Ng2SmartTableModule ,
        NgSelectModule,
        NgOptionHighlightModule,
        NgxDatatableModule
    ],
    declarations: [ 
        CatalogsPageComponent,
        AddCatalogComponent,
        CatalogsEditComponent,
        CatalogsViewComponent
        
    ]
})
export class CatalogsPagesModule { }
