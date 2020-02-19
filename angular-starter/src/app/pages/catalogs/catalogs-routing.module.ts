import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogsPageComponent } from './catalogs.component';
import { AddCatalogComponent} from './add/addCatalog.component';
import { CatalogsEditComponent } from './editing/catalog-editing.component';
import { CatalogsViewComponent } from './catalog-views/catalogViews.component';
const routes: Routes = [
  {
    path: '',
     component: CatalogsEditComponent,
    data: {
      title: 'Catalogs Editing Page'
    },    
  },
  {
    path: 'view',
     component: CatalogsViewComponent,
    data: {
      title: 'Catalogs View Page'
    },    
  },
  {
    path: 'detail',
     component: CatalogsPageComponent,
    data: {
      title: 'Catalog Page'
    },    
  },
  {
    path: ':id',
     component: AddCatalogComponent,
    data: {
      title: 'Add Catalog Page'
    },    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebsitesRoutingModule { }
