import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { IProduct } from '../../../shared/models/product';
import { Store } from '@ngrx/store';
import { addItemToCart } from '../../../state/cart.actions';
import { inject } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication/authentication-service/authentication.service';
import { Router } from '@angular/router';
import { ICartItem } from '../../../shared/models/cart-item.model';


@Component({
  selector: 'app-single-product-view',
  standalone: false,
  templateUrl: './single-product-view.component.html',
  styleUrl: './single-product-view.component.scss'
})
export class SingleProductViewComponent implements OnInit {
  @ViewChild('mainImage') mainImage!: ElementRef;

  product!: IProduct;
  selectedImage: string = '';
  isInWishlist: boolean = false;
  showPopup = false;
  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService,
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

  private readonly store$ = inject(Store);
  private readonly authService = inject(AuthenticationService);

  addToCart(product: IProduct) {
    if(this.product){
      const userId = this.authService.decodeJwtToken(this.authService.getAccessToken());

      const cartItem: ICartItem = {
        id: 0, //Default values
        userId: Number(userId),
        cartId: 0, //Default values
        productId: product.id,
        quantity: 1 //Default values
      };

      this.store$.dispatch(addItemToCart({ cartItem }));

      this.showPopup = true;

      setTimeout(() => {
        this.showPopup = false;
      }, 1500);
    }
  }


  toggleWishlist() {
    this.isInWishlist = !this.isInWishlist;
  }

  enableZoom(): void {
    if (this.mainImage) {
      this.mainImage.nativeElement.style.transform = "scale(1.5)";
    }
  }

  disableZoom(): void {
    if (this.mainImage) {
      this.mainImage.nativeElement.style.transform = "scale(1)";
    }
  }

  handleZoom(event: MouseEvent): void {
    if (this.mainImage) {
      const { left, top, width, height } = this.mainImage.nativeElement.getBoundingClientRect();
      const x = ((event.clientX - left) / width) * 100;
      const y = ((event.clientY - top) / height) * 100;
      this.mainImage.nativeElement.style.transformOrigin = `${x}% ${y}%`;
    }
  }
}
