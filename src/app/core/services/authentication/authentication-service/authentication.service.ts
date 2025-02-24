import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject  } from 'rxjs';
import { ILoginRequest } from '../../../models/login-request';
import { ILoginResponse } from '../../../models/login-response';
import { AuthenticationApiService } from '../authentication-api/authentication-api.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(private authApiService: AuthenticationApiService,private cookieService: CookieService) { 
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
      }
    );
    console.log("response body: ", response);
    return response;
  }


  logout(): void {
    this.cookieService.delete('authToken', '/');
    sessionStorage.clear();
    localStorage.clear();
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