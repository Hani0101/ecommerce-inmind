import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { SalesSectionComponent } from './components/sales-section/sales-section.component';
import { CategorySectionComponent } from './components/category-section/category-section.component';
import { TrendingSectionComponent } from './components/trending-section/trending-section.component';
import { SharedModule } from '../shared/shared.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CartComponent } from './pages/cart/cart.component';
import { CartService } from './services/cart/cart.service';
import { CategoryComponent } from './pages/category/category.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';  
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
@NgModule({
  declarations: [
    HeroComponent,
    SalesSectionComponent,
    CategorySectionComponent,
    TrendingSectionComponent,
    CartComponent,
    CategoryComponent,
    LandingPageComponent,
    SearchResultsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SlickCarouselModule,
    FormsModule,
    MatIconModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxSpinnerModule,
  ],
  exports: [
    HeroComponent,
    SalesSectionComponent,
    CategorySectionComponent,
    TrendingSectionComponent,
    CartComponent,
    CategoryComponent,
    LandingPageComponent,
    SearchResultsComponent
  ],
  providers: [CartService]
})
export class FeaturesModule {}
