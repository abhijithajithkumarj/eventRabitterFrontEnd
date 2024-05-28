import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthserviceService } from '../../../core/service/auth/authservice.service';
import { DateOfEvent } from '../../../core/models/dataOfEvent';

@Component({
  selector: 'app-clubcard',
  templateUrl: './clubcard.component.html',
  styleUrl: './clubcard.component.css',
})
export class ClubcardComponent {
  constructor(private service: AuthserviceService) {}
  professionals: any[] = [];
  showData: any[] = [];
  id: string[] = [];
  eventCreator!: string;
  userId:string;
  searchTerm: string = '';
  selectedDate: Date;
  filteredProfessionals: any[] = [];

  add=false;




  ngOnInit(): void {
    this.userId=this.service.getUserFromLocalStorage();
    this.service.getAllProfessionals().subscribe(data => {
      console.log(data);
      
      this.professionals = data;
      this.filterProfessionals();
    });

   
    

    this.eventCreator = this.service.getUserFromLocalStorage();
  }

  AddTeam(person: any, id: string): void {
    if(this.selectedDate!=null) {
      if (!this.id.includes(id)) {
        this.id.push(id);
        this.showData.push(person);
        const date: DateOfEvent={
          localDate: this.selectedDate
        }
      } else {
        console.log(`ID ${id} already exists in the team array.`);
      }
    }
   
  }

  removeTeam(team: any): void {
    const index = this.showData.indexOf(team);
    const indexOfUser = this.id.indexOf(team.id);
    if (index !== -1) {
      this.showData.splice(index, 1);
      this.id.splice(indexOfUser, 1);
      console.log(this.showData, this.id);
      const person = this.professionals.find((person) => person.id === team.id);
      if (person) {
        person.added = false;
      }
    }
  }

  setTeam(): void {
    this.service.eventCreat(this.id, this.eventCreator).subscribe((data) => {
      console.log(data);
    });
  }

  updateDate(event: any) {
    this.selectedDate = event.target.value;
  }

  filterProfessionals(): void {
    const searchTermLower = this.searchTerm.toLowerCase();

    this.filteredProfessionals = this.professionals.filter(person => 
      (person.gatherGrove && person.gatherGrove.gatherGroveName.toLowerCase().includes(searchTermLower)) ||
      (person.individualCategory && person.individualCategory.individualCategoryName.toLowerCase().includes(searchTermLower)) ||
      (person.teamCategory && person.teamCategory.teamCategoryName.toLowerCase().includes(searchTermLower))
    );
  }
 
  
}
