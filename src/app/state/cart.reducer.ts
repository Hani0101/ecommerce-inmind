import { createReducer, on } from '@ngrx/store';
import { addToCart, removeFromCart, loadCartSuccess } from './cart.actions';
import { IProduct } from '../shared/models/product';

export interface CartState {
  products: IProduct[];
}

export const initialState: CartState = {
  products: []
};

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { product }) => {
    console.log('Adding product to cart:', product);
    return {...state,
    products: [...state.products, product]};
  }),
  on(removeFromCart, (state, { productId }) => ({
    ...state,
    products: state.products.filter(p => p.id !== productId)
  })),
  on(loadCartSuccess, (state, { products }) => ({
    ...state,
    products
  }))
);