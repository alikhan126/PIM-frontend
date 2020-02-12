import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { PDFRoutingModule } from "./pdf-routing.module";

import { PDFPageComponent } from './pdf.component';
import { AddPDFComponent} from './add/addPdf.component';
import { ReactiveFormsModule,FormControl,FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { PDFEditComponent } from './editing/pdf-editing.component';
import { PDFViewComponent } from './pdf-views/pdfViews.component';
import { PDFHiddenComponent } from './hidden/pdf-hidden.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        // FormControl,
        PDFRoutingModule ,
        Ng2SmartTableModule ,
        NgSelectModule,
        NgOptionHighlightModule,
        NgxDatatableModule
    ],
    declarations: [ 
        PDFPageComponent,
        AddPDFComponent,
        PDFEditComponent,
        PDFViewComponent,
        PDFHiddenComponent
        
    ]
})
export class PDFPagesModule { }
