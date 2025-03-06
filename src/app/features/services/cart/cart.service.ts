import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICart } from '../../../shared/models/cart.model';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environments';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private CartUrl = environment.cartAPI; 

  constructor(private http: HttpClient) {}
  getCart(userId: number): Observable<ICart> {
    return this.http.get<ICart | null>(`${this.CartUrl}/cart/${userId}`).pipe(
      map(cart => {
        if (cart && cart.items && '$values' in cart.items) {
          return { 
            ...cart, 
            cartItems: cart.items.$values 
          };
        }
        return {
          id: 0,
          userId,
          createdAt: '',
          updatedAt: null,
          items: { $values: [] },
          cartItems: [] 
        };
      })
    );
  }
  
  removeItemFromCart(userId: number, productId: number): Observable<any> {
    return this.http.delete(`${this.CartUrl}/cart/${userId}/items/${productId}`);
  }
  

  addItemToCart(userId: number, cartId: number, productId: number, quantity: number): Observable<ICart> {
    const body = { userId, productId, quantity };
    console.log("cartId", cartId)
    return this.http.post<ICart>(`${this.CartUrl}/cart/${cartId}/items`, body);
  }

  getTotalPrice(userId: number): Observable<number> {
   return this.http.get<number>(`${this.CartUrl}/cart/${userId}/total-price`); 
  }

  incrementItem(userId: number, productId: number): Observable<ICart> {
    return this.http.put<ICart>(`${this.CartUrl}/cart/${userId}/items/${productId}/increment`, {});
  }

  decrementItem(userId: number, productId: number): Observable<ICart> {
    return this.http.put<ICart>(`${this.CartUrl}/cart/${userId}/items/${productId}/decrement`, {});
  }
  
}
