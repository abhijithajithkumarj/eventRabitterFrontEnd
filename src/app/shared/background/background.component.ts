import { Component } from '@angular/core';
import { AuthserviceService } from '../../core/service/auth/authservice.service';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrl: './background.component.css'
})
export class BackgroundComponent {
  constructor(private service: AuthserviceService){}

}
