import { Component } from '@angular/core';
import { AuthserviceService } from '../../core/service/auth/authservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { TicketBooking } from '../../core/models/ticketBooking';
import { RouterTestingHarness } from '@angular/router/testing';

declare var Razorpay: any;

@Component({
  selector: 'app-ticket-buying',
  templateUrl: './ticket-buying.component.html',
  styleUrl: './ticket-buying.component.css'
})
export class TicketBuyingComponent {
 
  orderForm: FormGroup;
  constructor(
    private service:AuthserviceService,
    private router:Router,
    private route: ActivatedRoute
  ){}
  nodes!: any[];
  userId:string| undefined ;
  eventBookingData: any ;
  eventId: string|undefined ;
  selectedNodes: any;
  price:any|undefined ;
  numberOfPeople:number|any ;
  selectedOption :string
  eventSetUptid :string|undefined ;



  ngOnInit(): void {
    this.userId = this.service.getUserFromLocalStorage();
    console.log(this.userId+"userId");
    
    this.route.queryParams.subscribe((data)=>{
      this.eventId=data['id']
      this.eventSetUptid=data['eventId']
    })
    this.getEventDetils(this.eventId)
  }
  


  getEventDetils(eventId: string){
    this.service.getEventForBooking(eventId).subscribe((data)=>{
      this.eventBookingData=data;
      console.log(this.eventBookingData);
      
      if (this.eventBookingData) {
        this.price = this.eventBookingData.priceOfBasieTicket;
        console.log(this.price);   
      } else {
        this.price = undefined;
      }
    });
  }


  handleCheckboxClick(option: string) {
    this.selectedOption=option;
  }

  ngAfterViewInit(): void {
    this.ngInputChange();
  }

  ngInputChange() {
    if(this.selectedOption==="PRO"){
      this.price = this.eventBookingData.priceOfPremiumTicket * (this.numberOfPeople || 0);
    }
    
    if (this.selectedOption==="BAS") {
      this.price = this.eventBookingData.priceOfBasieTicket * (this.numberOfPeople || 0);
    } 

    if (this.selectedOption==="LUX") {
      this.price = this.eventBookingData.priceOfDeluxeTicket * (this.numberOfPeople || 0);
    } 
  
  }
  
  payment(){
    this.testTransaction(this.price)
  }



  

  testTransaction(price: number) {
    if (price) {
      this.service.createTracsaction(price).subscribe(
        (response) => {
          console.log(response);
          this.openTransactionModal(response);
        },
        (error) => {
          console.error('Error creating transaction:', error);
        }
      );
    } else {
    
    }
  }

  openTransactionModal(response: any) {
    const options = {
      order_id: response.paymentId,
      key: response.key,
      amount: response.amountOfTicket,
      currency: response.currency,
      name: 'EVENT PAYMENT',
      description: 'EVENT RABBITER PAYMENT',
      handler: (response: any) => {
        console.log('Payment response:', response);
        if(response !=null && response.razorpay_order_id != null){
          this.savePaymentingData(response)
        }
      },
      prefill: {
        name: 'ABHIJITH',
        email: 'aabhivishnu@gmail.com',
        contact: '9605067411'
      },
      notes: {
        address: 'EVENT RABBITER'
      },
      theme: {
        color: '#2DE200'
      }
    };
    const razorpay = new Razorpay(options);
    razorpay.open();

    this.processResponse(razorpay.response);

    
  }

  processResponse(response: any) {
  const save=response
  console.log(save+"---------------");


  }

  savePaymentingData(response:any){
  
    const paymentData:TicketBooking={
      ticketBookingUser:this.userId,
      numberOfTickets:this.numberOfPeople,
      amountOfTicket:this.price,
      paymentId:response.razorpay_order_id,
      currency:"INR",
      key:response.razorpay_signature,
      setUpTheEvent:this.eventId,
      eventSetup:this.eventSetUptid   
    }
    console.log(paymentData.ticketBookingUser+'---------------1');
    


    this.service.paymentDetails(paymentData).subscribe((data) => {
      this.router.navigate(['/eventTicket'], { queryParams: { bookingId:data.id } });
    })

  }



}
