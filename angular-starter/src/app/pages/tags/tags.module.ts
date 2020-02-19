import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { TagsRoutingModule } from "./tags-routing.module";

import { TagsPageComponent } from './tags.component';
import { AddTagsComponent} from './add/addTag.component';
import { ReactiveFormsModule,FormControl,FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { TagEditComponent } from './editing/tag-editing.component';
import { TagsViewComponent } from './tags-views/tagViews.component';
import { TagHiddenComponent } from './hidden/tag-hidden.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        // FormControl,
        TagsRoutingModule ,
        Ng2SmartTableModule ,
        NgSelectModule,
        NgOptionHighlightModule,
        NgxDatatableModule
    ],
    declarations: [ 
        TagsPageComponent,
        AddTagsComponent,
        TagEditComponent,
        TagsViewComponent,
        TagHiddenComponent
        
    ]
})
export class TagPagesModule { }
