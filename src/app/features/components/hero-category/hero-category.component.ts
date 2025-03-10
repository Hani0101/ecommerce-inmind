import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { IProduct } from '../../../shared/models/product';  

@Component({
  selector: 'app-hero-category',
  standalone: false,
  templateUrl: './hero-category.component.html',
  styleUrls: ['./hero-category.component.scss']
})
export class HeroCategoryComponent implements OnInit {
  categoryName: string = '';  
  products: IProduct[] = [];  

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.categoryName = this.route.snapshot.params['name'];  
    this.fetchProducts();  
  }

  fetchProducts(): void {
    this.productService.getProductsByCategoryHero(this.categoryName)
      .subscribe({
        next: (data) => {
          this.products = data.products;  
        },
        error: (error) => {
          console.error('Error fetching products:', error);
        }
      });
  }

  handleImageError(event: any): void {
    event.target.src = 'https://images.unsplash.com/photo-1515940175183-6798529cb860';
  }

  addToCart(product: IProduct, event: Event): void {
    event.stopPropagation();
    console.log('Added to cart:', product);
  }

  addToWishlist(product: IProduct, event: Event): void {
    event.stopPropagation();
    console.log('Added to wishlist:', product);
  }

  openProductDetails(product: IProduct): void {
    console.log('Opening product details:', product);
  }
}
