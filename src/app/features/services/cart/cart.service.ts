import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../../../shared/models/product';
import { enviromnent } from '../../../../environments/environments';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private CartApiUrl = enviromnent.CartAPI;

  constructor(private http: HttpClient) {}

  getCart(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.CartApiUrl}`); 
  }
}