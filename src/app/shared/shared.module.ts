import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { TruncatePipe } from './pipes/truncate.pipe';
@NgModule({
  declarations: [
    ButtonComponent,
    ProductCardComponent,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ButtonComponent,
    ProductCardComponent,
    TruncatePipe,
  ],
  providers: []
})
export class SharedModule {}
