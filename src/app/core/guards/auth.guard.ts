import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication-service/authentication.service'; 
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService); 
  const router = inject(Router);

  return authService.isCurrentUserLoggedIn().pipe(
    map((isLoggedIn) => {
      if (isLoggedIn) {
        return true; 
      } else {
        return router.createUrlTree(['/log-in']); 
      }
    }),
    catchError(() => {
      return of(router.createUrlTree(['/log-in'])); 
    })
  );
};