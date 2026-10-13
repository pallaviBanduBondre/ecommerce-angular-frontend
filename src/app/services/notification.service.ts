import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface NotificationMessage{
  text : string;
  type : 'success' | 'error';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  private notificationSubject = new BehaviorSubject<NotificationMessage | null>(null);
  notification$ = this.notificationSubject.asObservable();

  showSuccess(message : string): void{
    this.notificationSubject.next({
      text : message,
      type : 'success'
    });
  }

  showError(message:string):void{
    this.notificationSubject.next({
      text : message,
      type : 'error'
    });
  }
  clear():void{
    this.notificationSubject.next(null);
  }
}
