import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ImageAddMainPageComponent } from '../image-add-main-page/image-add-main-page.component';
import { AuthserviceService } from '../../core/service/auth/authservice.service';

@Component({
  selector: 'app-event-web-guidelines',
  templateUrl: './event-web-guidelines.component.html',
  styleUrl: './event-web-guidelines.component.css'
})
export class EventWebGuidelinesComponent implements OnInit {

  constructor(
  private dialoge:MatDialog
  ,private service:AuthserviceService
 
  ){}

  imagefile:any[];

  ngOnInit(): void {
    this.getImageData()
  }

 

  openImagePopUp(){

    this.dialoge.open(ImageAddMainPageComponent,{
      width:"40%"
      ,height:"40%",
      data:"testImage"

    })
 
  }
 

  getImageData() {
    this.service.getGuidelineImage().subscribe((data) => {
      this.imagefile = data.sort((a, b) => a.placeNumber - b.placeNumber);
      console.log(this.imagefile);
    });
  }
  trackByPlaceNumber(index: number, img: any): number {
    return img.placeNumber;
  }
  



  

}
