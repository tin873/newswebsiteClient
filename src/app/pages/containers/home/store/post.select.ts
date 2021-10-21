import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromStore from './post.reducer';

const postsSelector = createFeatureSelector<fromStore.PostState>(fromStore.PostsFeatureKey);

export const isLoading = createSelector(postsSelector, fromStore.selectIsLoading);
export const posts = createSelector(postsSelector, fromStore.selectAll);
export const error = createSelector(postsSelector, fromStore.selectError);
