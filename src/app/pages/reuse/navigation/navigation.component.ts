import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../../core/service/auth/authservice.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent implements OnInit {
  constructor(private service: AuthserviceService, private router: Router) {}

  roll: string;

  getUserData!:string;

  ngOnInit(): void {
    this.roll = this.service.getUserRoleLocalStorage();
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
  }

  profilePage() {
    if (this.roll !== undefined) {
      this.router.navigateByUrl('userpage');
    } else {
      this.router.navigateByUrl('login');
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
}
