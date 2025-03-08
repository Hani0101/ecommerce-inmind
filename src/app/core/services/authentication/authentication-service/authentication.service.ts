import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, switchMap, of, catchError, map } from 'rxjs';
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
    }


  login(username: string, password: string): Observable<ILoginResponse> {
    const requestbody: ILoginRequest = {
      username,
      password,
      expiresInMins: 1
    };

    const response: Observable<ILoginResponse> = this.authApiService.login(requestbody);
    response.subscribe({
      next: (res) => {
        this.setAuthToken(res.accessToken);
        this.setRefreshToken(res.refreshToken);
        this.setUserData(res); 
      },
    error: (error) => {
    console.error('Login failed:', error);
    },
    complete: () => {
      console.log('Login successful');
      this.router.navigate(['/']);
    }
  });
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
    response.subscribe({
      next: (res) => {
        this.setUserData(res);
      },
      error: (error) => {
        console.error('Sign-up failed:', error);
      },
      complete: () => {
        console.log('Sign-up successful');
        this.router.navigate(['/']);
      },
    });

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

  getUserData(): ILoginResponse | ISignUpResponse | null {
    const userData = this.cookieService.get('user');
  
    if (userData) {
      return JSON.parse(userData); 
    }
  
    return null; 
  }

  logout(): void {
    this.cookieService.delete('authToken', '/');
    this.cookieService.delete('refreshToken', '/');
    this.cookieService.delete('user', '/');
    sessionStorage.clear();
    console.log('User data cleared. Logged out successfully.');
  }


  isCurrentUserLoggedIn(): Observable<boolean> {
    return this.authApiService.getCurrentUser().pipe(
      map((user) => {
        console.log('User data from isCurrentUserLoggedIn:', user);
        return !!user; //converts the user object to a boolean value
      }),
      catchError((err) => {
        console.error('Error fetching current user:', err);
        return of(false);
      })
    );
  }

  getAccessToken(): string {
    return this.cookieService.get('authToken');
  }

  private setAuthToken(token: string): void {
    this.cookieService.set('authToken', token, 1, '/');
  }

  getRefreshToken(): string {
    return this.cookieService.get('refreshToken');
  }

  private setRefreshToken(token: string): void {
    this.cookieService.set('refreshToken', token, 1, '/');
  }

  refreshToken(): Observable<ILoginResponse>{
    const refreshToken = this.getRefreshToken();
    console.log("auth service refresh token function triggered");
    if(!refreshToken){
      console.error("No refresh token found");
    }
    return this.authApiService.refreshToken(refreshToken).pipe( //pipe: used to chain(apply multiple operators) switchMap operator
      switchMap((res: ILoginResponse) => {  //switch map: used here to handle the result of the refresh 
                                            //token and to return an observable (we did not use tap here because we want to return an observable to the interceptor)
        
        console.log("attempting to refresh token", res);
        this.setAuthToken(res.accessToken);
        this.setRefreshToken(res.refreshToken);
        return of(res);
    })
  );
 }
}