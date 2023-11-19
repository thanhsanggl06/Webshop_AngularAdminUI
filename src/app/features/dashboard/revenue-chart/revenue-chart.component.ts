import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { DailyRevenue, RevenueByCategory } from '../models/DailyRevenue.model';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-revenue-chart',
  templateUrl: './revenue-chart.component.html',
  styleUrls: ['./revenue-chart.component.css'],
})
export class RevenueChartComponent implements OnInit {
  data: DailyRevenue[] = [];
  data2: RevenueByCategory[] = [];
  chart1: any;
  chart2: any;
  constructor(private dashboardService: DashboardService) {}
  ngOnInit(): void {
    this.dashboardService.getDailyRevenue().subscribe({
      next: (value) => {
        this.data = value;
        this.createChart();
      },
    });

    this.dashboardService.getRevenueByCategory().subscribe({
      next: (value) => {
        this.data2 = value;
        this.createPieChart();
      },
    });

    this.dashboardService.updateComponent$.subscribe(() => {
      this.dashboardService.getDailyRevenue().subscribe({
        next: (value) => {
          this.data = value;
          this.createChart();
        },
      });

      this.dashboardService.getRevenueByCategory().subscribe({
        next: (value) => {
          this.data2 = value;
          this.createPieChart();
        },
      });
    });
  }

  createPieChart(): void {
    const totalRevenue = this.data2.reduce(
      (acc, curr) => acc + curr.revenue,
      0
    );

    if (this.chart1) {
      this.chart1.destroy();
    }
    this.chart1 = new Chart('canvas2', {
      type: 'doughnut',
      data: {
        labels: this.data2.map((item) => item.category),
        datasets: [
          {
            data: this.data2.map((item) => item.revenue),
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'rgb(255, 155, 86)',
              '#ff0000',
              '#00ff00',
              '#0000ff',
              '#ffff00',
            ],
          },
        ],
      },
      options: {
        plugins: {
          subtitle: {
            display: true,
            text: 'Tổng doanh thu : ' + totalRevenue,
          },
          title: {
            display: true,
            text: 'Biểu đồ doanh thu hôm nay',
          },
        },
      },
    });
  }

  createChart(): void {
    this.chart2 = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.data.map(function (d) {
          return d.date;
        }),
        datasets: [
          {
            data: this.data.map(function (d) {
              return d.revenue;
            }),
            label: 'Doanh thu',
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Biểu đồ doanh thu theo ngày',
          },
        },
      },
    });
  }
}
