import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { IProduct } from '../../models/product';
import { Store } from '@ngrx/store';
import { addItemToCart } from '../../../state/cart.actions';
import { inject } from '@angular/core';
import { ICartItem } from '../../models/cart-item.model';
import { AuthenticationService } from '../../../core/services/authentication/authentication-service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  standalone: false,
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductCardComponent {
  @Output() add = new EventEmitter<number>();
  @Input() set product(value: IProduct) {
    this._product = value;
    this.productImage = this.calculateProductImage();
  }
  get product(): IProduct {
    return this._product;
  }
  private _product: IProduct = {} as IProduct;

  productImage = '';

  private readonly store$ = inject(Store);
  private readonly authService = inject(AuthenticationService);
  private readonly router = inject(Router);

  private calculateProductImage(): string {
    return this.product.thumbnail || (this.product.images?.length ? this.product.images[0] : '');
  }


  addToCart(product: IProduct) {
    const userId = this.authService.decodeJwtToken(this.authService.getAccessToken());

    const cartItem: ICartItem = {
      id: 0, //Default values
      userId: Number(userId),
      cartId: 0, //Default values
      productId: product.id,
      quantity: 1 //Default values
    };

    this.store$.dispatch(addItemToCart({ cartItem }));
  }

  viewProductDetails() {
    this.router.navigate(['/product', this.product.id]);
  }
}
