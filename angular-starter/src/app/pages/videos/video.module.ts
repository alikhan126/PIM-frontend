import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { VideoRoutingModule } from "./video-routing.module";

import { VideoPageComponent } from './video.component';
import { AddVideoComponent} from './add/addVideo.component';
import { ReactiveFormsModule,FormControl,FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { VideoEditComponent } from './editing/video-editing.component';
import { TagsViewComponent } from './video-views/videoViews.component';
import { ImageHiddenComponent } from './hidden/video-hidden.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        // FormControl,
        VideoRoutingModule ,
        Ng2SmartTableModule ,
        NgSelectModule,
        NgOptionHighlightModule,
        NgxDatatableModule
    ],
    declarations: [ 
        VideoPageComponent,
        AddVideoComponent,
        VideoEditComponent,
        TagsViewComponent,
        ImageHiddenComponent
        
    ]
})
export class VideoPagesModule { }
