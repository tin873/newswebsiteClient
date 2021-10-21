import { PostViewModel } from "../view-models/post.models";
import { BaseEntityResponse } from "./base.response";

export interface PostResponse extends BaseEntityResponse<PostModelResponse> { }
export interface PostListResponse extends BaseEntityResponse<PostViewModel[]> { }
export interface PostGetResponse extends BaseEntityResponse<PostViewModel> { }


export class PostModelResponse{
  data!: number;
}
