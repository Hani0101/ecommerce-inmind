import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';
import { ICart } from '../shared/models/cart.model';
import { ICartItem } from '../shared/models/cart-item.model';
export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCart = createSelector(
  selectCartState,
  (state: CartState) => state.cart
);

export const selectCartItems = createSelector(
  selectCart,
  (cart: ICart | null) => {
    if (!cart || !cart.items) return [];
    return cart.items.$values.map((item: ICartItem) => ({
      productId: item.productId, 
      quantity: item.quantity
    }));
  }
);

export const selectTotalPrice = createSelector(
  selectCartState,
  (state: CartState) => state.totalPrice
);

export const selectCartLoading = createSelector(
  selectCartState,
  (state: CartState) => state.loading
);

export const selectCartError = createSelector(
  selectCartState,
  (state: CartState) => state.error
);
