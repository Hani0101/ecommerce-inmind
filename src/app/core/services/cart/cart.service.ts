import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = environment.cartAPI; 

  constructor(private http: HttpClient) {}

  getCartItemCount(userId: number): Observable<{ itemCount: number }> {
    return this.http.get<{ itemCount: number }>(`${this.apiUrl}/cart/${userId}/item-count`);
  }
}
