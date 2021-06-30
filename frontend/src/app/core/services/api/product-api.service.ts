import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Product } from "../../../shared/models/product-models";
import { PageResult } from "../../../shared/models/result-models";

@Injectable()
export class ProductApiService {
  constructor(private httpClient: HttpClient) { }

  getList(startIndex: number = 0, pageIndex: number = 10, sortBy: string, sortDirection: string): Observable<PageResult<Product>> {
    console.log('[Product] Get List');
    const params = new HttpParams()
      .set('startIndex', startIndex.toString())
      .set('pageSize', pageIndex.toString())
      .set('sortBy', sortBy)
      .set('sortDir', sortDirection);

    return this.httpClient.get<PageResult<Product>>('products', { params });
  }

  get(id: string): Observable<Product> {
    console.log('[Product] Get');
    return this.httpClient.get<Product>(`products/${id}`);
  }

  add(product: Product): Observable<Product> {
    console.log('[Product] Add');
    return this.httpClient.post<Product>('products', product);
  }

  update(id: number, product: Product): Observable<Product> {
    console.log('[Product] Update');
    return this.httpClient.put<Product>(`products/${id}`, product);
  }

  delete(id: number): Observable<void> {
    console.log('[Product] Delete');
    return this.httpClient.delete<void>(`products/${id}`);
  }
}
