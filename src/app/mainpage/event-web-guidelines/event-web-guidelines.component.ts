import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageAddMainPageComponent } from '../image-add-main-page/image-add-main-page.component';

@Component({
  selector: 'app-event-web-guidelines',
  templateUrl: './event-web-guidelines.component.html',
  styleUrl: './event-web-guidelines.component.css'
})
export class EventWebGuidelinesComponent {

  constructor(
  private dialoge:MatDialog
  ){}

  imagefile: File

 

  openImagePopUp(){
    this.dialoge.open(ImageAddMainPageComponent,{
      width:"40%"
      ,height:"40%",
      panelClass: 'custom-dialog-container',
      backdropClass: 'custom-backdrop',
      disableClose: true,
    })
  }

  

}
