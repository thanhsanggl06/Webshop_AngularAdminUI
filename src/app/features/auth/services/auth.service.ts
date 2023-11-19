import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  $user = new BehaviorSubject<User | undefined>(undefined);
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${environment.apiBaseUrl}/authenticate/login`,
      request
    );
  }

  setUser(user: User) {
    this.$user.next(user);
    localStorage.setItem('username', user.username);
  }

  user(): Observable<User | undefined> {
    return this.$user.asObservable();
  }

  getUser(): User | undefined {
    const username = localStorage.getItem('username');
    if (username) {
      const user: User = {
        username: username,
      };
      return user;
    }
    return undefined;
  }

  logout(): void {
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.$user.next(undefined);
  }
}
