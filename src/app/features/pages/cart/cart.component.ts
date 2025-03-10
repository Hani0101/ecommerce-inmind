import { Component, OnInit, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ProductService } from '../../services/product/product.service';
import { AuthenticationService } from '../../../core/services/authentication/authentication-service/authentication.service';
import { IProduct } from '../../../shared/models/product'; 
import { loadCart, incrementItemQuantity, decrementItemQuantity, removeItemFromCart } from '../../../state/cart.actions';
import { selectCartItems, selectTotalPrice } from '../../../state/cart.selector';
import { getTotalprice } from '../../../state/cart.actions';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  standalone: false,
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems$!: Observable<{ product: IProduct; quantity: number }[]>; 
  totalPrice$!: Observable<number>;
 
  shipping: number = 5.99;
  subtotal: number = 0;
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
    this.getPrice();
    const user = this.authService.getUserData();
    
    if (!user) {
      return;
    }
    const userId = Number(user.id);
    this.store.dispatch(loadCart({ userId }));
    this.cartItems$ = this.store.select(selectCartItems).pipe(
      mergeMap(cartItems =>
        forkJoin(cartItems.map(cartItem =>
          this.productService.getProductById(cartItem.productId).pipe(
            map(product => ({ product, quantity: cartItem.quantity }))
          )
        ))
      )
    );
  }

  getPrice(){
    this.totalPrice$ = this.store.select(selectTotalPrice);
    const user = this.authService.getUserData();
    const userId = Number(user!.id);
    this.store.dispatch(getTotalprice({  userId: userId }));
    this.totalPrice$.subscribe(totalPrice => {
      this.subtotal = totalPrice;
      this.total = totalPrice + this.shipping;
    });    
  }


  incrementQuantity(productId: number): void {
    const user = this.authService.getUserData();
    if (!user) return;
    this.store.dispatch(incrementItemQuantity({ userId: Number(user.id), productId }));
    this.getPrice();
  }

  decrementQuantity(productId: number): void {
    const user = this.authService.getUserData();
    if (!user) return;
    this.store.dispatch(decrementItemQuantity({ userId: Number(user.id), productId }));
    this.getPrice();
  }

  removeItem(productId: number): void {
    const user = this.authService.getUserData();
    if (!user) return;
    const userId = Number(user.id);
    this.store.dispatch(removeItemFromCart({ userId, productId }));
    this.getPrice();
  }

  getProductImage(product: any): string {
    return product.thumbnail || (product.images && product.images.length > 0 ? product.images[0] : '');
  }
  
  trackByProductId(index: number, item: { product: IProduct; quantity: number }): number {
    return item.product.id;
  }
}
