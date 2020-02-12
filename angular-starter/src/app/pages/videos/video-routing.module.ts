import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoPageComponent } from 'app/pages/videos/video.component';
import { AddVideoComponent } from './add/addVideo.component';
import { VideoEditComponent } from './editing/video-editing.component';
import { ImageHiddenComponent } from './hidden/video-hidden.component';
import { TagsViewComponent } from './video-views/videoViews.component';

const routes: Routes = [
  {
    path: '',
     component: VideoEditComponent,
    data: {
      title: 'Video Editing Page'
    },    
  },
  {
    path: 'view',
     component: TagsViewComponent,
    data: {
      title: 'Video View Page'
    },    
  },
  {
    path: 'detail',
     component: VideoPageComponent,
    data: {
      title: 'Video Page'
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
     component: AddVideoComponent,
    data: {
      title: 'Add Video Page'
    },    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoRoutingModule { }
