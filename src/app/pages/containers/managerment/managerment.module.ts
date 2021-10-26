import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { BlockUIModule } from 'ng-block-ui';
import { CKEditorModule } from 'ng2-ckeditor';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { PupUpDetailCategoryService } from '../../services/pupupDetailCategory.service';
import { PupUpDetailPostService } from '../../services/pupupDetailPost.service';
import { AddCategoryComponent } from './addCategory/addCategory.component';
import { ManagermentCategoryComponent } from './homeCategory/managermentCategory.component';
import { ManagermentPostComponent } from './homePost/managermentPost.component';
import { PostDetailComponent } from './postDetail/postDetail.component';


@NgModule({
  declarations: [
    ManagermentCategoryComponent,
    AddCategoryComponent,
    ManagermentPostComponent,
    PostDetailComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    NgSelectModule,
    BlockUIModule.forRoot({
      delayStart: 100,
      delayStop: 500
    })
  ],
  providers: [
    PupUpDetailCategoryService,
    PupUpDetailPostService,
    CategoryService,
    PostService
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class ManagermentModule { }
