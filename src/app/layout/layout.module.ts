import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BlockUIModule } from 'ng-block-ui';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../pages/services/category.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PostEffects } from '../pages/containers/home/store/post.effects';
import * as fromPost from '../pages/containers/home/store/post.reducer'

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ContentComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature(fromPost.PostsFeatureKey, fromPost.reducer),
    EffectsModule.forFeature([PostEffects]),
    FormsModule,
    NgbModule,
    BlockUIModule.forRoot({
      delayStart: 100,
      delayStop: 500
    })
  ],
  providers: [
    CategoryService
  ],
})
export class LayoutModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: LayoutModule
  ) {
    if (parentModule) {
      throw new Error('LayoutModule is already loaded. Import it in the AppModule only.');
    }
  }
}
