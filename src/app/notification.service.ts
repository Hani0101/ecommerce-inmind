import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private swPush: SwPush) { }

  requestPermission(): void {
    this.swPush.requestSubscription({
      serverPublicKey: 'BJHh2jYHQ4GhP3X_bW69ysNMBmKg6YoaWL4hBf3SxjrxadSrbrNTWQYPo8feTZZGwm65SWEuRdTpZiowgfXNWPs'
    });
  }
}