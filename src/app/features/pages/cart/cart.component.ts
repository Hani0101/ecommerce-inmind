import { Component, OnInit, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, forkJoin, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ProductService } from '../../services/product/product.service';
import { AuthenticationService } from '../../../core/services/authentication/authentication-service/authentication.service';
import { IProduct } from '../../../shared/models/product'; 
import { loadCart, incrementItemQuantity, decrementItemQuantity, removeItemFromCart } from '../../../state/cart.actions';
import { selectCartItems, selectTotalPrice } from '../../../state/cart.selector';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  standalone: false,
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems$!: Observable<{ product: IProduct; quantity: number }[]>; 
  totalPrice$!: Observable<number>;
 
  taxRate: number = 10;
  shipping: number = 5.99;
  subtotal: number = 0;
  tax: number = 0;
  total: number = 0;

  constructor(
    private store: Store,
    private productService: ProductService,
    private authService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.loadCartData();
  }

  private loadCartData(): void {
    const user = this.authService.getUserData();
    if (!user) {
      console.error("User not found! Please log in.");
      return;
    }
    const userId = Number(user.id);
    this.store.dispatch(loadCart({ userId }));
    this.totalPrice$ = this.store.select(selectTotalPrice);
    this.cartItems$ = this.store.select(selectCartItems).pipe(
      mergeMap(cartItems =>
        forkJoin(cartItems.map(cartItem =>
          this.productService.getProductById(cartItem.productId).pipe(
            map(product => ({ product, quantity: cartItem.quantity }))
          )
        ))
      )
    );
    this.totalPrice$.subscribe(totalPrice => {
      this.total = totalPrice + this.tax + this.shipping;
    });
  }

  incrementQuantity(productId: number): void {
    const user = this.authService.getUserData();
    if (!user) return;
    this.store.dispatch(incrementItemQuantity({ userId: Number(user.id), productId }));
    this.loadCartData(); 
  }

  decrementQuantity(productId: number): void {
    const user = this.authService.getUserData();
    if (!user) return;

    this.store.dispatch(decrementItemQuantity({ userId: Number(user.id), productId }));
    this.loadCartData(); 
  }

  removeItem(productId: number): void {
    const user = this.authService.getUserData();
    if (!user) return;
    const userId = Number(user.id);
    this.store.dispatch(removeItemFromCart({ userId, productId }));
    this.loadCartData();
  }

  calculateTotals(cartItems: { product: IProduct; quantity: number }[]): void {
    this.subtotal = cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
    this.tax = this.subtotal * (this.taxRate / 100);
    this.total = this.subtotal + this.tax + this.shipping;
  }
}
