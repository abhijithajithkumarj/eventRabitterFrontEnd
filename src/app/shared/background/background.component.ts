import { Component } from '@angular/core';
import { AuthserviceService } from '../../core/service/auth/authservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSharingServiceService } from '../../core/service/dataShare/data-sharing-service.service';
import { UserId } from '../../core/models/userIds';

declare var Razorpay: any;

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent {
  // orderForm: FormGroup;
  // eventDataMap: Map<number, any[]> = new Map();


    
  
















































  // testTransaction(form: FormGroup) {
  //   if (form.valid) {
  //     this.ticketBookingService.createTracsaction(form.value.amount).subscribe(
  //       (response) => {
  //         console.log(response);
  //         this.openTransactionModal(response);
  //       },
  //       (error) => {
  //         console.error('Error creating transaction:', error);
  //       }
  //     );
  //   } else {
    
  //   }
  // }

  // openTransactionModal(response: any) {
  //   const options = {
  //     order_id: response.paymentId,
  //     key: response.key,
  //     amount: response.amountOfTicket,
  //     currency: response.currency,
  //     name: 'EVENT PAYMENT',
  //     description: 'EVENT RABBITER PAYMENT',
  //     handler: (response: any) => {
    
  //       console.log('Payment response:', response);
  //     },
  //     prefill: {
  //       name: 'ABHIJITH',
  //       email: 'aabhivishnu@gmail.com',
  //       contact: '9605067411'
  //     },
  //     notes: {
  //       address: 'EVENT RABBITER'
  //     },
  //     theme: {
  //       color: '#2DE200'
  //     }
  //   };
  //   const razorpay = new Razorpay(options);
  //   razorpay.open();
  // }

  // processResponse(response: any) {
  //   console.log(response);
  // }
}
