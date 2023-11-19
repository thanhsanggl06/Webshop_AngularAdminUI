import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../product/models/product.model';
import { ProductRequest } from './models/add-product.model';
import { ProductService } from '../product/services/product.service';
import { Router } from '@angular/router';
import { CategoryService } from '../category/services/category.service';
import { Category } from '../category/models/category.model';
import { Observable, Subscription } from 'rxjs';
import { ImageService } from 'src/app/shared/components/image-selector/image.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit, OnDestroy {
  categories$?: Observable<Category[]>;
  model: ProductRequest;
  createProductSubscriptions?: Subscription;
  isImageSeletorVisible: boolean = false;
  imageSelectSubscription?: Subscription;

  constructor(
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService,
    private imageService: ImageService
  ) {
    this.model = {
      title: '',
      categoryId: 2,
      description: '',
      imageUrl: '',
      price: 0,
      quantity: 0,
      supplier: '',
    };
  }
  ngOnDestroy(): void {
    this.createProductSubscriptions?.unsubscribe();
    this.imageSelectSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();

    this.imageSelectSubscription = this.imageService.onSelectImage().subscribe({
      next: (selectedImage) => {
        this.model.imageUrl = selectedImage.filePath;
        this.closeImageSelector();
      },
    });
  }

  openImageSeletor(): void {
    this.isImageSeletorVisible = true;
  }

  closeImageSelector(): void {
    this.isImageSeletorVisible = false;
  }

  onFormSubmit(): void {
    if (this.model.price > 0 && this.model.quantity > 0) {
      this.createProductSubscriptions = this.productService
        .createProduct(this.model)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/productList');
          },
          error: (err) => {
            alert('Lỗi');
          },
        });
    } else {
      alert('Đơn giá và số lượng phải lớn hơn 0');
    }
  }
}
