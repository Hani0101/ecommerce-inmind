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
    
    if (!isBackendRequest && !isRefreshTokenRequest && accessToken) {  //Do not send a header to backend because it does not accept jwt 
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}