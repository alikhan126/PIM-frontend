import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermPageComponent } from 'app/pages/productPerm/perm.component';
import { AddPermComponent} from './add/addPerm.component';
import { PermEditComponent } from './editing/perm-editing.component';
const routes: Routes = [
  {
    path: 'product',
     component: PermEditComponent,
    data: {
      title: 'Products Permission Editing Page'
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermRoutingModule { }
