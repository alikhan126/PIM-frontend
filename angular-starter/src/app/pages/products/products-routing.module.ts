import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsPageComponent } from 'app/pages/products/products.component';
import {ExtendedTableComponent} from './extended/extended-table.component';
import {AddProductComponent} from './add/addProduct.component';
const routes: Routes = [
  {
    path: '',
     component: ExtendedTableComponent,
    data: {
      title: 'Products Page'
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
