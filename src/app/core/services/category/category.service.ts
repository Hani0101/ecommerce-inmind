import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICategories } from '../../models/category';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

private catApiUrl = environment.categoryAPI;
  
  constructor(private http: HttpClient) { }

  getCategories(): Observable<ICategories[]> {
    return this.http.get<ICategories[]>(this.catApiUrl);
  }
}
