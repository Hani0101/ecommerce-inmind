import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  constructor(private router: Router) {}
  NavigateToCategory(){
    this.router.navigate(['/category']);
  }
}