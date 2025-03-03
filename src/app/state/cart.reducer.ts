import { createReducer, on } from '@ngrx/store';
import { loadCartSuccess, addItemToCartSuccess } from './cart.actions';
import { ICart } from '../shared/models/cart.model';

export interface CartState {
  cart: ICart | null;
}

const initialState: CartState = {
  cart: null,
};

export const cartReducer = createReducer(
  initialState,

  on(loadCartSuccess, (state, { cart }) => ({ ...state, cart })),

  on(addItemToCartSuccess, (state, { cart }) => {
    return {
      ...state,
      cart: {
        ...cart,
        cartItems: cart.items?.$values ?? [] 
      }
    };
  }),
);  
