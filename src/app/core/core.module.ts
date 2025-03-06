import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { AppShellComponent } from './app-shell/app-shell.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/authorization/authorization-interceptor/authorization.interceptor';
import { AuthenticationService } from './services/authentication/authentication-service/authentication.service';
import { RouterModule } from '@angular/router';
import { ErrorInterceptor } from './services/authorization/error-interceptor/error.interceptor';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';import { FeaturesModule } from '../features/features.module';
import { FooterComponent } from './components/footer/footer.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppShellComponent, LogInComponent, SignUpComponent, NavbarComponent, NotFoundComponent, FooterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule, 
    FeaturesModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgxSpinnerModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'log-in', component: LogInComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'not-found', component: NotFoundComponent },
    ]),
  ],
  providers: [
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic',
      },
    },
  ],
  exports: [AppShellComponent, NavbarComponent, FooterComponent],
})
export class CoreModule {}