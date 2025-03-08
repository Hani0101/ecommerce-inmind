import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, of, switchMap, catchError, tap } from 'rxjs';
import { AuthenticationService } from '../../authentication/authentication-service/authentication.service';
import { environment } from '../../../../../environments/environments';
import { Router } from '@angular/router';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService, private router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getAccessToken();
    const isBackendRequest = req.url.includes(environment.cartAPI);
    const isRefreshTokenRequest = req.url.includes(environment.refreshTokenAPI);
    
    if (!isBackendRequest && !isRefreshTokenRequest && accessToken) {  //Do not send a header to backend because it does not accept jwt token
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return next.handle(cloned);
    }

    //if it is a request to get cart or add items to cart then check if the user is logged in
    if (isBackendRequest) {
      return this.authService.isCurrentUserLoggedIn().pipe(
        switchMap((isLoggedIn) => {
          console.log('Backend request detected', isBackendRequest);
          if (!isLoggedIn) {
            //if the user is not logged in, attempt to refresh the token
            return this.authService.refreshToken().pipe(
              switchMap((result) => {
                console.log('Refresh token attempt successful', result);
                //if access token is refreshed succesfully then proceed with the original request
                this.router.navigate(['/']);
                return next.handle(req);
              }),
              catchError((err) => {
                console.error('Refresh token attempt failed', err);
                return of(); //return an empty observable to avoid infinite request
              })
            );

          } else {
            //if the user is logged in, proceed with the request
            return next.handle(req);
          }
        }),
      );
    }

    return next.handle(req);
  }
}