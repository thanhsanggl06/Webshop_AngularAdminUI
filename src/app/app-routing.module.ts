import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './features/category/category.component';
import { ProductComponent } from './features/product/product.component';
import { AddProductComponent } from './features/add-product/add-product.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ListOrderComponent } from './features/list-order/list-order.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './features/auth/guards/auth.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [authGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  { path: 'category', component: CategoryComponent, canActivate: [authGuard] },
  {
    path: 'productList',
    component: ProductComponent,
    canActivate: [authGuard],
  },
  {
    path: 'addproduct',
    component: AddProductComponent,
    canActivate: [authGuard],
  },
  {
    path: 'list-order',
    component: ListOrderComponent,
    canActivate: [authGuard],
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
