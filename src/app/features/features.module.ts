import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { SalesSectionComponent } from './components/sales-section/sales-section.component';
import { CategorySectionComponent } from './components/category-section/category-section.component';
import { TrendingSectionComponent } from './components/trending-section/trending-section.component';
import { SharedModule } from '../shared/shared.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FormsModule } from '@angular/forms';


import { CartService } from './services/cart/cart.service';
@NgModule({
  declarations: [
    HeroComponent,
    SalesSectionComponent,
    CategorySectionComponent,
    TrendingSectionComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SlickCarouselModule,
    FormsModule,
  ],
  exports: [
    HeroComponent,
    SalesSectionComponent,
    CategorySectionComponent,
    TrendingSectionComponent
  ],
  providers: [CartService]
})
export class FeaturesModule {}
