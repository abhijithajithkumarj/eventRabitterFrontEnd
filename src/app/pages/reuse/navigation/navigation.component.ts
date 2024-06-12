import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../../core/service/auth/authservice.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent implements OnInit {


  constructor(
    private service: AuthserviceService, 
    private router: Router,
    private route:ActivatedRoute
  ) {}

  roll: string;
  userId:string

  getUserData!:string;

  ngOnInit(): void {
    this.roll = this.service.getUserRoleLocalStorage();
    this.userId=this.service.getUserFromLocalStorage();
    console.log(this.roll);
  }

  navigateRolleBase() {
    if (this.roll === 'USER') {
      this.router.navigateByUrl('controller');
    }
    else if (this.roll === 'ADMIN') {
      this.router.navigateByUrl('adimdashbord');
    } 
    else {
      this.router.navigateByUrl('login');
    }

    console.log(this.roll);
    
  }

  profilePage() {
    if (this.userId !== undefined) {
      this.router.navigate(['/userpage'], { queryParams: { id: this.userId } })
        .then(() => {
          window.location.reload();
        });
    } else {
      this.router.navigateByUrl('login')
        .then(() => {
          window.location.reload();
        });
    }
  }

  eventCreat() {
    if (this.roll !== undefined) {
      this.router.navigateByUrl('eventType');
    } else {
      this.router.navigateByUrl('login');
    }
     this.service.gerUserDataForEventCreate().subscribe((data)=>{
      this.getUserData=data;
      console.log(this.getUserData);
     })
  }


  eventCard() {
    this.router.navigateByUrl('eventTicketPlace');
    }



    eventHome() {
      if (this.roll !== undefined) {
        this.router.navigateByUrl('home');
      } else {
        this.router.navigateByUrl('login');
      }
      }
}
