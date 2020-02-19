import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermPageComponent } from 'app/pages/productPerm/perm.component';
import { AddPermComponent} from './add/addPerm.component';
import { PermEditComponent } from './editing/perm-editing.component';
import { AddBrandPermComponent} from './add-brand/addPerm.component';
import { PermBrandEditComponent } from './editing-brand/perm-editing.component';
import { AddCategoryPermComponent} from './add-category/addPerm.component';
import { PermCategoryEditComponent } from './editing-category/perm-editing.component';
import { AddManufacturerPermComponent} from './add-manufacturer/addPerm.component';
import { PermManufacturerEditComponent } from './editing-manufacturer/perm-editing.component';
import { AddCatalogPermComponent} from './add-catalog/addPerm.component';
import { PermCatalogEditComponent } from './editing-catalog/perm-editing.component';
import { AddTagPermComponent} from './add-tag/addPerm.component';
import { PermTagEditComponent } from './editing-tag/perm-editing.component';
import { AddAdapterPermComponent} from './add-adapter/addPerm.component';
import { PermAdapterEditComponent } from './editing-adapter/perm-editing.component';
import { AddWebsitePermComponent} from './add-website/addPerm.component';
import { PermWebsiteEditComponent } from './editing-website/perm-editing.component';

const routes: Routes = [
  {
    path: 'product',
     component: PermEditComponent,
    data: {
      title: 'Products Permission Editing Page'
    },    
  },
  {
    path: 'brand',
     component: PermBrandEditComponent,
    data: {
      title: 'Brand Permission Editing Page'
    },    
  },
  {
    path: 'category',
     component: PermCategoryEditComponent,
    data: {
      title: 'Category Permission Editing Page'
    },    
  },
  {
    path: 'manufacturer',
     component: PermManufacturerEditComponent,
    data: {
      title: 'Manufacturer Permission Editing Page'
    },    
  },
  {
    path: 'catalog',
     component: PermCatalogEditComponent,
    data: {
      title: 'Catalog Permission Editing Page'
    },    
  },
  {
    path: 'tag',
     component: PermTagEditComponent,
    data: {
      title: 'Tag Permission Editing Page'
    },    
  },
  {
    path: 'adapter',
     component: PermAdapterEditComponent,
    data: {
      title: 'Adapter Permission Editing Page'
    },    
  },
  {
    path: 'website',
     component: PermWebsiteEditComponent,
    data: {
      title: 'Website Adapter Editing Page'
    },    
  },
  {
    path: 'detail',
     component: PermPageComponent,
    data: {
      title: 'Products Permission Page'
    },    
  },
  {
    path: ':id',
     component: AddPermComponent,
    data: {
      title: 'Add Products Permission Page'
    },    
  },
  {
    path: 'brand/:id',
     component: AddBrandPermComponent,
    data: {
      title: 'Add Brand Permission Page'
    },    
  },
  {
    path: 'manufacturer/:id',
     component: AddManufacturerPermComponent,
    data: {
      title: 'Add Manufacturer Permission Page'
    },    
  },
  {
    path: 'catalog/:id',
     component: AddCatalogPermComponent,
    data: {
      title: 'Add Catalog Permission Page'
    },    
  },
  {
    path: 'category/:id',
     component: AddCategoryPermComponent,
    data: {
      title: 'Add Category Permission Page'
    },    
  },
  {
    path: 'tag/:id',
     component: AddTagPermComponent,
    data: {
      title: 'Add Tag Permission Page'
    },    
  },
  {
    path: 'adapter/:id',
     component: AddAdapterPermComponent,
    data: {
      title: 'Add Adapter Permission Page'
    },    
  },
  {
    path: 'website/:id',
     component: AddWebsitePermComponent,
    data: {
      title: 'Add Website Permission Page'
    },    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermRoutingModule { }
