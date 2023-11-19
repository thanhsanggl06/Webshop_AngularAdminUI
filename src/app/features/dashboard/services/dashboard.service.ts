import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DailyRevenue, RevenueByCategory } from '../models/DailyRevenue.model';
import { environment } from 'src/environments/environment.development';
import { BestSeller } from '../models/bestseller.model';
import { TrackingOrder } from '../models/tracking-order.model';
import { OrderResponse } from '../models/order-response.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  updateComponent$ = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {}

  getDailyRevenue(): Observable<DailyRevenue[]> {
    // Lấy ngày hiện tại
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 1);

    // Lấy ngày 7 ngày trước
    const startDate = new Date();
    startDate.setHours(7, 0, 0, 0);
    startDate.setDate(startDate.getDate() - 7);
    // Chuyển đổi ngày thành chuỗi ISO 8601 nếu cần
    const isoEndDate = endDate.toISOString();
    const isoStartDate = startDate.toISOString();
    const params = new HttpParams()
      .set('startDate', isoStartDate)
      .set('endDate', isoEndDate)
      .set('addAuth', 'true');

    return this.http.get<DailyRevenue[]>(
      `${environment.apiBaseUrl}/order/dailyRevenue?${params}`
    );
  }

  getRevenueByCategory(): Observable<RevenueByCategory[]> {
    // Lấy ngày hiện tại
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 1);
    const startDate = new Date();
    startDate.setHours(7, 0, 0, 0);
    startDate.setDate(startDate.getDate());
    // Chuyển đổi ngày thành chuỗi ISO 8601 nếu cần
    const isoEndDate = endDate.toISOString();
    const isoStartDate = startDate.toISOString();
    const params = new HttpParams()
      .set('startDate', isoStartDate)
      .set('endDate', isoEndDate)
      .set('addAuth', 'true');
    return this.http.get<RevenueByCategory[]>(
      `${environment.apiBaseUrl}/order/revenueByCategory?${params}`
    );
  }

  getBestSeller(): Observable<BestSeller[]> {
    return this.http.get<BestSeller[]>(
      `${environment.apiBaseUrl}/order/bestSellingProducts?addAuth=true`
    );
  }

  getRecentOrder(): Observable<TrackingOrder[]> {
    return this.http.get<TrackingOrder[]>(
      `${environment.apiBaseUrl}/order/recentOrder?addAuth=true`
    );
  }

  updateOrderStatus(id: number, newStatus: string): Observable<OrderResponse> {
    const formData = new FormData();
    formData.append('newStatus', newStatus);
    return this.http.patch<OrderResponse>(
      `${environment.apiBaseUrl}/order/${id}/status?addAuth=true`,
      formData
    );
  }

  getOrdersFromStartdateToEndDate(
    startDate: string,
    endDate: string
  ): Observable<TrackingOrder[]> {
    const sDate = new Date(startDate);
    const eDate = new Date(endDate);

    // Lấy chuỗi ISO 8601 từ đối tượng Date
    const start = sDate.toISOString();
    const end = eDate.toISOString();

    const params = new HttpParams()
      .set('startDate', start)
      .set('endDate', end)
      .set('addAuth', 'true');
    return this.http.get<TrackingOrder[]>(
      `${environment.apiBaseUrl}/order?${params}`
    );
  }
}
