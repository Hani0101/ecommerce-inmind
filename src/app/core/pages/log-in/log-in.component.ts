import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../../services/authentication/authentication-service/authentication.service";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  standalone: false
})
export class LogInComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  showPassword = false;

  constructor(private fb: FormBuilder, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });

    this.loginForm.statusChanges.subscribe(status => console.log("Form Status:", status));
    if (this.loginForm.get('username')?.value && this.loginForm.get('password')?.value) {
      this.loginForm.setErrors(null);
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.isLoading = true; // Show loader
    this.authService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value).subscribe(
      (res) => {
        console.log('Login successful:', res);
        this.isLoading = false; // Hide loader
      },
      (error) => {
        console.error('Login failed:', error);
        this.isLoading = false; // Hide loader
      }
    );
  }
}