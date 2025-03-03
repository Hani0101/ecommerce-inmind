import { createAction, props } from '@ngrx/store';
import { ICart } from '../shared/models/cart.model';
import { ICartItem } from '../shared/models/cart-item.model';

// Load Cart
export const loadCart = createAction('[Cart] Load Cart', props<{ userId: number }>());
export const loadCartSuccess = createAction('[Cart] Load Cart Success', props<{ cart: ICart }>());
export const loadCartFailure = createAction('[Cart] Load Cart Failure', props<{ error: string }>());

// Add Item
export const addItemToCart = createAction('[Cart] Add Item', props<{ cartItem: ICartItem }>());
export const addItemToCartSuccess = createAction('[Cart] Add Item Success', props<{ cart: ICart }>());
export const addItemToCartFailure = createAction('[Cart] Add Item Failure', props<{ error: string }>());
