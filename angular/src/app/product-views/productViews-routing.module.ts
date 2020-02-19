import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductViewsComponent } from "./ProductView/productViews.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProductViewsComponent,
        data: {
          title: 'Products Views'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsViewRoutingModule { }