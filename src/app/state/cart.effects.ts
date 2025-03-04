import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartService } from '../features/services/cart/cart.service';
import * as CartActions from '../state/cart.actions';
import { inject } from '@angular/core';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CartEffects {
  private actions$ = inject(Actions);
  private cartService = inject(CartService);

  //Load Cart
  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadCart),
      mergeMap(action =>
        this.cartService.getCart(action.userId).pipe(
          map(cart => CartActions.loadCartSuccess({ cart })),
          catchError(error => of(CartActions.loadCartFailure({ error: error.message })))
        )
      )
    )
  );

  //Add Item to Cart
  addItemToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addItemToCart),
      mergeMap(action =>
        this.cartService.addItemToCart(
          action.cartItem.userId,
          action.cartItem.cartId,
          action.cartItem.productId,
          action.cartItem.quantity
        ).pipe(
          map(cart => CartActions.addItemToCartSuccess({ cart })),
          catchError(error => of(CartActions.addItemToCartFailure({ error: error.message })))
        )
      )
    )
  );

  //Get Total Price
  getTotalprice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.getTotalprice),
      mergeMap(action =>
        this.cartService.getTotalPrice(action.userId).pipe(
          map(totalPrice => CartActions.getTotalpriceSuccess({ totalPrice })),
          catchError(error => of(CartActions.getTotalpriceFailure({ error: error.message })))
        )
      )
    )
  );

  incrementItemQuantity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.incrementItemQuantity),
      mergeMap(({ userId, productId }) =>
        this.cartService.incrementItem(userId, productId).pipe(
          map((cart) => CartActions.incrementItemQuantitySuccess({ cart })), 
          catchError((error) =>
            of(CartActions.incrementItemQuantityFailure({ error: error.message }))
          )
        )
      )
    )
  );
  

  decrementItemQuantity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.decrementItemQuantity),
      mergeMap(({ userId, productId }) =>
        this.cartService.decrementItem(userId, productId).pipe(
          map((cart) => CartActions.decrementItemQuantitySuccess({ cart })), 
          catchError((error) =>
            of(CartActions.decrementItemQuantityFailure({ error: error.message }))
          )
        )
      )
    )
  );

  removeItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.removeItemFromCart),
      mergeMap(({ userId, productId }) =>
        this.cartService.removeItemFromCart(userId, productId).pipe(
          map(() => CartActions.loadCart({ userId: userId })), 
          catchError(() => of({ type: '[Cart] Remove Item Failed' }))
        )
      )
    )
  );
  
}
