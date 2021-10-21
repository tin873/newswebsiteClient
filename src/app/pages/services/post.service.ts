import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigSetting } from 'src/app/share/configs/config-setting';
import { PostRequest } from '../models/requests/post.request';
import { PostGetResponse, PostListResponse, PostResponse } from '../models/responses/post.response';
import { HttpClientService } from './http-client.service';

@Injectable()
export class PostService {
    constructor(private httpClient: HttpClientService) {
    }

    getAll(): Observable<PostListResponse> {
      debugger;
      const url = ConfigSetting.baseUrl  + ConfigSetting.post;
      return this.httpClient.get<PostListResponse>(url);
    }

    getById(postId: string | null): Observable<PostGetResponse> {
      const url = ConfigSetting.baseUrl  + ConfigSetting.post + `/${postId}`;
      return this.httpClient.get<PostGetResponse>(url);
    }

    getByCategoryId(categoryId: number): Observable<PostListResponse> {
      debugger;
      const url = ConfigSetting.baseUrl  + ConfigSetting.getPostByCategory + `?categoryId=` +`${categoryId}`;
      console.log(url);
      return this.httpClient.get<PostListResponse>(url);
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
