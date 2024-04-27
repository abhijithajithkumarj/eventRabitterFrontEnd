import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../../core/service/auth/authservice.service';

@Component({
  selector: 'app-set-up-event',
  templateUrl: './set-up-event.component.html',
  styleUrl: './set-up-event.component.css'
})
export class SetUpEventComponent {
  eventForm: FormGroup;
  userId:string;

  constructor(private fb: FormBuilder, private service: AuthserviceService) { }

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      eventName: ['', Validators.required],
      placeName: ['', Validators.required],
      peopleCapacityOfEvent: ['', Validators.required],
      priceOfBasieTicket: ['', Validators.required],
      priceOfDeluxeTicket: ['', Validators.required],
      priceOfPremiumTicket: ['', Validators.required],
    });


    this.userId = this.service.getUserFromLocalStorage();
  

  }

  submitForm(): void {
  this.service.saveSetUpEvent(this.userId,this.eventForm).subscribe((data)=>{
    console.log(data);
    
  })
    
   
  }


  

}
