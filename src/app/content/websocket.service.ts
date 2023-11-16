import { Injectable } from '@angular/core';
import {Subject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket!: WebSocket;
  public is_connect: boolean = false;
  messageReceived: Subject<string> = new Subject<string>();
  constructor() { }

  connect(event_id: number): void {
    this.socket = new WebSocket(`wss://swim-timer.ru/api/ws/${event_id}`);

    this.socket.onopen = () => {
      console.log('WebSocket connection established.');
      this.is_connect = true;
    };

    this.socket.onmessage = (event) => {
      console.log('Received message:', event.data);
      this.messageReceived.next(event.data);
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
      this.is_connect = false;
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  sendMessage(message: string): void {
    this.socket.send(message);
  }

  closeConnection(): void {
    this.is_connect = false;
    this.socket.close();
  }

}
