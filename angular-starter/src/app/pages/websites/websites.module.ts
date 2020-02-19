import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { WebsitesRoutingModule } from "./websites-routing.module";

import { WebsitesPageComponent } from './websites.component';
import { AddWebsiteComponent} from './add/addWebsite.component';
import { ReactiveFormsModule,FormControl,FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { WebsitesEditComponent } from './editing/website-editing.component';
import { WebsitesHiddenComponent } from './hidden/website-hidden.component';
import { WebsitesViewComponent } from './website-views/websiteViews.component';

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
        WebsitesPageComponent,
        AddWebsiteComponent,
        WebsitesEditComponent,
        WebsitesViewComponent,
        WebsitesHiddenComponent
        
    ]
})
export class WebsitesPagesModule { }
