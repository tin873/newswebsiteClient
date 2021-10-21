import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigSetting } from 'src/app/share/configs/config-setting';
import { CategoryRequest } from '../models/requests/category.request';
import { CategoryListResponse, CategoryResponse } from '../models/responses/category.response';
import { HttpClientService } from './http-client.service';

@Injectable()
export class CategoryService {
    constructor(private httpClient: HttpClientService) {
    }

    getAll(): Observable<CategoryListResponse> {
      const url = ConfigSetting.baseUrl  + ConfigSetting.category;
      return this.httpClient.get<CategoryListResponse>(url);
    }

    addCategory(request: CategoryRequest): Observable<CategoryResponse>{
      const url = ConfigSetting.baseUrl  + ConfigSetting.category;
      return this.httpClient.post<CategoryResponse>(url,request)
    }

    editCategory(request: CategoryRequest): Observable<CategoryResponse>{
      const url = ConfigSetting.baseUrl  + ConfigSetting.category;
      return this.httpClient.put<CategoryResponse>(url,request)
    }

    deleteCategory(categoryId: number): Observable<CategoryResponse>{
      const url = ConfigSetting.baseUrl  + ConfigSetting.category + `/${categoryId}`;
      return this.httpClient.delete<CategoryResponse>(url)
    }
}
