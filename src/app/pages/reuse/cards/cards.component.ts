import { Component } from '@angular/core';
import { AuthserviceService } from '../../../core/service/auth/authservice.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {

  topNine:any[]=[]
  
  constructor(private service:AuthserviceService){}


  ngOnInit(): void {

    this.service.getTopNinve().subscribe((data)=>{
      this.topNine=data
    })

  }

}
