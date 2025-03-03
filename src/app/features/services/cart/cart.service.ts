import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICart } from '../../../shared/models/cart.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:5058/api/cart'; 

  constructor(private http: HttpClient) {}
  getCart(userId: number): Observable<ICart> {
    return this.http.get<ICart | null>(`${this.apiUrl}/${userId}`).pipe(
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
  
  
  

  addItemToCart(userId: number, cartId: number, productId: number, quantity: number): Observable<ICart> {
    const body = { userId, productId, quantity };
    console.log("cartId", cartId)
    return this.http.post<ICart>(`${this.apiUrl}/${cartId}/items`, body);
  }
  
  
}
