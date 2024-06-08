import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../../core/service/auth/authservice.service';


export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const isValidLength = value.length >= 5;

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial && isValidLength;

    return !passwordValid ? { passwordStrength: true } : null;
  };
}


export function passwordMatchValidator(formGroup: FormGroup): ValidationErrors | null {
  const passwordControl = formGroup.get('password');
  const confirmPasswordControl = formGroup.get('confirmPassword');
  if (passwordControl && confirmPasswordControl) {
    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  otpForm!: FormGroup;

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
        password: ['', [Validators.required, passwordStrengthValidator()]],
        confirmPassword: ['', Validators.required],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{10}$')],
        ],
        email: ['', [Validators.required, Validators.email]],
      },
      {
        validators: passwordMatchValidator,
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
      });
    } else {
      Object.keys(this.signUpForm.controls).forEach(field => {
        const control = this.signUpForm.get(field);
        if (control && control.invalid && control.touched) {
          console.error(`${field} is required.`);
        }
      });
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
}
