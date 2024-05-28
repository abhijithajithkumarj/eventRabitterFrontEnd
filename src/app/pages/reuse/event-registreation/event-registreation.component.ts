import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationEvent } from '../../../core/models/registrationEvent';
import { AuthserviceService } from '../../../core/service/auth/authservice.service';

@Component({
  selector: 'app-event-registreation',
  templateUrl: './event-registreation.component.html',
  styleUrl: './event-registreation.component.css'
})
export class EventRegistreationComponent {

  bannerInageFile: File
  cardImageFile: File
  ticketImageFile: File
  eventForm: FormGroup;
  setUpId: string

  autocomplete: google.maps.places.Autocomplete | undefined;

  @ViewChild('inputField')
  inputField!: ElementRef;

  @Input() Placeholder = '';

  location: any | undefined;
  locationLongitude: any | undefined;
  placeName: string | undefined;
  nameOfPlace: any | undefined;
  userId: string;
  TESINGLOOP=false;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private formBuilder: FormBuilder,
    private service:AuthserviceService
  ){}



  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.setUpId = params['cfm'];
      console.log( this.setUpId );
      
    });
    this.eventForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      placeName: ['', Validators.required],
      peopleCapacityOfEvent: ['', Validators.required],
      priceOfBasieTicket: ['', Validators.required],
      priceOfDeluxeTicket: ['', Validators.required],
      priceOfPremiumTicket: ['', Validators.required],

    });

    this.userId = this.service.getUserFromLocalStorage();
  }



  ngAfterViewInit(): void {
    if (!window.google) {
      console.error('Google Maps API not loaded');
      return;
    } 
      this.autocomplete = new google.maps.places.Autocomplete(
        this.inputField.nativeElement
      );
      this.autocomplete.addListener('place_changed', () => {
        const place = this.autocomplete?.getPlace();
        if (place && place.geometry?.location) {
          this.location = place.geometry.location.lat();
          this.locationLongitude = place.geometry.location.lng();
          this.nameOfPlace = place.name;
          console.log(this.location);
          console.log(this.locationLongitude);
        }
      });
    
  }





  bannerFileSelect(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
        this.bannerInageFile=file
    };
      
  }

  CardFileSelect(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
        this.cardImageFile=file
    };
      
  }

  ticketFileSelect(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
        this.ticketImageFile=file
    };
      
  }

  onSubmit(): void {
    const userProfileEventPlace: RegistrationEvent = {
     
      eventName: this.eventForm.value.eventName,
      placeName: this.eventForm.value.placeName,
      peopleCapacityOfEvent: this.eventForm.value.peopleCapacityOfEvent,
      priceOfDeluxeTicket: this.eventForm.value.priceOfDeluxeTicket,
      priceOfBasieTicket: this.eventForm.value.priceOfBasieTicket,
      priceOfPremiumTicket: this.eventForm.value.priceOfPremiumTicket,
      locationLatitude: this.location,
      locationLongitude: this.locationLongitude,
      eventSetup: this.setUpId
    
    };


    this.service.saveSetUpEvent(
      this.userId,
      userProfileEventPlace
      ,this.bannerInageFile,
      this.cardImageFile,


      this.ticketImageFile).subscribe((data)=>{
        
        if(data){
          this.router.navigate(['/home']);
        }
        
      })
  }








}
