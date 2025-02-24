import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { SalesSectionComponent } from './components/sales-section/sales-section.component';
import { SharedModule } from '../shared/shared.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HeroComponent,
    SalesSectionComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SlickCarouselModule,
    FormsModule,
  ],
  exports: [
    HeroComponent,
    SalesSectionComponent
  ]
})
export class FeaturesModule {}
