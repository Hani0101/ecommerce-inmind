import { Component, OnInit, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { IProduct } from '../../../shared/models/product';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sales-section',
  standalone: false,
  templateUrl: './sales-section.component.html',
  styleUrl: './sales-section.component.scss'
})
export class SalesSectionComponent implements OnInit, AfterViewInit {
  products: IProduct[] = [];
  slickConfig: any = {
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: false,
    infinite: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 468,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  currentSlideIndex: number = 0;

  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;

  constructor(
    private saleProductService: ProductService,
    private ngZone: NgZone 
  ) {}

  ngOnInit() {
    this.fetchProducts().subscribe({
      next: (data: { products: IProduct[] }) => {
        this.products = data.products;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  ngAfterViewInit() {
  }

  fetchProducts(): Observable<{ products: IProduct[] }> {
    return this.saleProductService.getGeneralProducts();
  }

  scrollLeft(): void {
    this.ngZone.runOutsideAngular(() => {
      this.slickModal.slickPrev(); 
    });
  }

  scrollRight(): void {
    this.ngZone.runOutsideAngular(() => {
      this.slickModal.slickNext(); 
    });
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
