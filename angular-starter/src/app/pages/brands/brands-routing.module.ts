import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrandsPageComponent } from 'app/pages/brands/brands.component';
import { AddBrandComponent} from './add/addBrand.component';
import { BrandsEditComponent } from './editing/brand-editing.component';
import { BrandsViewComponent } from './brand-views/brandsViews.component';
const routes: Routes = [
  {
    path: '',
     component: BrandsEditComponent,
    data: {
      title: 'Brands Editing Page'
    },    
  },
  {
    path: 'view',
     component: BrandsViewComponent,
    data: {
      title: 'Brands View Page'
    },    
  },
  {
    path: 'detail',
     component: BrandsPageComponent,
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
export class BrandsRoutingModule { }
