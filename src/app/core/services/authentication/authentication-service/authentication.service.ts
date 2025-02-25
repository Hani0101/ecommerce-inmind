import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject  } from 'rxjs';
import { ILoginRequest } from '../../../models/login-request';
import { ILoginResponse } from '../../../models/login-response';
import { ISignUpRequest } from '../../../models/signup-request';
import { ISignUpResponse } from '../../../models/signup-response';
import { AuthenticationApiService } from '../authentication-api/authentication-api.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(private authApiService: AuthenticationApiService,private cookieService: CookieService, private router: Router) { 
      console.log("logged in? ", this.isLoggedIn());
      console.log("token: ", this.getAuthToken());  
    }


  login(username: string, password: string): Observable<ILoginResponse> {
    const requestbody: ILoginRequest = {
      username,
      password,
      expiresInMins: 30
    };

    const response: Observable<ILoginResponse> = this.authApiService.login(requestbody);
    response.subscribe(
      (res) => {
        this.setAuthToken(res.accessToken);
        this.setUserData(res); 
        this.router.navigate(['/']);
      }
    );
    console.log("response body: ", response);
    return response;
  }

  signUp(firstName: string, lastName: string, age: number, username: string, email: string, password: string): Observable<ISignUpResponse> {
    const requestBody: ISignUpRequest = {
      firstName,
      lastName,
      age,
      username,
      email,
      password

    };

    const response: Observable<ISignUpResponse> = this.authApiService.signUp(requestBody);
    response.subscribe(
      (res) => {
        console.log('Sign-up successful:', res);
        this.router.navigate(['/']);
        this.setUserData(res); 
      },
      (error) => {
        console.error('Sign-up failed:', error);
      }
    );

    console.log('Sign-up response body:', response);
    return response;
  }

  private setUserData(user: ISignUpResponse | ILoginResponse): void {

    const userData = JSON.stringify(user);

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);

    this.cookieService.set('user', userData, expirationDate, '/');
    console.log('User data stored in cookies:', user);
  }

  logout(): void {
    this.cookieService.delete('authToken', '/');
    this.cookieService.delete('user', '/');
    sessionStorage.clear();
    console.log('User data cleared. Logged out successfully.');
  }

  isLoggedIn(): boolean {
    if (this.getAuthToken()) {
      return true;
    }
    return false;
  }

  getAuthToken(): string {
    return this.cookieService.get('authToken');
  }

  private setAuthToken(token: string): void {
    this.cookieService.set('authToken', token, 1, '/');
  }
}