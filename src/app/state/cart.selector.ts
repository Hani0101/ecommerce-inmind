import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartProducts = createSelector(
  selectCartState,
  state => state.cart?.cartItems ?? []
);
