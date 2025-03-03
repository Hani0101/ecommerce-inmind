import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, forkJoin, of } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';
import { ProductService } from '../../services/product/product.service';
import { CartService } from '../../services/cart/cart.service';
import { ICart } from '../../../shared/models/cart.model';
import { IProduct } from '../../../shared/models/product';
import { AuthenticationService } from '../../../core/services/authentication/authentication-service/authentication.service';
import { ICartItem } from '../../../shared/models/cart-item.model';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  standalone: false,
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart$!: Observable<ICart | null>;
  cartProducts$!: Observable<{ product: IProduct; quantity: number }[]>;

  constructor(
    private store: Store,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUserData();   

    this.cartProducts$ = this.cartService.getCart(Number(user!.id)).pipe(
      tap(cart => console.log('Cart from API:', cart)), 
      switchMap((cart: ICart | null) => {
        if (!cart || !cart.items?.$values || cart.items.$values.length === 0) {
          console.log("Cart is empty!");
          return of([]); 
        }

        return forkJoin(cart.items.$values.map((cartItem: ICartItem) => 
          this.productService.getProductById(cartItem.productId).pipe(
            map(product => ({
              product,  
              quantity: cartItem.quantity
            }))
          )
        ));
      }),
      tap(products => console.log('Final Cart Products:', products)) 
    );
  }
}
