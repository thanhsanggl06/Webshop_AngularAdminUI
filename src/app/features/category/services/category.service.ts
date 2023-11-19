import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment.development';
import { CategoryRequest } from '../models/add-category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/category/all`);
  }

  createCategory(data: CategoryRequest): Observable<Category> {
    return this.http.post<Category>(
      `${environment.apiBaseUrl}/category/create?addAuth=true`,
      data
    );
  }
}
