export const dailyVisitorsChartConfig = {
    title: { text: "Daily Visitors" },
    background: { fill: "rgba(0, 0, 0, 0.0)" },
    data: [
      { time: new Date(2024, 2, 10, 0), visitors: 120 },
      { time: new Date(2024, 2, 10, 1), visitors: 150 },
      { time: new Date(2024, 2, 10, 2), visitors: 90 },
      { time: new Date(2024, 2, 10, 3), visitors: 80 },
      { time: new Date(2024, 2, 10, 4), visitors: 70 },
      { time: new Date(2024, 2, 10, 5), visitors: 100 },
      { time: new Date(2024, 2, 10, 6), visitors: 140 },
      { time: new Date(2024, 2, 10, 7), visitors: 200 },
      { time: new Date(2024, 2, 10, 8), visitors: 300 },
      { time: new Date(2024, 2, 10, 9), visitors: 400 },
      { time: new Date(2024, 2, 10, 10), visitors: 500 },
      { time: new Date(2024, 2, 10, 11), visitors: 450 },
      { time: new Date(2024, 2, 10, 12), visitors: 420 },
      { time: new Date(2024, 2, 10, 13), visitors: 390 },
      { time: new Date(2024, 2, 10, 14), visitors: 410 },
      { time: new Date(2024, 2, 10, 15), visitors: 380 },
      { time: new Date(2024, 2, 10, 16), visitors: 500 },
      { time: new Date(2024, 2, 10, 17), visitors: 600 },
      { time: new Date(2024, 2, 10, 18), visitors: 700 },
      { time: new Date(2024, 2, 10, 19), visitors: 750 },
      { time: new Date(2024, 2, 10, 20), visitors: 800 },
      { time: new Date(2024, 2, 10, 21), visitors: 650 },
      { time: new Date(2024, 2, 10, 22), visitors: 500 },
      { time: new Date(2024, 2, 10, 23), visitors: 300 },
    ],
    series: [{
      type: "line",
      xKey: "time",
      yKey: "visitors",
      yName: "Visitors",
      color: 'white',
      stroke: "#F0BB78",
      marker: { fill: "#F0BB78", stroke: "darkred" }
    }],
    axes: [
      { position: "bottom", type: "time", title: { text: "Time (Hourly)" }, label: { format: "%H:%M" } },
      { position: "left", type: "number", title: { text: "Visitors Count" } }
    ]
  };
  
  export const dailySalesChartConfig = {
    title: { text: "Hourly Sales" },
    background: { fill: "rgba(0, 0, 0, 0.0)" },
    data: [
      { time: new Date(2024, 2, 10, 0), sales: 30 },
      { time: new Date(2024, 2, 10, 1), sales: 40 },
      { time: new Date(2024, 2, 10, 2), sales: 20 },
      { time: new Date(2024, 2, 10, 3), sales: 10 },
      { time: new Date(2024, 2, 10, 4), sales: 15 },
      { time: new Date(2024, 2, 10, 5), sales: 25 },
      { time: new Date(2024, 2, 10, 6), sales: 35 },
      { time: new Date(2024, 2, 10, 7), sales: 50 },
      { time: new Date(2024, 2, 10, 8), sales: 70 },
      { time: new Date(2024, 2, 10, 9), sales: 100 },
      { time: new Date(2024, 2, 10, 10), sales: 120 },
      { time: new Date(2024, 2, 10, 11), sales: 130 },
      { time: new Date(2024, 2, 10, 12), sales: 140 },
      { time: new Date(2024, 2, 10, 13), sales: 110 },
      { time: new Date(2024, 2, 10, 14), sales: 115 },
      { time: new Date(2024, 2, 10, 15), sales: 100 },
      { time: new Date(2024, 2, 10, 16), sales: 150 },
      { time: new Date(2024, 2, 10, 17), sales: 180 },
      { time: new Date(2024, 2, 10, 18), sales: 200 },
      { time: new Date(2024, 2, 10, 19), sales: 220 },
      { time: new Date(2024, 2, 10, 20), sales: 250 },
      { time: new Date(2024, 2, 10, 21), sales: 190 },
      { time: new Date(2024, 2, 10, 22), sales: 150 },
      { time: new Date(2024, 2, 10, 23), sales: 100 },
    ],
    series: [{
      type: "line",
      xKey: "time",
      yKey: "sales",
      yName: "Sales",
      stroke: "#F0BB78",
      marker: { fill: "#F0BB78", stroke: "darkred" }
    }],
    axes: [
      { position: "bottom", type: "time", title: { text: "Time (Hourly)" }, label: { format: "%H:%M" } },
      { position: "left", type: "number", title: { text: "Sales Count" } }
    ]
  };
  
  export const monthlyVisitorsChartConfig = {
    title: { text: "Monthly Visitors" },
    background: { fill: "rgba(0, 0, 0, 0.0)" },
    data: [
      { month: 'Jan', visitors: 1200 },
            { month: 'Feb', visitors: 1500 },
            { month: 'Mar', visitors: 1800 },
            { month: 'Apr', visitors: 1600 },
            { month: 'May', visitors: 2000 },
            { month: 'Jun', visitors: 2500 },
            { month: 'Jul', visitors: 2200 },
            { month: 'Aug', visitors: 2300 },
            { month: 'Sep', visitors: 2100 },
            { month: 'Oct', visitors: 2700 },
            { month: 'Nov', visitors: 2800 },
            { month: 'Dec', visitors: 3000 },
        ],
    series: [{
      type: 'bar',
      xKey: 'month',
      yKey: 'visitors',
      yName: 'Visitors',
      fill: '#3498db'
    }],
    axes: [
      { position: 'bottom', type: 'category', title: { text: 'Month' } },
      { position: 'left', type: 'number', title: { text: 'Visitors' } }
    ]
  };
  
  export const monthlySalesChartConfig = {
    title: { text: "Monthly Sales" },
    background: { fill: "rgba(0, 0, 0, 0.0)" },
    data: [
      { month: 'Jan', sales: 8000 },
      { month: 'Feb', sales: 12000 },
      { month: 'Mar', sales: 15000 },
      { month: 'Apr', sales: 13000 },
      { month: 'May', sales: 18000 },
      { month: 'Jun', sales: 20000 },
      { month: 'Jul', sales: 22000 },
      { month: 'Aug', sales: 24000 },
      { month: 'Sep', sales: 21000 },
      { month: 'Oct', sales: 27000 },
      { month: 'Nov', sales: 30000 },
      { month: 'Dec', sales: 35000 },
    ],
    series: [{
      type: 'bar',
      xKey: 'month',
      yKey: 'sales',
      yName: 'Sales',
      fill: '#e74c3c'
    }],
    axes: [
      { position: 'bottom', type: 'category', title: { text: 'Month' } },
      { position: 'left', type: 'number', title: { text: 'Sales ($)' } }
    ]
  };
  