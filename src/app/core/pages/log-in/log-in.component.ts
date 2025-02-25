import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../../services/authentication/authentication-service/authentication.service";
import { HostListener } from '@angular/core';
import { SubmitButtonStyle } from "../../utils/custom-button-styles";
import { HoverButtonStyle } from "../../utils/custom-button-styles";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  standalone: false
})
export class LogInComponent implements OnInit {
  submitButtonStyle: { [key: string]: string } = SubmitButtonStyle;
  hoverButtonStyle: { [key: string]: string } = HoverButtonStyle;
  loginForm!: FormGroup;
  showPassword = false;
  isHovered = false;

  constructor(private fb: FormBuilder, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
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
    this.markFormGroupTouched(this.loginForm);

    this.authService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value).subscribe(
      (res) => {
        console.log('Login successful:', res);
      },
      (error) => {
        console.error('Login failed:', error);
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