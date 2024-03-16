import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../../core/service/auth/authservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signUpForm!: FormGroup;
  otpForm!:FormGroup;
  otp: string = '';
  email: string = '';
  showOtpForm: boolean = false;


  constructor(
    private fb: FormBuilder,
    private service: AuthserviceService,
    private router: Router
  ) {}

  
  ngOnInit(): void {
    this.signUpForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required ],
        confirmPassword: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );


    this.otpForm = this.fb.group({
      otp: ['', Validators.required],
    });

  }

  onSubmitSignUpForm(): void {
    console.log(this.signUpForm.value, 'test');
    if (this.signUpForm.valid) {
      this.service.register(this.signUpForm.value).subscribe((response) => {
          console.log('Response from backend:', response);
          if (response && response.otp && response.email) {
            this.otp = response.otp;
            this.email = response.email;
            this.showOtpForm = true;
          } else {
            console.error('Received invalid response from backend');
          }
        },
    
      );
    } else {
      console.error('Form is invalid. Cannot submit.');
    }
  }


  onSubmitOtpForm(): void {
    if (this.otpForm.valid) {
      const otpVerificationData = {
        userEmail: this.signUpForm.value.email,
        otp: this.otpForm.value.otp,
      };
  
      this.service.otpVerification(otpVerificationData).subscribe(
        (result: boolean) => {
          console.log('OTP verification result:', result);
          if (result) {
            console.log('OTP verification successful.');
            this.router.navigateByUrl('login'); 
          } else {
            console.error('OTP verification failed.');
          }
        },
        (error) => {
          console.error('Error occurred during OTP verification:', error);
         
        }
      );
    } else {
      console.error('OTP form is invalid.');
      
    }
  }
  



  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');
    if (passwordControl && confirmPasswordControl) {
      const password = passwordControl.value;
      const confirmPassword = confirmPasswordControl.value;
      return password === confirmPassword ? null : { passwordMismatch: true };
    }
    return null;
  }
}
