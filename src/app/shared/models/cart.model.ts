import { ICartItem } from './cart-item.model';

export interface ICart {
  id: number;
  userId: number;
  createdAt: string; 
  updatedAt?: string | null;
  items?: { $values: ICartItem[] }; 
  cartItems: ICartItem[];
}
