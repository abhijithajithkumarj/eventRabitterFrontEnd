import { Component } from '@angular/core';
import { AuthserviceService } from '../../../core/service/auth/authservice.service';
import { ActivatedRoute, Routes } from '@angular/router';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css',
})
export class TicketListComponent {
  currentUserId: string;
  tickets:any[];


  constructor(
    private service: AuthserviceService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.service.getUserFromLocalStorage();
    this.getTicketList(this.currentUserId);
  }

  getTicketList(userId: string) {
    this.service.listOfTickets(userId).subscribe((tickets) => {
      this.tickets=tickets;
      console.log(this.tickets);
    });
  }

  deleteTicket(ticketId: number): void {
   
  }

  

}
