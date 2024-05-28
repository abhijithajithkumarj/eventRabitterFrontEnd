import { Component } from '@angular/core';

@Component({
  selector: 'app-image-add-main-page',
  templateUrl: './image-add-main-page.component.html',
  styleUrl: './image-add-main-page.component.css'
})
export class ImageAddMainPageComponent {

  imagefile:File

  onFileSelected(event: any){
    const file: File = event.target.files[0];
    if (file) {
        this.imagefile=file
    };
  }


}
