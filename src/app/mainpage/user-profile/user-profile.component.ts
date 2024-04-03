import { Component } from '@angular/core';
import { UserProfile } from '../../core/models/userProfile';
import { AuthserviceService } from '../../core/service/auth/authservice.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  userProfile: UserProfile | null = null;


  userId!: string;
  constructor(private service:AuthserviceService) { }

  ngOnInit(): void {
    this.userId=this.service.getUserFromLocalStorage();
    this.getUserProfile();  
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


}
