import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { AppShellComponent } from './app-shell/app-shell.component';
import { FeaturesModule } from '../features/features.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [AppShellComponent,NavbarComponent, ], 
  imports: [CommonModule,
    ReactiveFormsModule,
    FeaturesModule,
    SharedModule,
    MatFormFieldModule,  
    MatInputModule,     
    MatIconModule,
    RouterModule.forRoot([
    ]),
  ],        
   providers: [
  ],
  exports: [AppShellComponent, NavbarComponent], 
})
export class CoreModule {}
