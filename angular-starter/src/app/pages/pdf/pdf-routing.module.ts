import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PDFPageComponent } from 'app/pages/pdf/pdf.component';
import { AddPDFComponent} from './add/addPdf.component';
import { PDFViewComponent } from './pdf-views/pdfViews.component';
import { PDFEditComponent } from './editing/pdf-editing.component';
import { PDFHiddenComponent } from './hidden/pdf-hidden.component';


const routes: Routes = [
  {
    path: '',
     component: PDFEditComponent,
    data: {
      title: 'PDF Editing Page'
    },    
  },
  {
    path: 'view',
     component: PDFViewComponent,
    data: {
      title: 'PDF View Page'
    },    
  },
  {
    path: 'detail',
     component: PDFPageComponent,
    data: {
      title: 'PDF Page'
    },    
  },
  {
    path: 'unapproved',
     component: PDFHiddenComponent,
    data: {
      title: 'PDF Hidden Page'
    },    
  },
  {
    path: ':id',
     component: AddPDFComponent,
    data: {
      title: 'Add PDF Page'
    },    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PDFRoutingModule { }
