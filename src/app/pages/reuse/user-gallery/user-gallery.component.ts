import { Component } from '@angular/core';
import { AuthserviceService } from '../../../core/service/auth/authservice.service';
import { TeamProfileEventPlace } from '../../../core/models/teamProfileEventPlace';

@Component({
  selector: 'app-user-gallery',
  templateUrl: './user-gallery.component.html',
  styleUrl: './user-gallery.component.css'
})
export class UserGalleryComponent {

  userId:string;
  imageUrl: string | ArrayBuffer | null = null; 

  image:File;

  constructor(private service:AuthserviceService){}

  onFileSelected(event: any): void {
    const file = event.target.files[0]; 
    if (file) {
      const reader = new FileReader(); 
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result; 
        this.image=file;  
      };
    }
  }
  ngOnInit(): void {
    this.userId = this.service.getUserFromLocalStorage();
  }

  onSubmitEventPlace():void{
    const userProfileEventPlace: TeamProfileEventPlace={
      bio: "abhijing",
      description: "test description",
      listOfCategoryId: "category",
      seatNumber:1234,
      location: 222222,
      locationLongitude:222222,
      nameOfPlace: "tmp",
    }
    this.service.addPlaceLocation(userProfileEventPlace,this.image).subscribe
    ((result)=>{
      console.log(result);
      
    })

  }






}
