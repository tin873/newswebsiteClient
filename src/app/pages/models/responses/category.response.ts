import { CategoryViewModel } from "../view-models/category.models";
import { BaseEntityResponse } from "./base.response";

export interface CategoryResponse extends BaseEntityResponse<CategoryModelResponse> { }
export interface CategoryListResponse extends BaseEntityResponse<CategoryViewModel[]> { }

export class CategoryModelResponse{
  data!: number;
}
