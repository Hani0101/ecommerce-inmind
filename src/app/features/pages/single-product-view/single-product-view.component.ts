import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { IProduct } from '../../../shared/models/product';

@Component({
  selector: 'app-single-product-view',
  standalone: false,
  templateUrl: './single-product-view.component.html',
  styleUrl: './single-product-view.component.scss'
})
export class SingleProductViewComponent implements OnInit {
  @ViewChild('mainImage') mainImage!: ElementRef;

  product: IProduct | null = null;
  selectedImage: string = '';
  isInWishlist: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(productId)) {
      this.productService.getProductById(productId).subscribe({
        next: (data) => {
          this.product = data;
          this.selectedImage = data.thumbnail || data.images[0]; 
        },
        error: (err) => console.error('Error fetching product:', err)
      });
    }
  }

  selectImage(image: string) {
    this.selectedImage = image;
  }

  getDiscountedPrice(product: IProduct): number {
    return product.discountPercentage
      ? product.price * (1 - product.discountPercentage / 100)
      : product.price;
  }

  getStarsArray(rating: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i + 1);
  }

  addToCart() {
    console.log('Adding to cart:', this.product);
  }

  buyNow() {
    console.log('Buying now:', this.product);
  }

  toggleWishlist() {
    this.isInWishlist = !this.isInWishlist;
  }

  enableZoom(): void {
    if (this.mainImage) {
      this.mainImage.nativeElement.style.transform = "scale(1.5)";
      this.cdr.detectChanges(); 
    }
  }

  disableZoom(): void {
    if (this.mainImage) {
      this.mainImage.nativeElement.style.transform = "scale(1)";
      this.cdr.detectChanges(); 
    }
  }

  handleZoom(event: MouseEvent): void {
    if (this.mainImage) {
      const { left, top, width, height } = this.mainImage.nativeElement.getBoundingClientRect();
      const x = ((event.clientX - left) / width) * 100;
      const y = ((event.clientY - top) / height) * 100;
      this.mainImage.nativeElement.style.transformOrigin = `${x}% ${y}%`;
      this.cdr.detectChanges(); 
    }
  }
}
