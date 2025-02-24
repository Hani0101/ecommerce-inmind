import { Component, OnInit, ViewChild } from '@angular/core';
import { SaleProductService } from '../../services/sales-product/sale-product.service';
import { IProduct } from '../../../shared/models/product';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-sales-section',
  standalone: false,
  templateUrl: './sales-section.component.html',
  styleUrl: './sales-section.component.scss'
})
export class SalesSectionComponent implements OnInit {
  products: IProduct[] = [];
  slickConfig: any = {
    slidesToShow: 5,
    slidesToScroll: 5, 
    arrows: false, 
    infinite: false, 
    centerPadding: '20px', 
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  currentSlideIndex: number = 0; 

  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;

  constructor(private saleProductService: SaleProductService) {}

  ngOnInit(){
    this.fetchProducts().subscribe({
      next: (data: IProduct[]) => {
        this.products = data;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }
  
  fetchProducts(): Observable<IProduct[]> {
    return this.saleProductService.getProducts();
  }
  
  
  scrollLeft(): void {
    this.slickModal.slickPrev();
  }

  scrollRight(): void {
    this.slickModal.slickNext();
  }

  onAfterChange(event: any): void {
    this.currentSlideIndex = event.currentSlide;
  }

  isPrevDisabled(): boolean {
    return this.currentSlideIndex === 0;
  }

  isNextDisabled(): boolean {
    const totalSlides = this.products.length;
    const slidesToShow = this.slickConfig.slidesToShow;
    return this.currentSlideIndex >= totalSlides - slidesToShow;
  }

}