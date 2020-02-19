import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagesPageComponent } from 'app/pages/images/image.component';
import { AddImageComponent} from './add/addImage.component';
import { ImageEditComponent } from './editing/image-editing.component';
import { ImageHiddenComponent } from './hidden/image-hidden.component';
import { TagsViewComponent } from './image-views/imageViews.component';

const routes: Routes = [
  {
    path: '',
     component: ImageEditComponent,
    data: {
      title: 'Image Editing Page'
    },    
  },
  {
    path: 'view',
     component: TagsViewComponent,
    data: {
      title: 'Image View Page'
    },    
  },
  {
    path: 'detail',
     component: ImagesPageComponent,
    data: {
      title: 'Images Page'
    },    
  },
  {
    path: 'unapproved',
     component: ImageHiddenComponent,
    data: {
      title: 'Image Hidden Page'
    },    
  },
  {
    path: ':id',
     component: AddImageComponent,
    data: {
      title: 'Add Image Page'
    },    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageRoutingModule { }
