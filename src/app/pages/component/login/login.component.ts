import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../../core/service/auth/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Changed styleUrl to styleUrls
})
export class LoginComponent {

  loginForm!: FormGroup;
  showLoginForm: boolean = true;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthserviceService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmitLoginForm() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          this.authService.setTokenLocalStorage(response.token);
          if (response.role === "USER") {
            this.router.navigateByUrl('home');
          } else if (response.role === "ADMIN") {
            this.router.navigateByUrl('adimdashbord');
          }
        },
        (error) => {
          console.error(error);
          this.errorMessage = 'Invalid username or password. Please try again.'; // Display error message
        }
      );
    }
  }

  toggleForm() {
    this.showLoginForm = !this.showLoginForm;
  }

}
