import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../../services/authentication/authentication-service/authentication.service";
import { CustomValidators } from "../../utils/custom-validators";
import { ISignUpResponse } from "../../models/signup-response";
import { HostListener } from '@angular/core';
import { SubmitButtonStyle } from "../../utils/custom-button-styles";
import { HoverButtonStyle } from "../../utils/custom-button-styles";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: false
})
export class SignUpComponent implements OnInit {
  submitButtonStyle: { [key: string]: string } = SubmitButtonStyle;
  hoverButtonStyle: { [key: string]: string } = HoverButtonStyle;
  signupForm!: FormGroup;
  showPassword = false;
  isHovered = false;

  constructor(private fb: FormBuilder, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ["", [Validators.required]], 
      lastName: ["", [Validators.required]], 
      age: ["", [Validators.required, Validators.min(1)]], 
      username: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      confirmPassword: ["", [Validators.required]]
    }, { validators: CustomValidators.passwordMatchValidator });
  }


  @HostListener('mouseenter')
  onMouseEnter() {
    this.isHovered = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isHovered = false;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    //Checks which fields are invalid
    this.markFormGroupTouched(this.signupForm);

    if (this.signupForm.invalid) {
      console.log('Form is invalid. Please fill in all required fields.');
      return;
    }

    const { firstName, lastName, age, username, email, password } = this.signupForm.value;

    this.authService.signUp(firstName, lastName, age, username, email, password).subscribe(
      (res: ISignUpResponse) => {
        console.log('Signup successful:', res);
      },
      (error: any) => {
        console.error('Signup failed:', error);
      }
    );
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}