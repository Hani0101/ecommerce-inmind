import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICart } from '../../../shared/models/cart.model';
import { environment } from '../../../../environments/environments';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private CartUrl = environment.cartAPI; 

  constructor(private http: HttpClient) {}
  getCart(userId: number): Observable<ICart> {
    return this.http.get<ICart | null>(`${this.CartUrl}/cart/${userId}`) as Observable<ICart>  }
  
  removeItemFromCart(userId: number, productId: number): Observable<any> {
    return this.http.delete(`${this.CartUrl}/cart/${userId}/items/${productId}`);
  }
  

  addItemToCart(userId: number, cartId: number, productId: number, quantity: number): Observable<ICart> {
    const body = { userId, productId, quantity };
    console.log("cartId", cartId)
    return this.http.post<ICart>(`${this.CartUrl}/cart/${cartId}/items`, body);
  }

  getTotalPrice(userId: number): Observable< {totalPrice: number}> {
   return this.http.get<{ totalPrice: number }>(`${this.CartUrl}/cart/${userId}/total-price`); 
  }

  incrementItem(userId: number, productId: number): Observable<ICart> {
    return this.http.put<ICart>(`${this.CartUrl}/cart/${userId}/items/${productId}/increment`, {});
  }

  decrementItem(userId: number, productId: number): Observable<ICart> {
    return this.http.put<ICart>(`${this.CartUrl}/cart/${userId}/items/${productId}/decrement`, {});
  }
  
}
