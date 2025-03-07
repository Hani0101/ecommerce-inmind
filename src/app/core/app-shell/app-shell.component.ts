import { Component } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-app-shell',
  standalone: false,
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss'
})
export class AppShellComponent {
  constructor(public router: Router) {}

  isAuthPage(): boolean {
    return this.router.url === '/log-in' || this.router.url === '/sign-up';
  }

  isAdminPage(): boolean {
    return this.router.url === '/admin';
  }

  isNotFoundPage(): boolean {
    return this.router.url === '/not-found';
  }
}
