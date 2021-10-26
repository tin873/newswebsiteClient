import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, delay } from 'rxjs/operators';
import { PostService } from 'src/app/pages/services/post.service';
import { getPostByCategory, getSearchPostFromGetAll, getSearchPostToGetApi, loadPosts, requestLoadPosts } from './post.actions';


@Injectable()
export class PostEffects {
  constructor(private actions$: Actions, private service: PostService) {
  }

  loadPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestLoadPosts),
      switchMap(action =>
        this.service.getAll().pipe(
          delay(1000),
          map(data => loadPosts({result: data.data}))
      ))
    )
  );

  loadPostByCategory$ = createEffect(() =>
  this.actions$.pipe(
    ofType(getPostByCategory),
    switchMap(action =>
      this.service.getByCategoryId(action.categoryId).pipe(
        delay(1000),
        map(data => loadPosts({result: data.data}))
    ))
  )
  );
//search
  searchPostfromList$ = createEffect(() =>
      this.actions$.pipe(
        ofType(getSearchPostFromGetAll),
        switchMap(action => this.service.getSearchPostToGetAll(action.search)
        .pipe(
          delay(500),
          map(data => loadPosts({result: data}))
        ))
      )
  );

  searchPostApi$ = createEffect(() =>
      this.actions$.pipe(
        ofType(getSearchPostToGetApi),
        switchMap(action => this.service.getSearchPostApi(action.search)
        .pipe(
          delay(500),
          map(data => loadPosts({result: data.data}))
        ))
      )
  );
}
