import { Component, OnInit } from '@angular/core';
import { TrackingOrder } from '../models/tracking-order.model';
import { DashboardService } from '../services/dashboard.service';
import { Observable } from 'rxjs';
import { WebSocketService } from 'src/app/core/components/navbar/services/web-socket.service';

@Component({
  selector: 'app-recent-order',
  templateUrl: './recent-order.component.html',
  styleUrls: ['./recent-order.component.css'],
})
export class RecentOrderComponent implements OnInit {
  recentOrder$?: Observable<TrackingOrder[]>;
  constructor(
    private dashboardService: DashboardService,
    private webSocketAPI: WebSocketService
  ) {}
  ngOnInit(): void {
    // this.recentOrder$ = this.dashboardService.getRecentOrder();
    this.webSocketAPI.getNotifications();
    this.listenerOrder();
  }

  onAcceptOrder(id: number, newStatus: string = 'accept'): void {
    this.dashboardService.updateOrderStatus(id, newStatus).subscribe({
      next: (response) => {
        this.recentOrder$ = this.dashboardService.getRecentOrder();
        this.dashboardService.updateComponent$.next(true);
      },
    });
  }

  listenerOrder() {
    this.webSocketAPI.getNewOrder().subscribe((message: any) => {
      this.recentOrder$ = this.dashboardService.getRecentOrder();
    });
  }
}
