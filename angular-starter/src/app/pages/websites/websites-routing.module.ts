import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebsitesPageComponent } from 'app/pages/websites/websites.component';
import { AddWebsiteComponent} from './add/addWebsite.component';
import { WebsitesEditComponent } from './editing/website-editing.component';
import { WebsitesViewComponent } from './website-views/websiteViews.component';
const routes: Routes = [
  {
    path: '',
     component: WebsitesEditComponent,
    data: {
      title: 'Websites Editing Page'
    },    
  },
  {
    path: 'view',
     component: WebsitesViewComponent,
    data: {
      title: 'Websites View Page'
    },    
  },
  {
    path: 'detail',
     component: WebsitesPageComponent,
    data: {
      title: 'Website Page'
    },    
  },
  {
    path: ':id',
     component: AddWebsiteComponent,
    data: {
      title: 'Add Website Page'
    },    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebsitesRoutingModule { }
