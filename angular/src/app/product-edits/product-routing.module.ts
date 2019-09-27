import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsEditComponent } from "./editing/product-editing.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'editing',
        component: ProductsEditComponent,
        data: {
          title: 'Editing Data Table'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductEditRoutingModule { }