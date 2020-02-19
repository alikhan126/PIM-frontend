import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullLayoutPageComponent } from 'app/pages/full-layout-page/full-layout-page.component';
import { UserProfilePageComponent } from "./user-profile/user-profile-page.component";
import { EditUserComponent } from "./editUser/editUser.component";

const routes: Routes = [
  {
    path: '',
     component: FullLayoutPageComponent,
    data: {
      title: 'Full Layout Page'
    },    
  },
  {
    path: 'profile',
    component: UserProfilePageComponent,
    data: {
      title: 'User Profile Page'
    }
  },
  {
    path: 'profile/:id',
    component: EditUserComponent,
    data: {
      title: 'User Edit Page'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule { }
