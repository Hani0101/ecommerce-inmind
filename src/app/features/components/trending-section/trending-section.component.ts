import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';

import { IProduct } from '../../../shared/models/product';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-trending-section',
  standalone: false,
  templateUrl: './trending-section.component.html',
  styleUrl: './trending-section.component.scss'
})
export class TrendingSectionComponent implements OnInit {
  products: IProduct[] = [];
  constructor(private TrendingProducts: ProductService, private cdr: ChangeDetectorRef) {}
  
  ngOnInit() {
    this.fetchProducts().subscribe({
      next: (data: { products: IProduct[] }) => {
        this.products = data.products;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }
  
  fetchProducts(): Observable<{ products: IProduct[] }> {
    return this.TrendingProducts.getGeneralProducts();
  }
}
