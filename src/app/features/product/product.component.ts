import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from './services/product.service';
import { Observable } from 'rxjs';
import { Product } from './models/product.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  sort = 'desc';
  totalItems = 100; // Tổng số mục dữ liệu
  pageSize = 10; // Kích thước trang mặc định
  currentPage = 0; // Trang hiện tại
  paginatedPages: number[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined; //Truy Cap vao matPaginator
  productList$?: Observable<Product[]>;
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.productList$ = this.productService.getPageProducts(
      this.currentPage.toString(),
      this.pageSize.toString(),
      this.sort
    );
  }

  pageEvent(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.productList$ = this.productService.getPageProducts(
      this.currentPage.toString(),
      this.pageSize.toString(),
      this.sort
    );
  }
}
