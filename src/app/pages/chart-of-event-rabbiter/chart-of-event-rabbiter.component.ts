import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthserviceService } from '../../core/service/auth/authservice.service';

@Component({
  selector: 'app-chart-of-event-rabbiter',
  templateUrl: './chart-of-event-rabbiter.component.html',
  styleUrls: ['./chart-of-event-rabbiter.component.css']
})
export class ChartOfEventRabbiterComponent implements OnInit {



  basicData: any;
  basicOptions: any;
  data: any;
  currentUserId:string
  eventData:any[]=[]
  selectedEvent: string | undefined;


  constructor(
    private service:AuthserviceService
    ,private router:ActivatedRoute,
    private route: Router
  ){}

  options: any;
  @HostBinding('class') themeClass = 'light-theme'; 


  ngOnInit() {
    this.maps()
    this.currentUserId=this.service.getUserFromLocalStorage();

    this.service.getAllEventsReport(this.currentUserId).subscribe((data)=>{
     this.eventData = data;
     console.log(this.eventData);
    })
    
  }


  onEventChange(event: any): void {
    this.selectedEvent = event.target.value;
    console.log('Selected Event ID:', this.selectedEvent);
    this.onSubmit();
  }
  onSubmit(): void {
    console.log('Selected Event:', this.selectedEvent);
    
  }


 


  toggleTheme() {
    this.themeClass = this.themeClass === 'light-theme' ? 'dark-theme' : 'light-theme';
  }






  maps(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicData = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Sales',
          data: [540, 325, 702, 620],
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    };
    

    this.basicOptions = {
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
    this.data = {
        datasets: [
            {
                data: [11, 16, 7, 3, 14],
                backgroundColor: [
                    documentStyle.getPropertyValue('--red-500'),
                    documentStyle.getPropertyValue('--green-500'),
                    documentStyle.getPropertyValue('--yellow-500'),
                    documentStyle.getPropertyValue('--bluegray-500'),
                    documentStyle.getPropertyValue('--blue-500')
                ],
                label: 'My dataset'
            }
        ],
        labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue']
    };
    
    this.options = {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            r: {
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };


  }
}
