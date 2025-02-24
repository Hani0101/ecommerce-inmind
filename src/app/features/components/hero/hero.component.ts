import { Component, HostListener  } from '@angular/core';
@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  ButtonText = 'Shop Now';
  btnStyles: { [key: string]: string } = {};

  constructor() {
    this.updateStyles(window.innerWidth); // Initial call
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateStyles(event.target.innerWidth);
  }

  private updateStyles(width: number) {
    if (width > 1024) {
      // Desktop styles
      this.btnStyles = {
        'color': '$text-color-primary',
      };
    } else if (width > 768) {
      // Tablet styles
      this.btnStyles = {
        'font-size': '0.95rem',
        'width': '120px',
      };
    } else {
      // Mobile styles
      this.btnStyles = {
        'font-size': '0.6rem',
        'width': '80px',
        'height': '20px',
      };
    }
  }
}