import { Component } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

interface IProductRow {
  name: string;
  category: string;
  price: number;
  stock: number;
  brand: string;
  imageUrl: string;
}

@Component({
  selector: 'app-products-grid',
  standalone: false,
  templateUrl: './products-grid.component.html',
  styleUrl: './products-grid.component.scss'
})
export class ProductsGridComponent {

  rowData: IProductRow[] = [
    { name: "Wireless Headphones", category: "Electronics", price: 120, stock: 35, brand: "Sony", imageUrl: "https://picsum.photos/50?random=1" },
    { name: "Gaming Laptop", category: "Computers", price: 1500, stock: 10, brand: "Dell", imageUrl: "https://picsum.photos/50?random=2" },
    { name: "Smartphone", category: "Mobile", price: 899, stock: 20, brand: "Samsung", imageUrl: "https://picsum.photos/50?random=3" },
    { name: "Running Shoes", category: "Footwear", price: 80, stock: 50, brand: "Nike", imageUrl: "https://picsum.photos/50?random=4" },
    { name: "Bluetooth Speaker", category: "Electronics", price: 60, stock: 25, brand: "JBL", imageUrl: "https://picsum.photos/50?random=5" },
    { name: "LED Monitor", category: "Computers", price: 200, stock: 15, brand: "LG", imageUrl: "https://picsum.photos/50?random=6" },
    { name: "Office Chair", category: "Furniture", price: 250, stock: 12, brand: "Herman Miller", imageUrl: "https://picsum.photos/50?random=7" },
    { name: "Action Camera", category: "Cameras", price: 300, stock: 8, brand: "GoPro", imageUrl: "https://picsum.photos/50?random=8" },
    { name: "Electric Toothbrush", category: "Personal Care", price: 50, stock: 4, brand: "Philips", imageUrl: "https://picsum.photos/50?random=9" }, // Low stock
    { name: "Smartwatch", category: "Wearable", price: 199, stock: 2, brand: "Apple", imageUrl: "https://picsum.photos/50?random=10" } // Low stock
  ];

  colDefs: ColDef<IProductRow>[] = [
    { 
      field: "imageUrl", 
      headerName: "Image", 
      cellRenderer: (params: any) => `<img src="${params.value}" width="50" height="50" style="border-radius:5px"/>`,
      filter: false,
      sortable: false
    },
    { field: "name", headerName: "Product Name", editable: true },
    { field: "category", headerName: "Category", editable: true },
    { 
      field: "price", 
      headerName: "Price ($)", 
      editable: true,
      filter: "agNumberColumnFilter",
      valueFormatter: params => `$${params.value.toFixed(2)}` 
    },
    { 
      field: "stock", 
      headerName: "Stock", 
      editable: true, 
      filter: "agNumberColumnFilter",
      cellStyle: params => {
        if (params.value < 5) {
          return { color: 'red', fontWeight: 'bold' };  
        } else if (params.value >= 5 && params.value <= 30) {
          return { color: 'orange', fontWeight: 'bold' };
        } else {
          return { color: 'green', fontWeight: 'bold' };  
        }
      }      
    },
    { field: "brand", headerName: "Brand", editable: true }
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

    // Check if the edited field is "stock" and if it's below 5
    if (event.colDef.field === "stock" && event.value < 5) {
      alert(`⚠️ Low stock alert! Product "${event.data.name}" has only ${event.value} left in stock.`);
    }
  }
}
