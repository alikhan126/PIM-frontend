import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsPageComponent } from 'app/pages/products/products.component';
import {ExtendedTableComponent} from './extended/extended-table.component';
import {AddProductComponent} from './add/addProduct.component';
import { ProductsEditComponent } from './editing/product-editing.component';
import { ProductViewsComponent } from './product-views/productViews.component';
const routes: Routes = [
  {
    path: 'old',
     component: ExtendedTableComponent,
    data: {
      title: 'Products Page'
    },    
  },
  {
    path: '',
     component: ProductsEditComponent,
    data: {
      title: 'Products Editing Page'
    },    
  },
  {
    path: 'view',
     component: ProductViewsComponent,
    data: {
      title: 'Products Views Page'
    },    
  },
  {
    path: 'detail',
     component: ProductsPageComponent,
    data: {
      title: 'Products Page'
    },    
  },
  {
    path: ':id',
     component: AddProductComponent,
    data: {
      title: 'Add Product Page'
    },    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule { }
