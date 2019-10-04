import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryPageComponent } from 'app/pages/categories/category.component';
import {AddCategoryComponent} from './add/addCategory.component';
import { CategoryEditComponent } from './editing/category-editing.component';
import { CategoryViewComponent } from './category-views/categoriesViews.component';
const routes: Routes = [
  {
    path: '',
     component: CategoryEditComponent,
    data: {
      title: 'Brands Editing Page'
    },    
  },
  {
    path: 'view',
     component: CategoryViewComponent,
    data: {
      title: 'Brands View Page'
    },    
  },
  {
    path: 'detail',
     component: CategoryPageComponent,
    data: {
      title: 'Brands Page'
    },    
  },
  {
    path: ':id',
     component: AddCategoryComponent,
    data: {
      title: 'Add Brand Page'
    },    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule { }
