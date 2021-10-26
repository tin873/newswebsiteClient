
import { createAction, props } from '@ngrx/store';
import { PostViewModel } from 'src/app/pages/models/view-models/post.models';


export const requestLoadPosts = createAction(
  '[Post/API] Request Load Posts'
);

export const loadPosts = createAction(
  '[Post/API] Load Post',
  props<{ result: PostViewModel[] }>()
);

export const getPostByCategory = createAction(
  '[Post/API] GetByCategory',
  props<{ categoryId: number }>()
);

export const getSearchPostFromGetAll = createAction(
  '[Post] Search Posts',
  props<{ search: string }>()
);

export const getSearchPostToGetApi = createAction(
  '[Post/API] Search Posts',
  props<{ search: string }>()
);
