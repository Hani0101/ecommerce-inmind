import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../../services/authentication/authentication-service/authentication.service";
import { Router } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  standalone: false
})
export class LogInComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  loginFailed = false; 

  constructor(private ngxspinner: NgxSpinnerService,private fb: FormBuilder, private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.ngxspinner.show()
    this.markFormGroupTouched(this.loginForm);
    this.authService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value).subscribe(
      (res) => {
        console.log('Login successful:', res);
        this.ngxspinner.hide()
      },
      (error) => {
        this.loginFailed = true;
        this.ngxspinner.hide()
        console.error('Login failed:', error);
      }
    );
  }

  navigateToHome(){
    this.router.navigate(['']); 
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