import { Component } from '@angular/core';
import { AuthserviceService } from '../service/auth/authservice.service';
import { MessageAndNotificationService } from '../service/messageAndNotificationService/message-and-notification.service';
import { Subject, Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSharingServiceService } from '../service/dataShare/data-sharing-service.service';
import { UserId } from '../models/userIds';

@Component({
  selector: 'app-chat-app',
  templateUrl: './chat-app.component.html',
  styleUrl: './chat-app.component.css',
})
export class ChatAppComponent {
  selectedPerson: string | null = null;
  selectedPersonId!: string;
  message: string = '';
  selectedRoomName!: string;
  messageForm!: FormGroup;
  messages!: any[];
  receiverId: string;
  receiverImage: any;
  members: any[] = [];
  userId: string;
 
  chatRoomSubscription: Subscription | undefined;
  public messageSubject = new Subject<string>();
  public message$ = this.messageSubject.asObservable();
  profilesData: string[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userAuthService: AuthserviceService,
    private _chatService: MessageAndNotificationService,
    private fb: FormBuilder,
    private dataSharingService: DataSharingServiceService
  ) {}

  isSubmitting: boolean = false;


  ngOnInit(): void {
    this.userId = this._userAuthService.getUserFromLocalStorage();
    const givenData = this.dataSharingService.shareData;
  
    if (givenData) {
      givenData.forEach((entry: any) => {
        if (entry.eventPerformers.id) {
          this.profilesData.push(entry.eventPerformers.id);
        }
      });
      this.listOfUser(this.profilesData);
    } else {
      this._route.queryParams.subscribe((params) => {
        if (params['id'] && params['id'] !== "") {
        const givenData=params['id']
        this.paramBaseId(givenData)
         
         
        } else {
          this._userAuthService.listOfChat(this.userId).subscribe((data) => {
            if (data) {
              this.listOfData(data);
            }
          });
        }
      });
    }
  
    this.messageForm = this.fb.group({
      message: [''],
    });
    this._chatService.initConnenctionSocket('initial-room-name');
    this.listnerMessage();
  }
  








  listnerMessage() {
    this._chatService.message$.subscribe((message) => {
      const receivedMessage = JSON.parse(message);
      if (
        this.selectedRoomName &&
        receivedMessage.chatRoomName === this.selectedRoomName
      ) {
        this.messages.push({
          content: receivedMessage.content,
          recipientId: receivedMessage.recipientId,
          senderId: receivedMessage.senderId,
        });
      }
    });
  }

  sendMessage(): void {
    const receiverId = this.selectedPersonId;


    if (this.isSubmitting || !this.messageForm.valid) {
      return;
    }

    if (this.messageForm.valid) {
      const message = this.messageForm.get('message')?.value;
      if (this.selectedRoomName && message.trim() !== '') {
        this._chatService
          .sendMessage(this.selectedRoomName, message, receiverId, this.userId)
          .subscribe(
            () => {
             
              console.log('Message sent successfully');
              this.messageForm.reset();
            },
            (error) => {
              console.error('Error sending message:', error);
            }
          );
      }
    }
  }

  selectPerson(receiverId: string, imageUrl: string): void {
    this.receiverImage = imageUrl;
    console.log(this.receiverImage);

    this._chatService.createChatRoom(this.userId, receiverId).subscribe(
      ({ roomName, messages }) => {
        this.selectedRoomName = roomName;
        this.messages = Array.isArray(messages) ? messages : [];
        this._chatService.joinRoom(this.selectedRoomName);
        this.messages.forEach((element) => {
          console.log(element.content);
        });
      },
      (error) => {
        console.error('Error creating chat room:', error);
      }
    );
  }



  listOfUser(userIds: string[]) {
    const profiles: UserId = { id: userIds };
    this._userAuthService.getListOfUsers(profiles).subscribe(
      (data: any[]) => {
        if (data!=null) {
          this.members = data;
          console.log(this.members); 
        }
        else {
          this._router.navigate(['/EventSetUp']);
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }



  listOfData(data:any){
    this.profilesData = data;
    this.listOfUser(this.profilesData)
  }
  paramBaseId(data: any) {
    this.profilesData.push(data);
    this.listOfUser(this.profilesData)
   
  }
  


}
