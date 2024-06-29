import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { __param } from 'tslib';


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
  currentUserId:string
  imagefile: File
  chatUserId:string
  test:string="https://i.pinimg.com/564x/99/22/20/992220fdca42c33d0e783a29d6dff094.jpg"



  userId!: string;
  constructor(
    private service:AuthserviceService
    ,private router:ActivatedRoute,
    private route: Router
   
  ) { }

  ngOnInit(): void {

    this.currentUserId=this.service.getUserFromLocalStorage();
    
    this.router.queryParams.subscribe((param) => {
      if (param['id'] && param['id'] !== "") {
        this.userId = param['id'];

        console.log(this.userId);
        
      } else {
        this.userId = this.service.getUserFromLocalStorage();
      }
    });
  
    this.getUserProfile();
 
  }
  

  

  getUserProfile(): void {
    this.service.getUserProfile(this.userId).subscribe(
      (data: any) => {
        this.userProfile = {
          id: data.id,
          firstName: data.firstName,
          secondName: data.secondName,
          username: data.username,
          phoneNumber: data.phoneNumber,
          bio: data.bio,
          description: data.description,
          profileVerification:data.profileVerification,
          image:data.imageUrl
          
        }; 
       this.chatUserId=data.id
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }



  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
        this.imagefile=file
    };
      this.service.profileImageSet(this.userId,this.imagefile).subscribe(
        (data)=>{
          this.route.navigate(['/userpage']).then(() => {
            window.location.reload();
          });
        }
    )

  }

  navigationChat(ids:string){
    console.log("testing");
    console.log(ids);
    
    this.route.navigate(['/chat'], { queryParams: { id: ids } });
  }


  


  





}
