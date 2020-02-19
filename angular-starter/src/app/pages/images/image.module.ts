import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { ImageRoutingModule } from "./image-routing.module";

import { ImagesPageComponent } from './image.component';
import { AddImageComponent} from './add/addImage.component';
import { ReactiveFormsModule,FormControl,FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { ImageEditComponent } from './editing/image-editing.component';
import { TagsViewComponent } from './image-views/imageViews.component';
import { ImageHiddenComponent } from './hidden/image-hidden.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        // FormControl,
        ImageRoutingModule ,
        Ng2SmartTableModule ,
        NgSelectModule,
        NgOptionHighlightModule,
        NgxDatatableModule
    ],
    declarations: [ 
        ImagesPageComponent,
        AddImageComponent,
        ImageEditComponent,
        TagsViewComponent,
        ImageHiddenComponent
        
    ]
})
export class ImagePagesModule { }
