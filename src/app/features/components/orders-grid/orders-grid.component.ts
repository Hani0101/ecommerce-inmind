import { Component } from '@angular/core'; 
import { ColDef, GridOptions } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

interface IOrderRow {
  orderId: string;
  customerName: string;
  orderDate: string;
  totalAmount: number;
  status: string;
  shippingAddress: string;
}

@Component({
  selector: 'app-orders-grid',
  standalone: false,
  templateUrl: './orders-grid.component.html',
  styleUrls: ['./orders-grid.component.scss']
})
export class OrdersGridComponent {

  rowData: IOrderRow[] = [
    { orderId: "ORD001", customerName: "John Doe", orderDate: "2025-03-01", totalAmount: 320, status: "Shipped", shippingAddress: "123 Main St, New York, USA" },
    { orderId: "ORD002", customerName: "Jane Smith", orderDate: "2025-03-02", totalAmount: 1500, status: "Processing", shippingAddress: "456 Elm St, Los Angeles, USA" },
    { orderId: "ORD003", customerName: "Carlos Rodríguez", orderDate: "2025-03-03", totalAmount: 250, status: "Delivered", shippingAddress: "789 Oak St, Madrid, Spain" },
    { orderId: "ORD004", customerName: "Maria González", orderDate: "2025-03-04", totalAmount: 450, status: "Shipped", shippingAddress: "101 Pine St, Barcelona, Spain" },
    { orderId: "ORD005", customerName: "Liam Brown", orderDate: "2025-03-05", totalAmount: 800, status: "Processing", shippingAddress: "202 Maple St, London, UK" },
    { orderId: "ORD006", customerName: "Emma Wilson", orderDate: "2025-03-06", totalAmount: 350, status: "Shipped", shippingAddress: "303 Cedar St, Manchester, UK" },
    { orderId: "ORD007", customerName: "Akira Tanaka", orderDate: "2025-03-07", totalAmount: 500, status: "Delivered", shippingAddress: "404 Birch St, Tokyo, Japan" },
    { orderId: "ORD008", customerName: "Hiroshi Sato", orderDate: "2025-03-08", totalAmount: 1200, status: "Processing", shippingAddress: "505 Cherry St, Osaka, Japan" }
  ];

  colDefs: ColDef<IOrderRow>[] = [
    { field: "orderId", headerName: "Order ID", editable: true },
    { field: "customerName", headerName: "Customer Name", editable: true },
    { field: "orderDate", headerName: "Order Date", editable: true, filter: "agDateColumnFilter", valueFormatter: params => new Date(params.value).toLocaleDateString() },
    { 
      field: "totalAmount", 
      headerName: "Total Amount ($)", 
      editable: true,
      filter: "agNumberColumnFilter",
      valueFormatter: params => `$${params.value.toFixed(2)}`
    },
    { 
      field: "status", 
      headerName: "Status", 
      editable: true,
      cellEditor: 'agSelectCellEditor', 
      cellEditorParams: { values: ['Processing', 'Shipped', 'Delivered', 'Cancelled'] },
      cellStyle: (params: any) => {
        if (params.value === 'Shipped') {
          return { color: '#28a745' }; 
        } else if (params.value === 'Delivered') {
          return {  color: '#007bff' }; 
        } else if (params.value === 'Processing') {
          return { color: '#ffc107' }; 
        }
        return null;
      }
    },
    { field: "shippingAddress", headerName: "Shipping Address", editable: true }
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  gridOptions: GridOptions = {
    onCellEditingStopped: event => this.onCellEdit(event)
  };

  onCellEdit(event: any) {
    console.log("Cell Edited:", event.colDef.field, "New Value:", event.value);

    // Check if the edited field is "status" and if it's "Shipped" or "Delivered"
    if (event.colDef.field === "status" && (event.value === "Shipped" || event.value === "Delivered")) {
      alert(`Order ${event.data.orderId} has been marked as ${event.value}.`);
    }
  }
}
