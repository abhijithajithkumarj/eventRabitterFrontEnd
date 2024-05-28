import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthserviceService } from '../../core/service/auth/authservice.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-event-ticket',
  templateUrl: './event-ticket.component.html',
  styleUrl: './event-ticket.component.css',
})
export class EventTicketComponent {
  constructor(
    private route: ActivatedRoute,
    private service:AuthserviceService
  ) {}


  ticket:any
  bookId:string 

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['bookId'] != null && params['bookId']) {
        this.bookId = params['bookId'];
        this.getEventTicket(this.bookId)
      }
     
    });
  }
  
  downloadPDF(): void {
    const data = document.getElementById('ticket-container');
    if (data) {
      html2canvas(data).then(async (canvas) => {
        const imgWidth = 208;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const heightLeft = imgHeight;
  
     
        const img = new Image();
        img.src = canvas.toDataURL('ticket?.setUpTheEvent?.publicEventImage?.imageUrl');
  
        await new Promise<void>(resolve => {
          img.onload = () => {
            resolve();
          };
        });
  
        const pdf = new jsPDF('p', 'mm', 'a4');
        const position = 0;
        pdf.addImage(img.src, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('ticket.pdf');
      });
    }
  }
  

  getEventTicket(eventId: string){
    this.service.getTicket(this.bookId).subscribe((ticketData) => {
      this.ticket = ticketData;
    })
  }


  


}
