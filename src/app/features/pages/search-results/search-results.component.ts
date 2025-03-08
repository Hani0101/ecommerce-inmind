import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { IProduct } from '../../../shared/models/product';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  standalone: false,
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  searchQuery: string = '';
  products: IProduct[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      if (this.searchQuery) {
        this.searchProducts();
      }
    });
  }

  searchProducts(): void {
    this.productService.getProductsBySearch(this.searchQuery)
      .subscribe(data => {
        this.products = data.products;
        this.cdr.detectChanges(); 
      });
  }
}
