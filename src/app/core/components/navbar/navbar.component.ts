import { Component, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { CategoryService } from '../../services/category/category.service';
import { ICategories } from '../../models/category';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  encapsulation: ViewEncapsulation.None, //used instead of ng deep
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isDropdownOpen = false; 
  isSmallScreen: boolean = false;
  categories: ICategories[] = [];
  searchQuery: string = '';


  constructor(private router: Router, private categoryService: CategoryService, private spinner: NgxSpinnerService  ) {}

  ngOnInit(){
    this.fetchCategories().subscribe({
      next: (data: ICategories[]) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });   
    this.onResize(); 

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.spinner.show();
      }
      if (event instanceof NavigationEnd) {
        setInterval(() => { this.spinner.hide(); }, 2000);
      }
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery.trim() } });
    }
  }

  fetchCategories(): Observable<ICategories[]> {
      return this.categoryService.getCategories();
    }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  navigateToLogin() {
    this.router.navigate(['/log-in']); 
  }

  navigateToCategory(categoryName: ICategories): void {
    this.isDropdownOpen = false;
    this.router.navigate([`category/${categoryName}`]);
  }

  navigateToHome(){
    this.router.navigate(['']); 
  }

  navigateToCart(){
    this.router.navigate(['/cart']); 
  }

  @HostListener('window:resize', [])
  onResize(): void {
    this.isSmallScreen = window.innerWidth <= 1024;
  }
}
