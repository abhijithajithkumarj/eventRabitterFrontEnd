import { Injectable } from '@angular/core';

import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import { ChatMessage } from '../../models/chatMessage';

@Injectable({
  providedIn: 'root'
})
export class MessageAndNotificationService {
  
  constructor() { }


  individualChatSubjects: any;
  private stompClient: CompatClient = null ;
  disabled=true;
  private recipientSubjects: { [key: string]: Subject<string> } = {};




  

  setConnected(connected: boolean) {
    this.disabled = !connected;
    if (connected) { 
    }
  }

  sendMessage(newmessage:string) {
    this.stompClient.send(
      '/ws/app/sendAll',
      {},
      newmessage
    );
    console.log(newmessage);
    newmessage = "";
  }


  sendPrivateMessage(newmessage) {
    this.stompClient.send(
      '/ws/app/sendAll',
      {},  
      newmessage
    );
    console.log(newmessage); 
    newmessage = "";
  }
  
  showChat(message: string) {
    console.log(message);
    this.greetingsSubject.next(message);
  }

  private greetingsSubject: Subject<string> = new Subject<string>(); 
  greetings$ = this.greetingsSubject.asObservable();

  connect() {
    const socket = new SockJS( 'http://localhost:4444/ws/testchat');
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect(
      {},
       function (frame) {
        console.log('Connected Hi: ' + frame);
        _this.stompClient.subscribe('/all/messages', function (hello) {
          console.log(hello.body);
          _this.showChat(hello.body);
        });
      });
  }



  sendPrivateMessageUser(recipientId: string, message: string): void {
    const destination = `/ws/app/private/${recipientId}`;
    this.stompClient.send(destination, {}, message);
    console.log(`Message sent to ${recipientId}: ${message}`);
}


  subscribeToRecipientMessages(recipientId: string): Observable<string> {
    if (!this.recipientSubjects[recipientId]) {
      const subject = new Subject<string>();
      this.recipientSubjects[recipientId] = subject;
      if (this.stompClient) {
        this.stompClient.subscribe(`/topic/private/${recipientId}`, (message) => {
          subject.next(message.body);
        });
      }
    }

    return this.recipientSubjects[recipientId].asObservable();
  }













  

  joinRoom(roomId:string){
    this.stompClient.connect({},()=>{
      this.stompClient.subscribe(`/all/${roomId}`,(message:any)=>{
        const messageContent=JSON.parse(message.body)
        console.log(messageContent);
        
        this.greetingsSubject.next(messageContent)
        
      })
    })
  }


  sentMessageRoom(roomId:string,chat:ChatMessage){
    this.stompClient.send(`/ws/app/chat/${roomId}`,{},JSON.stringify(chat))
  }

  getMessageSub(){
    return this.greetingsSubject.asObservable()
  }



  connectToUser(userId: string): void {
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      console.log('Connected to WebSocket');
      this.stompClient.subscribe(`/all/messages/${userId}`, (message) => {
        console.log(`Individual chat with ${userId}: ` + message.body);
        if (this.individualChatSubjects[userId]) {
          this.individualChatSubjects[userId].next(message.body);
        } else {
          this.individualChatSubjects[userId] = new Subject<string>();
          this.individualChatSubjects[userId].next(message.body);
        }
      });
    }, (error) => {
      console.error('Error connecting to individual chat:', error);
    });
  }


  sendMessageToIndividual(recipientId: string, message: string) {
    if (this.stompClient) {
      this.stompClient.send(`/sendToUser/${recipientId}`, {}, message);
    }
  }

}
