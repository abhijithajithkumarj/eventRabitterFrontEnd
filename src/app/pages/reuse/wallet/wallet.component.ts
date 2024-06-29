import { Component } from '@angular/core';
import { AuthserviceService } from '../../../core/service/auth/authservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent {


  eventData: any[] = [];
  currentUserId: string;
  balance: number ;

  constructor(
    private service: AuthserviceService,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.service.getUserFromLocalStorage();

    this.service.getReportData(this.currentUserId).subscribe((data) => {
      this.eventData = data;
      console.log(this.eventData);

     
      if (this.eventData && Array.isArray(this.eventData)) {
        this.balance = this.eventData.reduce((sum, event) => {
          const amount = parseFloat(event.amountOfTicket) || 0;
          return sum + amount;
        }, 0);
      }

      
    });
  }

  addFunds() {
    // Implement add funds logic here
  }

  withdrawFunds() {
    // Implement withdraw funds logic here
  }


}
