import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from 'src/environments/environment.development';
import { ProductRequest } from '../../add-product/models/add-product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getPageProducts(
    page = '0',
    size = '12',
    sort = 'desc',
    sortBy = 'title',
    category?: string
  ): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${environment.apiBaseUrl}/products${
        category ? '/category/' + category : ''
      }?page=${page}&size=${size}&sortOrder=${sort}&sortBy=${sortBy}`
    );
  }

  createProduct(data: ProductRequest): Observable<Product> {
    return this.http.post<Product>(
      `${environment.apiBaseUrl}/products/create?addAuth=true`,
      data
    );
  }
}
