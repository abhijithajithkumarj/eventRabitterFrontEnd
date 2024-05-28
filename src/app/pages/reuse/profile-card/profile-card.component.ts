import { Component } from '@angular/core';
import { AuthserviceService } from '../../../core/service/auth/authservice.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css'
})
export class ProfileCardComponent {

  constructor(
    private service:AuthserviceService
  )
  {}

  logOut(){
    this.service.logout();
  }

}
