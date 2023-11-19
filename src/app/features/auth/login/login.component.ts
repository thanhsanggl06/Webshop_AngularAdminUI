import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  redirectUrl: any = '';
  model: LoginRequest;
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
    this.model = {
      username: '',
      password: '',
    };
  }

  onFormSubmit(): void {
    this.authService.login(this.model).subscribe({
      next: (response) => {
        this.cookieService.set(
          'Authorization',
          `Bearer ${response.token}`,
          undefined,
          '/',
          undefined,
          true,
          'Strict'
        );
        this.authService.setUser({
          username: response.username,
        });
        this.redirectUrl =
          this.activatedRouter.snapshot.queryParamMap.get('redirectUrl') || '/';
        this.router.navigateByUrl(this.redirectUrl);
      },
    });
  }
}
