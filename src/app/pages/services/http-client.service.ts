import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpClientService {
    [x: string]: any;
    constructor(private http: HttpClient) {
    }

    post<TEntity>(url: string, body: any): Observable<TEntity> {
        return this.http.post<TEntity>(url, body);
    }


    get<TEntity>(url: string): Observable<TEntity> {
        return this.http.get<TEntity>(url);
    }

    put<TEntity>(url: string, body: any): Observable<TEntity>{
      return this.http.put<TEntity>(url, body)
    }

    delete<TEntity>(url: string): Observable<TEntity>{
      return this.http.delete<TEntity>(url)
    }
    //#endregion
}
