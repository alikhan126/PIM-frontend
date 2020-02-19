import { Routes, RouterModule } from '@angular/router';
//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: 'products',
    loadChildren: () => import('../../product-edits/product.module').then(m => m.ProductsEditModule)
  },
  {
    path: 'productsview',
    loadChildren: () => import('../../product-views/productViews.module').then(m => m.ProductsViewModule)
  }
];
