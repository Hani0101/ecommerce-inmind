import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

interface IRow {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}

@Component({
  selector: 'app-products-grid',
  standalone: false,
  templateUrl: './products-grid.component.html',
  styleUrl: './products-grid.component.scss'
})
export class ProductsGridComponent {

  rowData: IRow[] = [
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ];

  colDefs: ColDef<IRow>[] = [
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" },
  ];
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  // productData = [
  //   { image: 'https://via.placeholder.com/50', title: 'Product 1', quantity: 10, price: 100 },
  //   { image: 'https://via.placeholder.com/50', title: 'Product 2', quantity: 5, price: 200 },
  //   { image: 'https://via.placeholder.com/50', title: 'Product 3', quantity: 20, price: 50 },
  // ];
}
