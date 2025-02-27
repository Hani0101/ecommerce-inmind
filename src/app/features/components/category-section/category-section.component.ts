import { Component, OnInit, OnDestroy } from '@angular/core';
import { SaleProductService } from '../../services/sales-product/sale-product.service';
import { IProduct } from '../../../shared/models/product';
import { Observable } from 'rxjs';

declare var $: any; // Declare jQuery for Slick Carousel

@Component({
  selector: 'app-category-section',
  standalone: false,
  templateUrl: './category-section.component.html',
  styleUrl: './category-section.component.scss'
})
export class CategorySectionComponent implements OnInit, OnDestroy {
  products: IProduct[] = [];
  private carouselInitialized = false;

  constructor(private ProductService: SaleProductService) {}

  ngOnInit() {
    this.fetchProducts().subscribe({
      next: (data: IProduct[]) => {
        this.products = data;
        setTimeout(() => this.initOrDestroyCarousel(), 0); 
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });

    window.addEventListener('resize', this.handleResize.bind(this)); 
  }

  ngAfterViewInit() {
    setTimeout(() => this.initOrDestroyCarousel(), 0); 
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.handleResize.bind(this));
    this.destroySlickCarousel();
  }

  handleResize() {
    this.initOrDestroyCarousel();
  }

  initOrDestroyCarousel() {
    if (window.innerWidth <= 480 && !this.carouselInitialized) {
      this.initSlickCarousel();
    } else if (window.innerWidth > 480 && this.carouselInitialized) {
      this.destroySlickCarousel();
    }
  }

  initSlickCarousel() {
    setTimeout(() => {
      $('.slick-carousel').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false
      });
      this.carouselInitialized = true;
    }, 500); 
  }

  destroySlickCarousel() {
    if ($('.slick-carousel').hasClass('slick-initialized')) {
      $('.slick-carousel').slick('unslick');
    }
    this.carouselInitialized = false;
  }

  fetchProducts(): Observable<IProduct[]> {
    return this.ProductService.getProducts();
  }
}