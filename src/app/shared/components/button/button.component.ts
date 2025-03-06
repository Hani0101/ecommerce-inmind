import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: false,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() text: string = "";
  @Input() theme: 'primary' | 'secondary' | 'danger' | 'auth' = 'primary'; 
}
