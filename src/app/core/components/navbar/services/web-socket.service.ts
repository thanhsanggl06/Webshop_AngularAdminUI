import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private newOrder: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(
    false
  );
  private stompClient: any;
  constructor() {
    this.initConnectionSocket();
  }

  initConnectionSocket() {
    const url = '//localhost:8080/ws';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
  }

  getNotifications() {
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/notifications', (messages: any) => {
        const messageContent = JSON.parse(messages.body);
        console.log(messageContent);
        this.newOrder.next(true);
      });
    });
  }

  getNewOrder() {
    return this.newOrder.asObservable();
  }
}
