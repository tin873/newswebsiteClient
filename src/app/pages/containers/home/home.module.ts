import { CommonModule } from '@angular/common';
import { NgModule, Pipe } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TruncatePipe } from 'src/app/share/pipe/truncaced.pipe';
import { PostService } from '../../services/post.service';
import { HomeComponent } from './home.component';
import { PostViewDetailComponent } from './postDetail/postViewDetail.component';
import { PostEffects } from './store/post.effects';
import * as fromPost from './store/post.reducer'

const routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'postDetail/:id',
    component: PostViewDetailComponent
  }
];
@NgModule({
  declarations: [
    HomeComponent,
    PostViewDetailComponent,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromPost.PostsFeatureKey, fromPost.reducer),
    EffectsModule.forFeature([PostEffects]),
  ],
  providers: [
    PostService,
  ]
})
export class HomeModule { }
