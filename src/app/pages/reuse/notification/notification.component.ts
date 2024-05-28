import { Component } from '@angular/core';
import { AuthserviceService } from '../../../core/service/auth/authservice.service';
import { NotificationReaction } from '../../../core/models/notificationReplay';
import { ActivatedRoute, Router, Routes } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {


  notification:any[]=[];
  userId!: string;
  constructor(
    private service:AuthserviceService ,
    private router: Router,
    private route:ActivatedRoute

  ) { }


  ngOnInit(): void {
    this.userId=this.service.getUserFromLocalStorage();
    this.getNotifications();
  }


  
  rejectEvent(ids:string){
    console.log(ids);
    const notificationType="EVENT_REJECTED"
    const notification:NotificationReaction={
      id:ids,
      notificationType:notificationType
    }
    this.service.eventNotificationReaction(notification).subscribe((data)=>{
      this.router.navigate(['/notification']).then(() => {
        window.location.reload();
      });
    })

  }

  conformVerification(ids:string){
    console.log(ids);
    const notificationType="EVENT_CONFORM"
    const notification:NotificationReaction={
      id:ids,
      notificationType:notificationType
    }
    this.service.eventNotificationReaction(notification).subscribe((data)=>{
      this.router.navigate(['/notification']).then(() => {
        window.location.reload();
      });
    })

  }


  getNotifications(): void {
    this.service.getNotifications(this.userId).subscribe((data) => {
      this.notification = data; 
      console.log(this.notification);
      
    });
  }

  profilePage(ids: string){
    this.router.navigate(['/userpage'], { queryParams: { id: ids } });
  }
  


}
