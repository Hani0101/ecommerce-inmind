import { Component } from '@angular/core';
import { NotificationService } from './notification.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ecommerce-inmind';
  constructor(private notificationService: NotificationService) { }

  requestPermission(): void {
    this.notificationService.requestPermission();
  }

  triggerNotification(): void {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification('Hello from Angular!');
      }
    });
  }
}
