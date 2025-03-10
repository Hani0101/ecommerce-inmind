import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product/product.service'; 
import { IProduct } from '../../../shared/models/product'; 

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  standalone: false,
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryName: string = '';
  products: IProduct[] = [];

  selectedSortBy: string = 'price-asc'; 
  selectedOrder: string = 'asc';         

  sortFields = [
    { label: 'Lowest Price', value: 'price-asc' },
    { label: 'Highest Price', value: 'price-desc' },
    { label: 'Highest Reviews', value: 'rating-desc' },
    { label: 'Lowest Stock', value: 'stock-asc' },
    { label: 'Highest Stock', value: 'stock-desc' }
  ];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService 
  ) {}

  ngOnInit(): void {
    this.categoryName = this.route.snapshot.params['name'];
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProductsByCategory(this.categoryName, this.selectedSortBy, this.selectedOrder)
      .subscribe({
        next: (data) => {
          this.products = data.products;
        },
        error: (error) => {
          console.error('Error fetching products:', error);
        }
      });
  }

  applySorting(): void {
    const [sortBy, order] = this.selectedSortBy.split('-');

    this.selectedSortBy = sortBy;
    this.selectedOrder = order || 'asc';  
    this.fetchProducts();
  }
}
