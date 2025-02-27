import { Component } from '@angular/core';
import { SaleProductService } from '../../services/sales-product/sale-product.service';

import { IProduct } from '../../../shared/models/product';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-trending-section',
  standalone: false,
  templateUrl: './trending-section.component.html',
  styleUrl: './trending-section.component.scss'
})
export class TrendingSectionComponent {
  products: IProduct[] = [];
  constructor(private TrendingProducts: SaleProductService) {}

  ngOnInit(){
    this.fetchProducts().subscribe({
      next: (data: IProduct[]) => {
        this.products = data;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }
  
  fetchProducts(): Observable<IProduct[]> {
    return this.TrendingProducts.getProducts();
  }
}
