import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILoginResponse } from '../../../models/login-response';
import { ILoginRequest } from '../../../models/login-request';
import { ISignUpRequest } from '../../../models/signup-request';
import { ISignUpResponse } from '../../../models/signup-response';
import { environment } from '../../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationApiService {
  private logInApiUrl = environment.logInApi;
  private signUpApiUrl = environment.signUpApi;
  private refreshTokenApiUrl = '/api/auth/refresh'; //proxy path
  private currentUserApiUrl = environment.currentUserApi;
  constructor(private http: HttpClient) { }

  login(request: ILoginRequest): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(this.logInApiUrl, request);
  }

  signUp(request: ISignUpRequest): Observable<ISignUpResponse> {
    return this.http.post<ISignUpResponse>(this.signUpApiUrl, request);
  }

  refreshToken(refreshToken: string, expiresInMins?: number): Observable<ILoginResponse> {
    const body: any = {};

    if (refreshToken) {
      console.log("refresh token being added: ", refreshToken);
      body.refreshToken = refreshToken;
    }

    if (expiresInMins) {
      body.expiresInMins = expiresInMins;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    console.log("refresh token body: ", this.refreshTokenApiUrl, body, { headers });

    return this.http.post<ILoginResponse>(this.refreshTokenApiUrl, body, {
      headers,
      withCredentials: true, 
    });
  }


  getCurrentUser(): Observable<ILoginResponse>{
    return this.http.get<ILoginResponse>(this.currentUserApiUrl); //no need for headers since interceptor handles it
  }



}
