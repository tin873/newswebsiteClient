import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigSetting } from 'src/app/share/configs/config-setting';
import { PostRequest } from '../models/requests/post.request';
import { PostGetResponse, PostListResponse, PostResponse } from '../models/responses/post.response';
import { PostViewModel } from '../models/view-models/post.models';
import { HttpClientService } from './http-client.service';

@Injectable()
export class PostService {
    constructor(private httpClient: HttpClientService) {
    }

    getAll(): Observable<PostListResponse> {
      const url = ConfigSetting.baseUrl  + ConfigSetting.post;
      return this.httpClient.get<PostListResponse>(url);
    }

    getById(postId: string | null): Observable<PostGetResponse> {
      const url = ConfigSetting.baseUrl  + ConfigSetting.post + `/${postId}`;
      return this.httpClient.get<PostGetResponse>(url);
    }

    getByCategoryId(categoryId: number): Observable<PostListResponse> {
      const url = ConfigSetting.baseUrl  + ConfigSetting.getPostByCategory + `?categoryId=` +`${categoryId}`;
      return this.httpClient.get<PostListResponse>(url);
    }

    //call api seach get list data
    getSearchPostApi(search: string): Observable<PostListResponse>{
      const url = ConfigSetting.baseUrl  + ConfigSetting.getPostSearch + `?search=` +`${search}`;
      return this.httpClient.get<PostListResponse>(url);
    }

    //search of list data when called api
    getSearchPostToGetAll(search: string): Observable<PostViewModel[]>{
      return this.getAll().pipe(
        map((list: PostListResponse) => list.data.filter((value) => value.title.toLowerCase().indexOf(search.toLowerCase()) > -1))
      );
    }

    addPost(request: PostRequest): Observable<PostResponse>{
      const url = ConfigSetting.baseUrl  + ConfigSetting.post;
      return this.httpClient.post<PostResponse>(url,request)
    }

    editPost(request: PostRequest): Observable<PostResponse>{
      const url = ConfigSetting.baseUrl  + ConfigSetting.post;
      return this.httpClient.put<PostResponse>(url, request)
    }

    deletePost(PostId: number): Observable<PostResponse>{
      const url = ConfigSetting.baseUrl  + ConfigSetting.post + `/${PostId}`;
      return this.httpClient.delete<PostResponse>(url)
    }
}
