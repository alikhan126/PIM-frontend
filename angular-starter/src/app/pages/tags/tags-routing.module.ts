import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TagsPageComponent } from 'app/pages/tags/tags.component';
import { AddTagsComponent} from './add/addTag.component';
import { TagEditComponent } from './editing/tag-editing.component';
import { TagsViewComponent } from './tags-views/tagViews.component';
const routes: Routes = [
  {
    path: '',
     component: TagEditComponent,
    data: {
      title: 'Manfacturer Editing Page'
    },    
  },
  {
    path: 'view',
     component: TagsViewComponent,
    data: {
      title: 'Tag View Page'
    },    
  },
  {
    path: 'detail',
     component: TagsPageComponent,
    data: {
      title: 'Tags Page'
    },    
  },
  {
    path: ':id',
     component: AddTagsComponent,
    data: {
      title: 'Add Tag Page'
    },    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagsRoutingModule { }
