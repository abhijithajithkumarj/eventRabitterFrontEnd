import { Component } from '@angular/core';
import { AuthserviceService } from '../../core/service/auth/authservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';



declare var Razorpay: any;
@Component({
  selector: 'app-event-booking-page-cards',
  templateUrl: './event-booking-page-cards.component.html',
  styleUrl: './event-booking-page-cards.component.css'
})
export class EventBookingPageCardsComponent {
  orderForm: FormGroup;
  constructor(
    private service:AuthserviceService,
    private router:Router,
    private route: ActivatedRoute
  ){}
  
  userId:string| undefined ;
  cards:any[] ;
  eventId:string| undefined ;


  ngOnInit(): void {
    this.userId=this.service.getUserFromLocalStorage();
    this.getEventCardData();
 
  }



  getEventCardData(){
    this.service.getEventCards().subscribe((data)=>{
      this.cards=data;
      console.log(this.cards); 
    })
  }


}
