import { Component } from '@angular/core';
import { ColDef, GridOptions, ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

interface IUserRow {
  name: string;
  email: string;
  age: number;
  country: string;
  profilePic: string;
  address: string;
}

@Component({
  selector: 'app-users-grid',
  standalone: false,
  templateUrl: './users-grid.component.html',
  styleUrl: './users-grid.component.scss'
})
export class UsersGridComponent {

  rowData: IUserRow[] = [
    { 
      name: "John Doe", 
      email: "john@example.com", 
      age: 25, 
      country: "USA", 
      profilePic: "https://picsum.photos/50?random=1",
      address: "123 Main St, Springfield, USA"
    },
    { 
      name: "Jane Smith", 
      email: "jane@example.com", 
      age: 30, 
      country: "USA", 
      profilePic: "https://picsum.photos/50?random=2",
      address: "456 Oak Ave, Riverside, USA"
    },
    { 
      name: "Carlos Rodríguez", 
      email: "carlos@example.com", 
      age: 40, 
      country: "Spain", 
      profilePic: "https://picsum.photos/50?random=3",
      address: "789 Calle Mayor, Madrid, Spain"
    },
    { 
      name: "Maria González", 
      email: "maria@example.com", 
      age: 22, 
      country: "Spain", 
      profilePic: "https://picsum.photos/50?random=4",
      address: "1011 Avenida de la Constitución, Barcelona, Spain"
    },
    { 
      name: "Liam Brown", 
      email: "liam@example.com", 
      age: 28, 
      country: "UK", 
      profilePic: "https://picsum.photos/50?random=5",
      address: "12 Baker Street, London, UK"
    },
    { 
      name: "Emma Wilson", 
      email: "emma@example.com", 
      age: 35, 
      country: "UK", 
      profilePic: "https://picsum.photos/50?random=6",
      address: "34 Kings Road, Manchester, UK"
    },
    { 
      name: "Akira Tanaka", 
      email: "akira@example.com", 
      age: 29, 
      country: "Japan", 
      profilePic: "https://picsum.photos/50?random=7",
      address: "56 Shibuya, Tokyo, Japan"
    },
    { 
      name: "Hiroshi Sato", 
      email: "hiroshi@example.com", 
      age: 33, 
      country: "Japan", 
      profilePic: "https://picsum.photos/50?random=8",
      address: "78 Kyoto St, Osaka, Japan"
    },
    { 
      name: "Akira Tanaka", 
      email: "akira@example.com", 
      age: 29, 
      country: "Japan", 
      profilePic: "https://picsum.photos/50?random=7",
      address: "56 Shibuya, Tokyo, Japan"
    },
    { 
      name: "Hiroshi Sato", 
      email: "hiroshi@example.com", 
      age: 33, 
      country: "Japan", 
      profilePic: "https://picsum.photos/50?random=8",
      address: "78 Kyoto St, Osaka, Japan"
    },
    { 
      name: "Akira Tanaka", 
      email: "akira@example.com", 
      age: 29, 
      country: "Japan", 
      profilePic: "https://picsum.photos/50?random=7",
      address: "56 Shibuya, Tokyo, Japan"
    },
    { 
      name: "Hiroshi Sato", 
      email: "hiroshi@example.com", 
      age: 33, 
      country: "Japan", 
      profilePic: "https://picsum.photos/50?random=8",
      address: "78 Kyoto St, Osaka, Japan"
    },
    { 
      name: "Akira Tanaka", 
      email: "akira@example.com", 
      age: 29, 
      country: "Japan", 
      profilePic: "https://picsum.photos/50?random=7",
      address: "56 Shibuya, Tokyo, Japan"
    },
    { 
      name: "Hiroshi Sato", 
      email: "hiroshi@example.com", 
      age: 33, 
      country: "Japan", 
      profilePic: "https://picsum.photos/50?random=8",
      address: "78 Kyoto St, Osaka, Japan"
    },
    { 
      name: "Akira Tanaka", 
      email: "akira@example.com", 
      age: 29, 
      country: "Japan", 
      profilePic: "https://picsum.photos/50?random=7",
      address: "56 Shibuya, Tokyo, Japan"
    },
    { 
      name: "Hiroshi Sato", 
      email: "hiroshi@example.com", 
      age: 33, 
      country: "Japan", 
      profilePic: "https://picsum.photos/50?random=8",
      address: "78 Kyoto St, Osaka, Japan"
    },
  ];
  
  colDefs: ColDef<IUserRow>[] = [
    {
      headerCheckboxSelection: true, 
      checkboxSelection: true,       
      filter: false,
      sortable: false,
      width: 50
    },
    {
      field: "profilePic",
      headerName: "Profile",
      cellRenderer: (params: any) => `<img src="${params.value}" width="50" height="50" style="border-radius:50%"/>`,
      filter: false,
      sortable: false
    },
    { field: "name", headerName: "Name", editable: true },
    { field: "email", headerName: "Email", editable: true },
    { field: "age", headerName: "Age", editable: true, filter: "agNumberColumnFilter" },
    { field: "country", headerName: "Country", editable: true },
    {field: "address", headerName: "Address", editable: true}
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };

  gridOptions: GridOptions = {
    rowSelection: 'multiple', 
    onSelectionChanged: event => this.onSelectionChanged(event) 
  };

  onSelectionChanged(event: any) {
    const selectedRows = event.api.getSelectedRows();
    console.log("Selected Rows:", selectedRows);
  }
}
