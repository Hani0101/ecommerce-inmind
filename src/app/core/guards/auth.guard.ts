import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication-service/authentication.service';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return authService.refreshToken().pipe(
    switchMap((response) => {
      const userId = authService.decodeJwtToken(authService.getAccessToken()); 
      if (userId) {
        return of(true); 
      } else {
        return of(router.createUrlTree(['/log-in'])); 
      }
    }),
    catchError(() => {
      console.log("GUARD IN ERROR TRIGGERED")
      return of(router.createUrlTree(['/log-in']));
    }),
  );
};
