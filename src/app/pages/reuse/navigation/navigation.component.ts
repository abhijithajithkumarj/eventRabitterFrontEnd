import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../../core/service/auth/authservice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {

  roll: string | undefined;
  userId: string | undefined;

  constructor(
    private service: AuthserviceService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.roll = this.service.getUserRoleLocalStorage();
    this.userId = this.service.getUserFromLocalStorage();
    console.log(this.roll);
  }

  navigateRolleBase() {
    if (this.roll === 'USER') {
      this.router.navigateByUrl('controller');
    } else if (this.roll === 'ADMIN') {
      this.router.navigateByUrl('adminDashboard');
    } else {
      this.router.navigateByUrl('login');
    }
    console.log(this.roll);
  }

  profilePage() {
    if (this.service.getTokenLocalStorage()) {
      this.router.navigate(['/userpage'], { queryParams: { id: this.userId } })
        .then(() => window.location.reload());
    } else {
      this.router.navigateByUrl('login')
        .then(() => window.location.reload());
    }
  }

  eventCreat() {
    if (this.service.getTokenLocalStorage()) {
      this.router.navigateByUrl('eventType');
    } else {
      this.router.navigateByUrl('login');
    }
    this.service.gerUserDataForEventCreate().subscribe((data) => {
      console.log(data);
    });
  }

  eventCard() {
    if (this.service.getTokenLocalStorage()) {
      this.router.navigateByUrl('eventTicketPlace');
    } else {
      this.router.navigateByUrl('login');
    }
    this.service.gerUserDataForEventCreate().subscribe((data) => {
      console.log(data);
    });
  }

  eventHome() {
    if (this.service.getTokenLocalStorage()) {
      this.router.navigateByUrl('home');
    } else {
      this.router.navigateByUrl('login');
    }
  }
}
