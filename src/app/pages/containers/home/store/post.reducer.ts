import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { PostViewModel } from 'src/app/pages/models/view-models/post.models';
import * as PostActions from './post.actions';

export const PostsFeatureKey = 'Posts';

export interface PostState extends EntityState<PostViewModel> {
  isLoading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<PostViewModel> = createEntityAdapter<PostViewModel>({
  selectId: post => post.postId
});

export const initialState: PostState = adapter.getInitialState({
  isLoading: true,
  error: null
});

export const reducer = createReducer(
  initialState,
  on(PostActions.loadPosts,
    (state, action) => adapter.setAll(action.result, {
        ...state,
        isLoading: false
    })
  ),
  on(PostActions.requestLoadPosts,
    (state, action) => adapter.setAll([], {
      ...state,
      isLoading: true
  })
  )
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectIsLoading = (state: PostState) => state.isLoading;
export const selectError = (state: PostState) => state.error;
