import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartService } from '../features/services/cart/cart.service';
import { 
  loadCart, loadCartSuccess, loadCartFailure, 
  addItemToCart, addItemToCartSuccess, addItemToCartFailure 
} from './cart.actions';
import { inject } from '@angular/core';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CartEffects {

  private actions$ = inject(Actions);
  private cartService = inject(CartService);

  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCart),
      mergeMap(action =>
        this.cartService.getCart(action.userId).pipe(
          map(cart => loadCartSuccess({ cart })),
          catchError(error => of(loadCartFailure({ error: error.message })))
        )
      )
    )
  );

  addItemToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addItemToCart),
      mergeMap(action =>
        this.cartService.addItemToCart(
          action.cartItem.userId, 
          action.cartItem.cartId, 
          action.cartItem.productId, 
          action.cartItem.quantity
        ).pipe(
          map(cart => addItemToCartSuccess({ cart })),
          catchError(error => of(addItemToCartFailure({ error: error.message })))
        )
      )
    )
  );
}
