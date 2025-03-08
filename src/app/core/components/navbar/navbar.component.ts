import { Component, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { CategoryService } from '../../services/category/category.service';
import { ICategories } from '../../models/category';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from '../../services/authentication/authentication-service/authentication.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  encapsulation: ViewEncapsulation.None, //used instead of ng deep
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isCategoriesDropdownOpen = false; 
  isProfileDropdownOpen = false; 
  isLoggedIn : boolean= false; 
  isSmallScreen: boolean = false;
  categories: ICategories[] = [];
  searchQuery: string = '';
  userProfilePicture: string = '';
  constructor(private authService: AuthenticationService, private router: Router, private categoryService: CategoryService, private spinner: NgxSpinnerService  ) {}

  ngOnInit(){

    this.authService.isCurrentUserLoggedIn().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn; 
      if (isLoggedIn) {
        this.userProfilePicture = 'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U'; 
      }
    });

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

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.isProfileDropdownOpen = false;
    this.router.navigate(['/log-in']);
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
    this.isCategoriesDropdownOpen = !this.isCategoriesDropdownOpen;
  }

  toggleProfileDropdown(): void {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  navigateToLogin() {
    this.router.navigate(['/log-in']); 
  }

  navigateToCategory(categoryName: ICategories): void {
    this.isCategoriesDropdownOpen = false;
    this.router.navigate([`category/${categoryName}`]);
  }

  navigateToHome(){
    this.router.navigate(['']); 
  }

  navigateToMyAccount(){
    this.router.navigate(['/my-account']); 
  }

  navigateToCart(){
    this.router.navigate(['/cart']); 
  }

  @HostListener('window:resize', [])
  onResize(): void {
    this.isSmallScreen = window.innerWidth <= 1024;
  }
}
