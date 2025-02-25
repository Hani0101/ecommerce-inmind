import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILoginResponse } from '../../../models/login-response';
import { ILoginRequest } from '../../../models/login-request';
import { ISignUpRequest } from '../../../models/signup-request';
import { ISignUpResponse } from '../../../models/signup-response';
import { enviromnent } from '../../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationApiService {
  private logInApiUrl = enviromnent.logInApi;
  private signUpApiUrl = enviromnent.signUpApi;
  constructor(private http: HttpClient) { }

  login(request: ILoginRequest): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(this.logInApiUrl, request);
  }

  signUp(request: ISignUpRequest): Observable<ISignUpResponse> {
    return this.http.post<ISignUpResponse>(this.signUpApiUrl, request);
  }

}
