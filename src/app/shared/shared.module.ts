import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    ButtonComponent,
    ProductCardComponent,
    TruncatePipe,
    FooterComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ButtonComponent,
    ProductCardComponent,
    TruncatePipe,
    FooterComponent
  ]
})
export class SharedModule {}
