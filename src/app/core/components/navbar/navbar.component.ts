import { Component, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 
import { CategoryService } from '../../services/category/category.service';
import { ICategories } from '../../models/category';
import { Observable } from 'rxjs';

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
  

  constructor(private http: HttpClient, private router: Router, private categoryService: CategoryService) {}

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
  }


  fetchCategories(): Observable<ICategories[]> {
      return this.categoryService.getCategories();
    }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectCategory(category: ICategories): void {
    console.log('Selected category:', category);
    this.isDropdownOpen = false; 
  }

  navigateToLogin() {
    this.router.navigate(['/login']); 
  }

  @HostListener('window:resize', [])
  onResize(): void {
    this.isSmallScreen = window.innerWidth <= 1024;
    console.log(this.isSmallScreen);
  }
}
