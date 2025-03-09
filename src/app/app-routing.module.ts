import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './core/pages/log-in/log-in.component';
import { SignUpComponent } from './core/pages/sign-up/sign-up.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { CartComponent } from './features/pages/cart/cart.component';
import { CategoryComponent } from './features/pages/category/category.component';
import { LandingPageComponent } from './features/pages/landing-page/landing-page.component';
import { SearchResultsComponent } from './features/pages/search-results/search-results.component';
import { SingleProductViewComponent } from './features/pages/single-product-view/single-product-view.component';
import { AdminPageComponent } from './features/pages/admin-page/admin-page.component';
import { MyAccountComponent } from './features/pages/my-account/my-account.component';
import { CheckoutComponent } from './features/pages/checkout/checkout.component';
import { authGuard } from './core/guards/auth.guard';
const routes: Routes = [
  { path: 'log-in', component: LogInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '', component: LandingPageComponent },  
  { path: 'not-found', component: NotFoundComponent },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'category/:name', component: CategoryComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'product/:id', component: SingleProductViewComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: 'my-account', component: MyAccountComponent, canActivate: [authGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'not-found' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
