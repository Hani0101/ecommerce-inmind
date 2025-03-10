import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { IProduct } from '../../../shared/models/product';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-category-section',
  standalone: false,
  templateUrl: './category-section.component.html',
  styleUrl: './category-section.component.scss'
})
export class CategorySectionComponent implements OnInit, OnDestroy {
  products: IProduct[] = [];
  private carouselInitialized = false;

  constructor(private ProductService: ProductService, private router: Router) {}

  ngOnInit() {
    this.fetchProducts().subscribe({
      next: (data: { products: IProduct[] }) => {
        this.products = data.products;
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

  fetchProducts(): Observable<{ products: IProduct[] }> {
    return this.ProductService.getGeneralProducts();
  }


  formatCategoryUrl(category: string): string {
    return category.toLowerCase().replace(/[' ]+/g, '-'); 
  }

  readonly categoryImages: { [key: string]: string } = {
    'Womens Bags': './assets/category/purse.png',
    'Beauty': './assets/category/beauty.png',
    'Tops': './assets/category/tops.png',
    'Womens Shoes': './assets/category/womenShoes.png',
    'Skin Care': './assets/category/cosmetics.png',
    'Mens Shirts': './assets/category/menShirt.png'
  };
  
  categoryList = Object.keys(this.categoryImages).map(category => ({
    name: category,
    image: this.categoryImages[category]
  }));
  

  NaviageToSkinCare() {
    this.router.navigate(['/category/skin-care']);
  }

}