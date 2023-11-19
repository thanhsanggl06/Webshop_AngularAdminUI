import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { CategoryComponent } from './features/category/category.component';
import { ProductComponent } from './features/product/product.component';
import { AddProductComponent } from './features/add-product/add-product.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageSelectorComponent } from './shared/components/image-selector/image-selector.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { RevenueChartComponent } from './features/dashboard/revenue-chart/revenue-chart.component';
import { RecentOrderComponent } from './features/dashboard/recent-order/recent-order.component';
import { ListOrderComponent } from './features/list-order/list-order.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoryComponent,
    ProductComponent,
    AddProductComponent,
    ImageSelectorComponent,
    DashboardComponent,
    RevenueChartComponent,
    RecentOrderComponent,
    ListOrderComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
