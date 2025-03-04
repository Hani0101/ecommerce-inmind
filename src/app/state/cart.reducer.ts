import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { ICart } from '../shared/models/cart.model';

export interface CartState {
  cart: ICart | null;
  totalPrice: number;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  totalPrice: 0,
  loading: false,
  error: null
};
export const cartReducer = createReducer(
  initialState,

  on(CartActions.loadCartSuccess, (state, { cart }) => ({
    ...state,
    cart: {
      ...cart,
      items: cart.items ?? { $values: [] } 
    },
    loading: false,
    error: null
  })),

  on(CartActions.addItemToCartSuccess, (state, { cart }) => ({
    ...state,
    cart: {
      ...cart,
      items: cart.items ?? { $values: [] } 
    }
  })),

  on(CartActions.incrementItemQuantitySuccess, (state, { cart }) => ({
    ...state,
    cart: {
      ...cart,
      items: cart.items ?? { $values: [] }
    },
    loading: false
  })),

  on(CartActions.decrementItemQuantitySuccess, (state, { cart }) => ({
    ...state,
    cart: {
      ...cart,
      items: cart.items ?? { $values: [] }
    },
    loading: false
  })),

  on(CartActions.getTotalpriceSuccess, (state, { totalPrice }) => ({
    ...state,
    totalPrice
  })),

  on(CartActions.incrementItemQuantity, (state) => ({
    ...state,
    loading: true
  })),
  on(CartActions.incrementItemQuantityFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  on(CartActions.decrementItemQuantity, (state) => ({
    ...state,
    loading: true
  })),
  on(CartActions.decrementItemQuantityFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
