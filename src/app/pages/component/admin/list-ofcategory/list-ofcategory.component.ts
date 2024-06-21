import { Component } from '@angular/core';
import { AuthserviceService } from '../../../../core/service/auth/authservice.service';
import { ListOfCategoryDto } from '../../../../core/models/listOfCategory';

@Component({
  selector: 'app-list-ofcategory',
  templateUrl: './list-ofcategory.component.html',
  styleUrls: ['./list-ofcategory.component.css'],
})
export class ListOfcategoryComponent {
  gatherGrove: any[] = [];
  individualCategory: any[] = [];
  teamCategory: any[] = [];
  newCategoryName: string = ''; // Variable to hold the new category name

  currentPage: number = 1;
  itemsPerPage: number = 10;

  gath: boolean = false;
  indiv: boolean = false;
  team: boolean = false;

  constructor(private service: AuthserviceService) {}

  ngOnInit(): void {
    
    this.getGather()
    this.getIndividual()
    this.getTeam()
  }



  getGather(){
    this.service.getAllGatherGrove().subscribe(
      (data: any[]) => {
        this.gatherGrove = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  getIndividual(){

    this.service.getAllIndividualCategory().subscribe(
      (data: any[]) => {
        this.individualCategory = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  getTeam(){
    this.service.getAllTeamCategory().subscribe(
      (data: any[]) => {
        this.teamCategory = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  get paginatedGatherGrove(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.gatherGrove.slice(startIndex, endIndex);
  }

  get paginatedTeamCategory(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.teamCategory.slice(startIndex, endIndex);
  }

  get paginatedIndividualCategory(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.individualCategory.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  onSubmitGather(): void {
    if (!this.newCategoryName || this.newCategoryName.trim() === '') {
      alert('Category name cannot be empty.');
      return;
    }
    const sanitizedCategoryName = this.sanitizeInput(this.newCategoryName);

    const gatherData: ListOfCategoryDto = {
      category: sanitizedCategoryName,
    };
    this.service.saveGatherGroveList([gatherData]).subscribe({
      next: (result) => {
        console.log('Category saved successfully', result);
        this.newCategoryName = '';
       
       
      },
      error: (error) => {
        console.error('Error saving category', error);
        alert('Failed to save category. Please try again.');
      },
    });
  }

  onSubmitTeam(): void {
    if (!this.newCategoryName || this.newCategoryName.trim() === '') {
      alert('Category name cannot be empty.');
      return;
    }
    const sanitizedCategoryName = this.sanitizeInput(this.newCategoryName);

    const gatherData: ListOfCategoryDto = {
      category: sanitizedCategoryName,
    };
    this.service.teamCategory([gatherData]).subscribe({
      next: (result) => {
        console.log('Team saved successfully', result);
        this.newCategoryName = '';
       
        
      },
      error: (error) => {
        console.error('Error saving category', error);
        alert('Failed to save category. Please try again.');
      },
    });
  }


  onSubmitIndividual(): void {
    if (!this.newCategoryName || this.newCategoryName.trim() === '') {
      alert('Category name cannot be empty.');
      return;
    }
    const sanitizedCategoryName = this.sanitizeInput(this.newCategoryName);

    const gatherData: ListOfCategoryDto = {
      category: sanitizedCategoryName,
    };
    this.service.individualCategory([gatherData]).subscribe({
      next: (result) => {
        console.log('Team saved successfully', result);
        this.newCategoryName = '';
       
        
      },
      error: (error) => {
        console.error('Error saving category', error);
        alert('Failed to save category. Please try again.');
      },
    });
  }

  sanitizeInput(input: string): string {
    return input.replace(/[^a-zA-Z0-9\s*]|(?<!^)\*(?!$)/g, '');
  }

  setIndivAndTeamFalse() {
    this.gath = false;
    this.indiv = false;
    this.team = true;
  }

  setGatherd() {
    this.gath = true;
    this.indiv = false;
    this.team = false;
  }

  setIndi() {
    this.gath = false;
    this.indiv = true;
    this.team = false;
  }
}
