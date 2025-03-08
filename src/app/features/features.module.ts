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
import { SingleProductViewComponent } from './pages/single-product-view/single-product-view.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AgGridModule } from 'ag-grid-angular';
import { ProductsGridComponent } from './components/products-grid/products-grid.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { RecommendedSectionComponent } from './components/recommended-section/recommended-section.component';
@NgModule({
  declarations: [
    HeroComponent,
    SalesSectionComponent,
    CategorySectionComponent,
    TrendingSectionComponent,
    CartComponent,
    CategoryComponent,
    LandingPageComponent,
    SearchResultsComponent,
    RecommendedSectionComponent,
    SingleProductViewComponent,
    AdminPageComponent,
    ProductsGridComponent,
    MyAccountComponent,
    CheckoutComponent,
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
    MatExpansionModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule,
    NgApexchartsModule,
    AgGridModule, 
    ReactiveFormsModule
  ],
  exports: [
    HeroComponent,
    SalesSectionComponent,
    CategorySectionComponent,
    TrendingSectionComponent,
    CartComponent,
    CategoryComponent,
    LandingPageComponent,
    SearchResultsComponent,
    RecommendedSectionComponent,
    SingleProductViewComponent,
    AdminPageComponent,
    ProductsGridComponent,
    MyAccountComponent,
    CheckoutComponent,
  ],
  providers: [CartService],
})
export class FeaturesModule {}