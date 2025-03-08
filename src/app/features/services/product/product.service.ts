import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../../../shared/models/product';
import { environment  } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private prodUrl = environment.productAPI; 

  constructor(private http: HttpClient) {}
  
  getProductById(productId: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.prodUrl}/${productId}`);
  }

  getProductsByCategory(categoryName: string, sortBy: string = 'title', order: string = 'asc'): Observable<{ products: IProduct[] }> {
    return this.http.get<{ products: IProduct[] }>(`${this.prodUrl}/category/${categoryName}?sortBy=${sortBy}&order=${order}`);
  }

  getRecommendedProducts(categoryName: string): Observable<{ products: IProduct[] }> {
    return this.http.get<{ products: IProduct[] }>(`${this.prodUrl}/category/${categoryName}?limit=10`);
  }

  getGeneralProducts(): Observable<{ products: IProduct[] }> {
    return this.http.get<{products: IProduct[]}>(`${this.prodUrl}?limit=15`);
  }
  
  getProductsBySearch(query: string): Observable<{ products: IProduct[] }> {
    return this.http.get<{ products: IProduct[] }>(`${this.prodUrl}/search?q=${query}`);
  }
}
