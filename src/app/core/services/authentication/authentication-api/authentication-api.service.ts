import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILoginResponse } from '../../../models/login-response';
import { ILoginRequest } from '../../../models/login-request';
import { enviromnent } from '../../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationApiService {
  private authApiUrl = enviromnent.authApi;

  constructor(private http: HttpClient) { }

  login(request: ILoginRequest): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(this.authApiUrl, request);
  }
}
