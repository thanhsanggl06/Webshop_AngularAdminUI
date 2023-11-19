import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieSevice = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);

  //check for the JWT
  let token = cookieSevice.get('Authorization');

  if (token) {
    token = token.replace('Beare ', '');
    const decodedToken: any = jwtDecode(token);
    const expirationDate = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();
    if (expirationDate < currentTime) {
      //logout
      authService.logout();
      router.navigate(['/login'], { queryParams: { redirectUrl: state.url } });
      return false;
      // return router.createUrlTree(['/login'], {
      //   queryParams: { returnUrl: state.url },
      // });
    } else {
      // Token is still valid
      return true;
    }
  } else {
    //logout
    authService.logout();
    router.navigate(['/login'], { queryParams: { redirectUrl: state.url } });
    return false;
    // return router.createUrlTree(['/login'], {
    //   queryParams: { returnUrl: state.url },
    // });
  }
};
