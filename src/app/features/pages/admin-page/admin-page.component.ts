import { Component, OnInit, ViewChild } from "@angular/core";
import { AgCharts } from "ag-charts-community";
import { dailyVisitorsChartConfig, dailySalesChartConfig, monthlyVisitorsChartConfig, monthlySalesChartConfig } from "./chart-config";

@Component({
  selector: 'app-admin-page',
  standalone: false,
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})


export class AdminPageComponent implements OnInit {
  showDashboard = true;
  showProducts = false;
  showUsers = false;
  showOrders = false;

  toggleView(view: string) {
    this.showDashboard = view === 'dashboard';
    this.showProducts = view === 'products';
    this.showUsers = view === 'users';
    this.showOrders = view === 'orders';
  }


  constructor() {}

  //DUMMY DATA
  userName = "John Doe";
  userAvatar = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32";
  notificationCount = 3;
  totalRevenue = 124500;
  revenueGrowth = 12.5;
  topSellingProducts = 120;
  totalCustomers = 1500;
  orderCount = 1234;
  pendingOrders = 23;
  selectedTimeRange = "monthly";

  notifications = [
    { type: "warn", icon: "warning", message: "Low stock alert for Product X", time: new Date() },
    { type: "primary", icon: "shopping_cart", message: "New order received", time: new Date() },
    { type: "accent", icon: "person", message: "New user registration", time: new Date() }
  ];

  topProducts = [
    { name: "Premium Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=50", revenue: 12500, sales: 125 },
    { name: "Wireless Speaker", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=50", revenue: 10800, sales: 98 },
    { name: "Smart Watch", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=50", revenue: 9500, sales: 87},
  ];

  ngOnInit(): void {
    this.createCharts();
  }

  createCharts(): void {
    this.createChart("dailyVisitorsChart", dailyVisitorsChartConfig);
    this.createChart("dailySalesChart", dailySalesChartConfig);
    this.createChart("monthlyVisitorsChart", monthlyVisitorsChartConfig);
    this.createChart("monthlySalesChart", monthlySalesChartConfig);
  }

  createChart(containerId: string, chartConfig: any): void {
    const chartContainer = document.getElementById(containerId);

    if (chartContainer) {
      AgCharts.create({
        container: chartContainer,
        ...chartConfig
      });
    }
  }

  logout(): void {
    console.log("Logging out...");
  }

}