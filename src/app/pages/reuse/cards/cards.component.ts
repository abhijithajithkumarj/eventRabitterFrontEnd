import { Component } from '@angular/core';
import { AuthserviceService } from '../../../core/service/auth/authservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {

  topNine:any[]=[]
    roll: string | undefined;
  userId: string | undefined;
  


  constructor(
    private service: AuthserviceService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {

    this.service.getTopNinve().subscribe((data)=>{
      this.topNine=data
    })

    this.roll = this.service.getUserRoleLocalStorage();
    this.userId = this.service.getUserFromLocalStorage();
    console.log(this.roll);

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
