import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../authentication/authentication-service/authentication.service';
import { enviromnent } from '../../../../../environments/environments';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getAuthToken();
    const isBackendRequest = req.url.includes(enviromnent.cartAPI);

    if (!isBackendRequest && authToken) {  //Disable backend jwt token enterceptor because the api does not require a jwt token
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
      console.log("Authentication interceptor jwt: ", authToken);
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}