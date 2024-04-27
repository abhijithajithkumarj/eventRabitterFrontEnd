import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthserviceService } from '../../../core/service/auth/authservice.service';

@Component({
  selector: 'app-clubcard',
  templateUrl: './clubcard.component.html',
  styleUrl: './clubcard.component.css'
})
export class ClubcardComponent {

  constructor(private service:AuthserviceService){}
  professionals:any[]=[];
  id:string[]=[]
  eventCreator!:string;

  @ViewChild('startDateInput') startDateInput!: ElementRef<HTMLInputElement>;
  @ViewChild('endDateInput') endDateInput!: ElementRef<HTMLInputElement>;


  ngOnInit(): void {
   this.service.getAllProfessionals().subscribe((data)=>{
    this.professionals=data;
   },
   (error: any) => {
    console.error('Error fetching verification profiles:', error);
  })

  this.eventCreator=this.service.getUserFromLocalStorage()
    
  }

  getSelectedDates() {
    const startDate = this.startDateInput.nativeElement.value;
    const endDate = this.endDateInput.nativeElement.value;
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    console.log('userData',this.professionals);
    
  }

  AddTeam(id: string): void {
    if (!this.id.includes(id)) { 
      this.id.push(id);
    } else {
      console.log(`ID ${id} already exists in the team array.`);
    }
  }
  
  setTeam(): void {
    this.service.eventCreat(this.id,this.eventCreator).subscribe((data)=>{
      console.log(data);
      
    })
    
  }
  
  






}
