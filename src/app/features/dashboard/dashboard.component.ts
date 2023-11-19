import { Component, OnInit } from '@angular/core';
import { DashboardService } from './services/dashboard.service';
import { BestSeller } from './models/bestseller.model';
import { TrackingOrder } from './models/tracking-order.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  bestSell: BestSeller[] = [];
  constructor(private dashboardService: DashboardService) {}
  ngOnInit(): void {
    this.dashboardService.getBestSeller().subscribe({
      next: (value) => {
        this.bestSell = value;
      },
    });
  }
}
