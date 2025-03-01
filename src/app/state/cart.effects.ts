import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CartService } from '../features/services/cart/cart.service';
import { loadCart, loadCartSuccess, loadCartFailure } from './cart.actions';

@Injectable()
export class CartEffects {

  private actions$ = inject(Actions);
  private cartService = inject(CartService);

  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCart),
      mergeMap(() =>
        this.cartService.getCart().pipe(
          map(products => loadCartSuccess({ products })),
          catchError(error => of(loadCartFailure({ error })))
        )
      )
    )
  );
}