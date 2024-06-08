import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../../core/service/auth/authservice.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image-add-main-page',
  templateUrl: './image-add-main-page.component.html',
  styleUrl: './image-add-main-page.component.css'
})
export class ImageAddMainPageComponent {

  form: FormGroup;
  selectedFile: File | null = null;
  inputData:any

  constructor(private fb: FormBuilder, private authService: AuthserviceService,

    private ref: MatDialogRef<ImageAddMainPageComponent>
    ,@Inject(MAT_DIALOG_DATA) public data:any

  ) {
    this.form = this.fb.group({
      placeNumber: ['', [Validators.required, Validators.min(1)]],
      name: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.inputData=this.data
    console.log(this.inputData);
    
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Selected file:', this.selectedFile.name);
    }
  }

  onSubmit(): void {
    if (this.form.valid && this.selectedFile) {
      const placeNumber = this.form.get('placeNumber').value;
      const name = this.form.get('name').value;
  
      this.authService.uplodeGuidelineImage(this.selectedFile, name, placeNumber).subscribe(
        (image) => {
          console.log('Image uploaded successfully:', image);
          this.closePopup();
        },
        (error) => {
          console.error('Upload failed:', error);
        }
      );
    } else {
      console.log('Form is invalid or file is not selected');
    }
  }
  
  closePopup() {
    console.log('closePopup method called');
    if (this.ref && this.ref.close) {
      this.ref.close();
    } else {
      console.error('Popup reference is invalid or does not have a close method');
    }
  }
  


}
