import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthserviceService } from '../../../core/service/auth/authservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSharingServiceService } from '../../../core/service/dataShare/data-sharing-service.service';
import { UserId } from '../../../core/models/userIds';
import { NotificationStatus } from '../../../core/models/notification';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-create-details',
  templateUrl: './event-create-details.component.html',
  styleUrl: './event-create-details.component.css'
})
export class EventCreateDetailsComponent {

  
  userId!: string;
  evantData:any[]= [];
  profilesData: string[] = [];
  receivedData: any;
  currentImageUrl: string;
  eventSetUpId: string;
  conformation:boolean
  alreadyCreated: boolean = false;


  





  constructor(
    private fb: FormBuilder,
    private service: AuthserviceService,
    private router:Router,
    private route:ActivatedRoute,
    private dataSharingService: DataSharingServiceService
  ) { 
  
  }


  ngOnInit(): void {
   
    const givenData=this.dataSharingService.shareData;

    if (givenData) {
           givenData.forEach((entry: any) => { 
            if (entry.eventPerformers.id) {
                this.profilesData.push(entry.eventPerformers.id);
            }
            if ( entry.eventSetup.id) {
                this.eventSetUpId = entry.eventSetup.id; 
            }
        });
    } else {
        console.error("Invalid data structure in this.givenData:", givenData);
    }

    this.test(this.profilesData)
    this.getConformationEvent(this.eventSetUpId)
    

  }
  
  

  
  
 
  
  
  
  
  



  test(userIds: string[]) {
    
    
    const profiles: UserId = { id: userIds };

    this.service.getListOfUsers(profiles).subscribe((data: any[]) => {
      if (data && data.length > 1) {
        this.evantData = data;
        this.currentImageUrl = this.evantData[0].imageUrl; 
        let currentIndex = 1;
        setInterval(() => {
          this.currentImageUrl = this.evantData[currentIndex].imageUrl; 
          currentIndex = (currentIndex + 1) % this.evantData.length;
        }, 5000);
      } else {
        this.router.navigate(['/EventSetUp']);
      }
    }, (error) => {
      console.error('Error fetching data:', error);
    });
  }
  

  getConformationEvent(userId: string): void {  
   

    const notificationStats: NotificationStatus = { id: userId };
    
    this.service.getConformationEvent(notificationStats).subscribe(
      (data) => {
        data.forEach((userConform: any) => {
          console.log(userConform.notificationType);
          if (userConform.notificationType==="EVENT_CONFORM") {
            this.conformation=true;
          }else{
            this.conformation=false;
          }
        });
        
      },
      (error) => {
        console.error('Error occurred:', error);
      }
    );

    this.service.getIsEventCreated(userId).subscribe((result)=>{
      if(result===false) {
        this.alreadyCreated=true;
      }
    })



  }
  


  




}
