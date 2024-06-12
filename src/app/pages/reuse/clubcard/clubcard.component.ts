import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthserviceService } from '../../../core/service/auth/authservice.service';
import { DateOfEvent } from '../../../core/models/dataOfEvent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clubcard',
  templateUrl: './clubcard.component.html',
  styleUrl: './clubcard.component.css',
})
export class ClubcardComponent {

  professionals: any[] = [];
  showData: any[] = [];
  id: string[] = [];
  eventCreator!: string;
  userId:string;
  searchTerm: string = '';
  selectedDate: Date;
  filteredProfessionals: any[] = [];
  minDate: string;

  add=false;
    constructor(
      private service: AuthserviceService
      ,private router: Router
    
    ) {
    this.minDate = this.calculateMinDate();
  }




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
    
    this.service.eventCreat(this.id,this.eventCreator,this.selectedDate).subscribe((data) => {
      this.router.navigate(['/EventSetUp']);
    });
  }

  updateProfectional() {
    const date:DateOfEvent={
      localDate: this.selectedDate
    }
    this.service.getUserSpecificDate(date).subscribe((data) => {
      this.filteredProfessionals = data;
      console.log(data);
      
    })
  }

  onDateChange(): void {
    if (this.selectedDate) {
      this.updateProfectional();
    }
  }

  filterProfessionals(): void {
    const searchTermLower = this.searchTerm.toLowerCase();

    this.filteredProfessionals = this.professionals.filter(person => 
      (person.gatherGrove && person.gatherGrove.gatherGroveName.toLowerCase().includes(searchTermLower)) ||
      (person.individualCategory && person.individualCategory.individualCategoryName.toLowerCase().includes(searchTermLower)) ||
      (person.teamCategory && person.teamCategory.teamCategoryName.toLowerCase().includes(searchTermLower))
    );
  }

  calculateMinDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    let month = (today.getMonth() + 1).toString();
    let day = today.getDate().toString();
    month = month.length === 1 ? '0' + month : month;
    day = day.length === 1 ? '0' + day : day;

    return `${year}-${month}-${day}`;
  }
 
  
}
