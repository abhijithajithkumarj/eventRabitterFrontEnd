import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-event-type',
  templateUrl: './event-type.component.html',
  styleUrl: './event-type.component.css'
})
export class EventTypeComponent {

  constructor(private router:Router){}



  privateEvent(){

  }

  publicEvent(){
    this.router.navigateByUrl('clubcard')
    
  }

}
