import { Component } from '@angular/core';
import { AuthserviceService } from '../../../../core/service/auth/authservice.service';

@Component({
  selector: 'app-admin-dashbord',
  templateUrl: './admin-dashbord.component.html',
  styleUrl: './admin-dashbord.component.css'
})
export class AdminDashbordComponent {

  constructor(private service:AuthserviceService){}

  logOut(){
    this.service.logout();
  }

}
