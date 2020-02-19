import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RolePageComponent } from 'app/pages/role/roles.component';
import { AddRoleComponent} from './add/addRole.component';
import { RolesEditComponent } from './editing/role-editing.component';
import { RolesViewComponent } from './roles-views/rolesViews.component';
const routes: Routes = [
  {
    path: '',
     component: RolesEditComponent,
    data: {
      title: 'Roles Editing Page'
    },    
  },
  {
    path: 'view',
     component: RolesViewComponent,
    data: {
      title: 'Roles View Page'
    },    
  },
  {
    path: 'detail',
     component: RolePageComponent,
    data: {
      title: 'Role Page'
    },    
  },
  {
    path: ':id',
     component: AddRoleComponent,
    data: {
      title: 'Add Role Page'
    },    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesRoutingModule { }
