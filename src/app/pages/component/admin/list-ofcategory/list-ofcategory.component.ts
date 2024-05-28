import { Component } from '@angular/core';
import { AuthserviceService } from '../../../../core/service/auth/authservice.service';


@Component({
  selector: 'app-list-ofcategory',
  templateUrl: './list-ofcategory.component.html',
  styleUrls: ['./list-ofcategory.component.css']
})
export class ListOfcategoryComponent {
  listOfCategory: any[] = [];
  pageSize: number = 10; 
  currentPage: number=1;


  constructor(private service: AuthserviceService) {}

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


  pageChanged(event: any): void {
      this.currentPage = event.page;
  }
  

  toggleEdit(category: any): void {
   
  }

  deleteCategory(category: any): void {
   
  }
}
