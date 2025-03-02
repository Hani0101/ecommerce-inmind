import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../models/product';
import { Store } from '@ngrx/store';
import { addToCart } from '../../../state/cart.actions';
import { inject } from '@angular/core';
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  standalone: false,
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Output() add = new EventEmitter<number>();
  @Input() product: IProduct = {} as IProduct;

  private store$ = inject(Store);

  addToCart(product: IProduct) {
    console.log("product: ", product);
    this.store$.dispatch(addToCart({ product }));
  }
}