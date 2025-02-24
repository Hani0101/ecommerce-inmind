import { Injectable } from '@angular/core';
import { enviromnent } from '../../../../environments/environments';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICategories } from '../../models/category';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

private catApiUrl = enviromnent.categoryAPI;
  
  constructor(private http: HttpClient) { }

  getCategories(): Observable<ICategories[]> {
    return this.http.get<ICategories[]>(this.catApiUrl);
  }
}
