import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../../../../core/service/auth/authservice.service';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrl: './add-list.component.css'
})
export class AddListComponent {

  
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder,private service:AuthserviceService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      category:['', Validators.required]
    });
  }
  onSubmit(): void {
    if (this.form.valid) {
      this.service.addListOfCategory(this.form.value).subscribe((response) => {
        console.log('Response:', response);
      });
    }
  }
  


}
