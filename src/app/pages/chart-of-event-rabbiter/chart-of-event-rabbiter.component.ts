import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthserviceService } from '../../core/service/auth/authservice.service';

@Component({
  selector: 'app-chart-of-event-rabbiter',
  templateUrl: './chart-of-event-rabbiter.component.html',
  styleUrls: ['./chart-of-event-rabbiter.component.css']
})
export class ChartOfEventRabbiterComponent implements OnInit {
  chartData: any;
  chartOptions: any;
  currentUserId: string;
  eventData: any[] = [];
  ticketData: any[] = [];
  selectedEvent: string | undefined;
  @HostBinding('class') themeClass = 'light-theme';

  constructor(
    private service: AuthserviceService,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit() {
    this.currentUserId = this.service.getUserFromLocalStorage();

    this.service.getAllEventsReport(this.currentUserId).subscribe((data) => {
      this.eventData = data;
      console.log(this.eventData);
    });

    this.service.getReportData(this.currentUserId).subscribe((data) => {
      this.ticketData = data;
      console.log(this.ticketData);
    });

    this.initializeChart();
  }

  onEventChange(event: any): void {
    this.selectedEvent = event.target.value;
    console.log('Selected Event ID:', this.selectedEvent);
    this.updateChart();
  }

  updateChart(): void {
    if (this.selectedEvent) {
      const filteredTickets = this.ticketData.filter(ticket => ticket.eventSetup.id === this.selectedEvent);
      const ticketAmounts = filteredTickets.map(ticket => parseFloat(ticket.amountOfTicket) || 0);

      this.chartData = {
        labels: ticketAmounts.map((_, index) => `Ticket ${index + 1}`),
        datasets: [
          {
            label: 'Amount of Tickets',
            data: ticketAmounts,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      };
    }
  }

  initializeChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  toggleTheme() {
    this.themeClass = this.themeClass === 'light-theme' ? 'dark-theme' : 'light-theme';
  }
}
