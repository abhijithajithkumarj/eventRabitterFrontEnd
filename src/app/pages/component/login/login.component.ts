import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthserviceService } from '../../../core/service/auth/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;

  showLoginForm: boolean = true;

  
 
  constructor(
    private fb: FormBuilder 
    , private router:Router, 
    private service:AuthserviceService,
    
  
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

   
  }

  onSubmitLoginForm() {

    console.log(this.loginForm.value,+"---------------------------------------------------");
    
    if (this.loginForm.valid) {
      this.service.login(this.loginForm.value).subscribe(
        (response) => {
          this.service.setTokenLocalStorage(response.token)
        
          if(response.role==="USER"){
            this.router.navigateByUrl('home')
          }
          
          if(response.role==="ADMIN"){
            this.router.navigateByUrl('adimdashbord')
          }
          
         
          console.log(response);
        },
        (error) => {
          console.error(error);
          
        }
      );
    }
  }
  

  







  toggleForm() {
    this.showLoginForm = !this.showLoginForm;
  }

}
