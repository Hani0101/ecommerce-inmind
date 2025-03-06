import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './core/pages/log-in/log-in.component';
import { SignUpComponent } from './core/pages/sign-up/sign-up.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { CartComponent } from './features/pages/cart/cart.component';
import { CategoryComponent } from './features/pages/category/category.component';
import { LandingPageComponent } from './features/pages/landing-page/landing-page.component';
import { SearchResultsComponent } from './features/pages/search-results/search-results.component';
const routes: Routes = [
  { path: 'log-in', component: LogInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '', component: LandingPageComponent },  
  { path: 'not-found', component: NotFoundComponent },
  { path: 'cart', component: CartComponent },
  { path: 'category/:name', component: CategoryComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: '**', redirectTo: '/not-found' }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
