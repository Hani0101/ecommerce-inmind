import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppShellComponent } from '../app/core/app-shell/app-shell.component';
import { LogInComponent } from './core/pages/log-in/log-in.component';
import { SignUpComponent } from './core/pages/sign-up/sign-up.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';

const routes: Routes = [
  { path: 'log-in', component: LogInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '', component: AppShellComponent },  
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
