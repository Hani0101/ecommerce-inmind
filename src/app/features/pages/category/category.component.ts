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
  
 //default sorting options
 selectedSortBy: string = 'title';
 selectedOrder: string = 'asc';

 sortFields = [
   { label: 'Title', value: 'title' },
   { label: 'Price', value: 'price' },
   { label: 'Rating', value: 'rating' },
   { label: 'Stock', value: 'stock' }
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

  applySorting() {
    this.fetchProducts();
  }


}
