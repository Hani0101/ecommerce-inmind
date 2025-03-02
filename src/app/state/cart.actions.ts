import { createAction, props } from '@ngrx/store';
import { IProduct } from '../../app/shared/models/product';

export const addToCart = createAction('[Cart] Add to Cart', props<{ product: IProduct }>());
export const removeFromCart = createAction('[Cart] Remove from Cart', props<{ productId: number }>());
export const loadCart = createAction('[Cart] Load Cart');
export const loadCartSuccess = createAction('[Cart] Load Cart Success', props<{ products: IProduct[] }>());
export const loadCartFailure = createAction('[Cart] Load Cart Failure', props<{ error: any }>());