import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/features/auth/models/user.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { WebSocketService } from './services/web-socket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user?: User;
  greeting: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private webSocketAPI: WebSocketService
  ) {}
  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (response) => {
        this.user = response;
      },
    });

    this.user = this.authService.getUser();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
