import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrackingOrder } from '../dashboard/models/tracking-order.model';
import { DashboardService } from '../dashboard/services/dashboard.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css'],
})
export class ListOrderComponent implements OnInit {
  now = new Date();
  startDate: string =
    this.now.getFullYear() +
    '-' +
    (this.now.getMonth() + 1) +
    '-' +
    this.now.getDate();
  endDate: string =
    this.now.getFullYear() +
    '-' +
    (this.now.getMonth() + 1) +
    '-' +
    (this.now.getDate()+1);
  recentOrder$?: Observable<TrackingOrder[]>;
  constructor(private dashboardService: DashboardService) {}
  ngOnInit(): void {
    this.recentOrder$ = this.dashboardService.getOrdersFromStartdateToEndDate(
      this.startDate,
      this.endDate
    );
  }

  // onAcceptOrder(id: number, newStatus: string = 'accept'): void {
  //   this.dashboardService.updateOrderStatus(id, newStatus).subscribe({
  //     next: (response) => {
  //       this.recentOrder$ = this.dashboardService.getRecentOrder();
  //     },
  //   });
  // }

  onDateRangeSelected(): void {
    console.log(this.startDate);

    this.recentOrder$ = this.dashboardService.getOrdersFromStartdateToEndDate(
      this.startDate,
      this.endDate
    );
  }
}
