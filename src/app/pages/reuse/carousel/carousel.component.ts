import { Component } from '@angular/core';
import { AuthserviceService } from '../../../core/service/auth/authservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {



  
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

  shopPage() {
    if (this.service.getTokenLocalStorage()) {
      this.router.navigateByUrl('eventTicketPlace');
    } else {
      this.router.navigateByUrl('login');
    }
    this.service.gerUserDataForEventCreate().subscribe((data) => {
      console.log(data);
    });
  }



  

}
