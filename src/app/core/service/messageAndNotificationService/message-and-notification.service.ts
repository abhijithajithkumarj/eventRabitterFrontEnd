import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import { CompatClient, Message, Stomp } from '@stomp/stompjs';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { ChatMessage } from '../../models/chatMessage';
import { ChatRoomResponse, Messages } from '../../models/chat-message';

@Injectable({
  providedIn: 'root',
})
export class MessageAndNotificationService {
  private stompClient: CompatClient | null = null;
  public messageSubject = new Subject<string>();
  public message$ = this.messageSubject.asObservable();

  initConnenctionSocket(chatRoomName: string): void {
    const url = 'https://chat.eventrabbiter.online/ws';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
    const chatRoomTopic = `topic/${chatRoomName}`;
    this.stompClient.connect({}, () => {
      console.log('Connected to WebSocket');
      this.stompClient.subscribe(chatRoomTopic, (message: any) => {
        this.showMessage(message.body);
      });
    });
  }

  showMessage(message: string): void {
    this.messageSubject.next(message);
  }

  createChatRoom(senderId: string | null, receiverId: string): Observable<ChatRoomResponse> {
    const roomSubject = new ReplaySubject<ChatRoomResponse>(1);

    if (!this.stompClient || !this.stompClient.connected) {
      console.error('WebSocket connection not established.');
      return roomSubject.asObservable(); 
    }

    const subscription = this.stompClient.subscribe(
      '/user/queue/messages',
      (message: Message) => {
        const messagePayload = JSON.parse(message.body);
        const roomName = messagePayload.roomName;
        const messages = messagePayload.messages;

        roomSubject.next({ roomName, messages });
        subscription.unsubscribe();
      }
    );

    this.stompClient.publish({
      destination: '/app/create-chatRoom',
      body: JSON.stringify({ senderId, receiverId }),
    });

    return roomSubject.asObservable();
  }

  sendMessage(roomName: string, message: string, receiverId: string, senderId: string): Observable<void> {
    return new Observable<void>((observer) => {
      if (!this.stompClient || !this.stompClient.connected) {
        console.error('WebSocket connection not established.');
        observer.error('WebSocket connection not established.');
        return;
      }

      this.stompClient.publish({
        destination: '/app/chat',
        body: JSON.stringify({ chatRoomName: roomName, message, receiverId, senderId }),
      });

      observer.next();
      observer.complete();
    });
  }

  connectToRoom(roomName: string): void {
    if (!this.stompClient || !this.stompClient.connected) {
      console.error('WebSocket connection not established. Cannot connect to room.');
      return;
    }

    this.stompClient.subscribe(`/topic/${roomName}`, (message: any) => {
      this.messageSubject.next(JSON.parse(message.body));
    });
  }

  joinRoom(roomName: string): void {
    if (!this.stompClient || !this.stompClient.connected) {
      console.error('WebSocket connection not established.');
      return;
    }

    this.stompClient.subscribe(`/topic/${roomName}`, (message: any) => {
      this.messageSubject.next(JSON.parse(message.body));
    });
  }
}
