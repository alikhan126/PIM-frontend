import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer
export const Full_ROUTES: Routes = [
  {
    path: 'changelog',
    loadChildren: () => import('../../changelog/changelog.module').then(m => m.ChangeLogModule)
  },
  {
    path: 'full-layout',
    loadChildren: () => import('../../pages/full-layout-page/full-pages.module').then(m => m.FullPagesModule)
  },
  {
    path: 'products',
    loadChildren: () => import('../../pages/products/products.module').then(m => m.ProductsPagesModule)
  },
  {
    path: 'brands',
    loadChildren: () => import('../../pages/brands/brands.module').then(m => m.BrandsPagesModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('../../pages/categories/category.module').then(m => m.CategoryPagesModule)
  },
  {
    path: 'websites',
    loadChildren: () => import('../../pages/websites/websites.module').then(m => m.WebsitesPagesModule)
  },
  {
    path: 'manufacturer',
    loadChildren: () => import('../../pages/manfacturer/manufacturer.module').then(m => m.ManufacturerPagesModule)
  },
  {
    path: 'permissions',
    loadChildren: () => import('../../pages/roles/roles.module').then(m => m.RolesPagesModule)
  },
  {
    path: 'role',
    loadChildren: () => import('../../pages/role/roles.module').then(m => m.RolePagesModule)
  },
  {
    path: 'assignroles',
    loadChildren: () => import('../../pages/assignRoles/roles.module').then(m => m.AssingRolePagesModule)
  },
  {
    path: 'fields',
    loadChildren: () => import('../../pages/productPerm/perm.module').then(m => m.PermPagesModule)
  },
  {
    path: 'tags',
    loadChildren: () => import('../../pages/tags/tags.module').then(m => m.TagPagesModule)
  }
];
