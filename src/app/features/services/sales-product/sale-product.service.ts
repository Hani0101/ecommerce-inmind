import { Injectable } from '@angular/core';
import { IProduct } from '../../../shared/models/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { enviromnent } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SaleProductService {
  private salesApiUrl = enviromnent.salesProductAPI;
  
  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.salesApiUrl);
  }
}
