import { Component } from '@angular/core';
import { UserProfile } from '../../core/models/userProfile';
import { AuthserviceService } from '../../core/service/auth/authservice.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
chat() {
throw new Error('Method not implemented.');
}


  userProfile: UserProfile | null = null;
  notification:any[]=[];
  creatorName:string


  userId!: string;
  constructor(private service:AuthserviceService) { }

  ngOnInit(): void {
    this.userId=this.service.getUserFromLocalStorage();
    this.getUserProfile();  
    this.getNotifications();
  }

  

  getUserProfile(): void {
    this.service.getUserProfile(this.userId).subscribe(
      (data: any) => {
        this.userProfile = {
          firstName: data.firstName,
          secondName: data.secondName,
          username: data.username,
          phoneNumber: data.phoneNumber,
          bio: data.bio,
          description: data.description,
          profileVerification:data.profileVerification
        }; 

        console.log(data.profileVerification);
        
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  getNotifications(): void {
    this.service.getNotifications(this.userId).subscribe((data)=>{
      this.notification = data;        
      console.log(this.notification);
    })
  }

  rejectEvent(id:string){
    console.log("test");
    const notificationType="EVENT_REJECTED"
    this.service.eventNotificationReaction(id, notificationType).subscribe((data)=>{
      console.log(data);
    })
   }


  





}
