import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebsitesPageComponent } from 'app/pages/websites/websites.component';
import { AddBrandComponent} from './add/addWebsite.component';
import { WebsitesEditComponent } from './editing/website-editing.component';
import { WebsitesViewComponent } from './website-views/websiteViews.component';
const routes: Routes = [
  {
    path: '',
     component: WebsitesEditComponent,
    data: {
      title: 'Brands Editing Page'
    },    
  },
  {
    path: 'view',
     component: WebsitesViewComponent,
    data: {
      title: 'Brands View Page'
    },    
  },
  {
    path: 'detail',
     component: WebsitesPageComponent,
    data: {
      title: 'Brands Page'
    },    
  },
  {
    path: ':id',
     component: AddBrandComponent,
    data: {
      title: 'Add Brand Page'
    },    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebsitesRoutingModule { }
