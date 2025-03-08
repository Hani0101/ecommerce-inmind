import { Component } from '@angular/core';
import { Input, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { IProduct } from '../../../shared/models/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recommended-section',
  standalone: false,
  templateUrl: './recommended-section.component.html',
  styleUrl: './recommended-section.component.scss'
})
export class RecommendedSectionComponent implements OnInit {
  @Input() categoryName!: string; 
  products: IProduct[] = [];
  constructor(private TrendingProducts: ProductService) {}
  
  ngOnInit() {
    this.fetchRecommendedProducts(this.categoryName).subscribe({
      next: (data: { products: IProduct[] }) => {
        this.products = data.products;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }
  
  fetchRecommendedProducts(categoryName: string): Observable<{ products: IProduct[] }> {
    console.log("Fetching recommended products for category:", categoryName);
    return this.TrendingProducts.getRecommendedProducts(categoryName);
  }
}
