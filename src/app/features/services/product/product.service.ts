import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../../../shared/models/product';
import { enviromnent } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private prodUrl = enviromnent.productAPI; 

  constructor(private http: HttpClient) {}

  getProductById(productId: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.prodUrl}/${productId}`);
  }
}
