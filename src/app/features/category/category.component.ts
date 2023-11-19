import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from './services/category.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from './models/category.model';
import { CategoryRequest } from './models/add-category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  categories$?: Observable<Category[]>;
  model: CategoryRequest;
  createCategorySubscription?: Subscription;
  constructor(private categoryService: CategoryService) {
    this.model = {
      description: '',
      imageUrl: '',
      name: '',
      url: '',
    };
  }
  ngOnDestroy(): void {
    this.createCategorySubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
  }

  onFormSubmit(): void {
    this.createCategorySubscription = this.categoryService
      .createCategory(this.model)
      .subscribe({
        next: (response) => {
          this.categories$ = this.categoryService.getAllCategories();
          this.model = {
            description: '',
            imageUrl: '',
            name: '',
            url: '',
          };
        },
      });
  }
}
