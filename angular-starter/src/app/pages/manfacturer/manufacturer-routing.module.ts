import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManufacturerPageComponent } from 'app/pages/manfacturer/manufacturer.component';
import { AddMaufacturerComponent} from './add/addManufacturer.component';
import { ManufacturerEditComponent } from './editing/manufacturer-editing.component';
import { ManufacturerViewComponent } from './manufacturer-views/manufacturerViews.component';
const routes: Routes = [
  {
    path: '',
     component: ManufacturerEditComponent,
    data: {
      title: 'Manfacturer Editing Page'
    },    
  },
  {
    path: 'view',
     component: ManufacturerViewComponent,
    data: {
      title: 'Manfacturer View Page'
    },    
  },
  {
    path: 'detail',
     component: ManufacturerPageComponent,
    data: {
      title: 'Manufacturer Page'
    },    
  },
  {
    path: ':id',
     component: AddMaufacturerComponent,
    data: {
      title: 'Add Manufracturer Page'
    },    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManufacturerRoutingModule { }
