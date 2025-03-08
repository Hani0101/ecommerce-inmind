import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../models/product';
import { Store } from '@ngrx/store';
import { addItemToCart } from '../../../state/cart.actions';
import { inject } from '@angular/core';
import { ICartItem } from '../../models/cart-item.model';
import { AuthenticationService } from '../../../core/services/authentication/authentication-service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  standalone: false,
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Output() add = new EventEmitter<number>();
  @Input() product: IProduct = {} as IProduct;

  private store$ = inject(Store);
  private authService = inject(AuthenticationService);
  private router = inject(Router); 

  addToCart(product: IProduct) {
    const user = this.authService.getUserData();
  
    if (!user) {
      console.error("User not found! Please log in.");
      return;
    }
  
    const cartItem: ICartItem = {
      id: 0, //Default values
      userId: Number(user.id), 
      cartId: 0, //Default values
      productId: product.id,
      quantity: 1 //Default values
    };
  
    this.store$.dispatch(addItemToCart({ cartItem }));
  }
  
  getProductImage(): string {
    return this.product.thumbnail || (this.product.images?.length ? this.product.images[0] : '');
  }

  getDiscountedPrice(): number {
    if (this.product.discountPercentage) {
      return this.product.price * (1 - this.product.discountPercentage / 100);
    }
    return this.product.price;
  }

  viewProductDetails() {
    this.router.navigate(['/product', this.product.id]);
  }
}