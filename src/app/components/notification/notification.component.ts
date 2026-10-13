import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {

  private notificationService = inject(NotificationService);

  notification$ = this.notificationService.notification$;

  closeNotification(): void {
    this.notificationService.clear();
  }

}