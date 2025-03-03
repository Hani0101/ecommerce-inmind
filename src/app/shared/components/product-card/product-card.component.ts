import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../models/product';
import { Store } from '@ngrx/store';
import { addItemToCart } from '../../../state/cart.actions';
import { inject } from '@angular/core';
import { ICartItem } from '../../models/cart-item.model';
import { AuthenticationService } from '../../../core/services/authentication/authentication-service/authentication.service'; 
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

  addToCart(product: IProduct) {
    const user = this.authService.getUserData();
  
    if (!user) {
      console.error("User not found! Please log in.");
      return;
    }
  
    const cartItem: ICartItem = {
      id: 0, //Default values
      userId: Number(user.id), 
      cartId: 8, //Default values
      productId: product.id,
      quantity: 1 //Default values
    };
  
    console.log("Adding to cart:", cartItem);
    this.store$.dispatch(addItemToCart({ cartItem }));
  }
  
}