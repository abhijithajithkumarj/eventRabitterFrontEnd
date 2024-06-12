import { Component } from '@angular/core';
import { AuthserviceService } from '../../../../core/service/auth/authservice.service';
import { MatDialog } from '@angular/material/dialog';
import { AddListComponent } from '../add-list/add-list.component';


@Component({
  selector: 'app-list-ofcategory',
  templateUrl: './list-ofcategory.component.html',
  styleUrls: ['./list-ofcategory.component.css']
})
export class ListOfcategoryComponent {
  listOfCategory: any[] = [];
  pageSize: number = 10; 
  currentPage: number=1;


  gatherGrove:any [] = [];
  individualCategory:any [] = [];
  teamCategory:any [] = [];

  gath:boolean = false;
  indiv:boolean = false;
  team:boolean = false;
  


  constructor(private service: AuthserviceService
   
  ) {}

  ngOnInit(): void {

    this.service.getAllGatherGrove().subscribe(
      (data: any[]) => {
        this.listOfCategory = data;
        console.log(this.listOfCategory);
        
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );

    this.service.getAllGatherGrove().subscribe(
      (data: any[]) => {
        this.listOfCategory = data;
        console.log(this.listOfCategory);
        
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );

       this.service.getAllGatherGrove().subscribe(
      (data: any[]) => {
        this.listOfCategory = data;
        console.log(this.listOfCategory);
        
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );

   

    this.currentPage = 1;
  }

  setIndivAndTeamFalse() {
    this.gath=false;
    this.indiv = false;
    this.team = true;
  }
  setGatherd(){
    this.gath=true;
    this.indiv = false;
    this.team = false;
  }

  setIndi(){
    this.gath=false;
    this.indiv = true;
    this.team = false;
  }

 
 


  

}
