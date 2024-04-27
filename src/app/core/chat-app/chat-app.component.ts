import { Component } from '@angular/core';
import { AuthserviceService } from '../service/auth/authservice.service';
import { MessageAndNotificationService } from '../service/messageAndNotificationService/message-and-notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-app',
  templateUrl: './chat-app.component.html',
  styleUrl: './chat-app.component.css',
})
export class ChatAppComponent {


  title = 'WebSocketChatRoom';
  greetings: string[] = [];
  myGreetings: boolean[] = [];
  disabled = true;
  newmessage: string;
  username: string ='';
  recipientId: string = '';
  messages: any[] = [];
  newTextMessage: string = '';
  newBinaryMessage: File | null = null;



  messageInput:string
  userId:string
  messageList:any[] = [];

  private stompClient = null;

  constructor(private messageService:MessageAndNotificationService,
    private service:AuthserviceService
  ){}

  ngOnInit(): void {
    this.showMessage()
    this.username=this.service.extractUsername()
   this.messageService.connect()

   this.messageService.subscribeToRecipientMessages(this.recipientId).subscribe((message: string) => {
    this.messages.push(message);
  });
  }

  showMessage() {
    this.messageService.greetings$.subscribe((message: string) => {
      if(this.username === message.split(':')[0]){
        this.myGreetings.push(true);
        this.greetings.push(message.split(':')[1]);
      } else{
        this.greetings.push(message);
        this.myGreetings.push(false);
      }
      console.log(message);
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.newBinaryMessage = file;
    }
  }

  sendMessage() {
    const trimmedMessage = this.newmessage.trim();
    if (trimmedMessage !== '') {
        this.messageService.sendPrivateMessage(this.username + ': ' + trimmedMessage);
    }
    this.newmessage='';
  }

  listMessage(){
    this.messageService.getMessageSub().subscribe((message:any)=>{
      this.messageList=message;
    })
  }















  // sendMessageIn(): void {
  //   if (this.newBinaryMessage) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       const binaryData = reader.result as string;
  //       this.messageService.sendMessageToIndividual(this.recipientId, binaryData);
  //       this.messages.push({
  //         type: 'binary',
  //         content: binaryData,
  //         fileType: this.newBinaryMessage?.type || 'unknown',
  //       });
  //       this.newBinaryMessage = null;
  //     };
  //     reader.readAsDataURL(this.newBinaryMessage);
  //   } else if (this.newTextMessage.trim()) {
  //     this.messageService.sendMessageToIndividual(this.recipientId, this.newTextMessage.trim())
  //     this.messages.push({
  //       type: 'text',
  //       content: this.newTextMessage.trim(),
  //     });
  //     this.newTextMessage = '';
  //   }
  // }


  // constructor(
  //   private messageService: MessageAndNotificationService,
  //   private service: AuthserviceService
  // ) {}

  // recipientId: string ;
  // messages: string[] = [];
  // newMessage: string = '';
  // subscription: Subscription;
  // userName: string;

  // ngOnInit(): void {
    
  //   this.recipientId="a9feddf0-508a-472d-a635-71e5916bf6b2"

  //   this.messageService.connect();
  //   this.subscription = this.messageService
  //     .subscribeToRecipientMessages(this.recipientId)
  //     .subscribe((message: string) => {
  //       this.messages.push(message);
  //     });

    
  // }

  // sendMessage(): void {
  //   if (this.newMessage.trim()) {
  //     this.messageService.sendPrivateMessageUser(
  //       this.recipientId,
  //       this.newMessage
  //     );
  //     this.messages.push(`You: ${this.newMessage}`);
  //     this.newMessage = '';
  //   }
  // }


  // test(){
  //   this.service.getUserChatId(this.recipientId).subscribe(
  //     (user) => {
  //       console.log(user);
  //       this.userName=user.username
  //     },
  //     (error) => {
  //       console.error('Error fetching user information:', error);
  //     }
  //   );

  // }





}
