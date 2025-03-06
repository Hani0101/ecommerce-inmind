import { createAction, props } from '@ngrx/store';
import { ICart } from '../shared/models/cart.model';
import { ICartItem } from '../shared/models/cart-item.model';

//Load Cart
export const loadCart = createAction('[Cart] Load Cart', props<{ userId: number }>());
export const loadCartSuccess = createAction('[Cart] Load Cart Success', props<{ cart: ICart }>());
export const loadCartFailure = createAction('[Cart] Load Cart Failure', props<{ error: string }>());

//Add Item
export const addItemToCart = createAction('[Cart] Add Item', props<{ cartItem: ICartItem }>());
export const addItemToCartSuccess = createAction('[Cart] Add Item Success', props<{ cart: ICart }>());
export const addItemToCartFailure = createAction('[Cart] Add Item Failure', props<{ error: string }>());

//Get Total Price
export const getTotalprice = createAction('[Cart] Get Total Price', props<{ userId: number }>());
export const getTotalpriceSuccess = createAction('[Cart] Get Total Price Success', props<{ totalPrice: number }>());
export const getTotalpriceFailure = createAction('[Cart] Get Total Price Failure', props<{ error: string }>());

//Increment Item Quantity
export const incrementItemQuantity = createAction('[Cart] Increment Item Quantity',props<{ userId: number; productId: number }>());
export const incrementItemQuantitySuccess = createAction('[Cart] Increment Item Quantity Success',props<{ cart: ICart }>());
export const incrementItemQuantityFailure = createAction('[Cart] Increment Item Quantity Failure',props<{ error: string }>());
  
//Decrement Item Quantity 
export const decrementItemQuantity = createAction('[Cart] Decrement Item Quantity',props<{ userId: number; productId: number }>());
export const decrementItemQuantitySuccess = createAction('[Cart] Decrement Item Quantity Success',props<{ cart: ICart }>());
export const decrementItemQuantityFailure = createAction('[Cart] Decrement Item Quantity Failure',props<{ error: string }>());

//Remove Item
export const removeItemFromCart = createAction('[Cart] Remove Item',props<{ userId: number; productId: number }>());
