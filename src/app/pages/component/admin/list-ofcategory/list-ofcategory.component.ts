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


    

    this.service.getListOfCategory().subscribe(
      (data: any[]) => {
        this.listOfCategory = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );

    this.currentPage = 1;
  }

 
 


  

}
