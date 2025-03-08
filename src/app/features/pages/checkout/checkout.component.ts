import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { loadCart } from "../../../state/cart.actions";
import { selectCartItems, selectTotalPrice } from '../../../state/cart.selector';
import { Observable, forkJoin } from 'rxjs';
import { IProduct } from '../../../shared/models/product'; 
import { AuthenticationService } from '../../../core/services/authentication/authentication-service/authentication.service';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs/operators';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  cartItems$!: Observable<{ product: IProduct; quantity: number }[]>; 
  totalPrice$!: Observable<number>;
  currentStep = 1;
  progressWidth = 25;
  shippingForm: FormGroup;
  paymentForm: FormGroup;
  isProcessing = false;

  cartItems = [
    {
      name: "Wireless Headphones",
      quantity: 1,
      price: 99.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
      name: "Smart Watch",
      quantity: 1,
      price: 199.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    }
  ];

  shippingMethods = [
    { id: "standard", name: "Standard Shipping", price: 5.99, time: "5-7 Business Days" },
    { id: "express", name: "Express Shipping", price: 12.99, time: "2-3 Business Days" },
    { id: "overnight", name: "Overnight Delivery", price: 24.99, time: "Next Business Day" }
  ];

  paymentMethods = [
    { id: "credit", name: "Credit Card", icon: "https://images.unsplash.com/photo-1542065435-d6bc2eac3377" },
    { id: "paypal", name: "PayPal", icon: "https://images.unsplash.com/photo-1563013544-824ae1b704d3" },
    { id: "apple", name: "Apple Pay", icon: "https://images.unsplash.com/photo-1563013544-824ae1b704d3" }
  ];

  countries = ["United States", "Canada", "United Kingdom", "Australia", "Germany"];

  subtotal = 299.98;
  tax = 24.99;
  shipping = 5.99;
  total = 330.96;

  constructor(private fb: FormBuilder,private authService: AuthenticationService, private store: Store,    private productService: ProductService) {
    this.shippingForm = this.fb.group({
      fullName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", Validators.required],
      address: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      postal: ["", Validators.required],
      country: ["", Validators.required],
      shippingMethod: ["standard", Validators.required]
    });

    this.paymentForm = this.fb.group({
      paymentMethod: ["credit", Validators.required],
      cardNumber: ["", [Validators.required]],
      cardName: ["", Validators.required],
      expiry: ["", [Validators.required]],
      cvv: ["", [Validators.required]]
    });
  }

  ngOnInit() {
    this.loadCartData();
  }

  
    private loadCartData(): void {
      const user = this.authService.getUserData();
      if (!user) {
        console.error("User not found! Please log in.");
        return;
      }
      const userId = Number(user.id);
      this.store.dispatch(loadCart({ userId }));
      this.totalPrice$ = this.store.select(selectTotalPrice);
      this.cartItems$ = this.store.select(selectCartItems).pipe(
        mergeMap(cartItems =>
          forkJoin(cartItems.map(cartItem =>
            this.productService.getProductById(cartItem.productId).pipe(
              map(product => ({ product, quantity: cartItem.quantity }))
            )
          ))
        )
      );
      this.totalPrice$.subscribe(totalPrice => {
        this.total = totalPrice + this.tax + this.shipping;
      });
    }

    getDiscountedPrice(price: number, discount: number | null): number {
      if (!price) return 0;
      return discount ? price * (1 - discount / 100) : price;
    }
  
    getProductImage(product: any): string {
      return product.thumbnail || (product.images && product.images.length > 0 ? product.images[0] : '');
    }
  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
      this.progressWidth = this.currentStep * 25;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.progressWidth = this.currentStep * 25;
    }
  }

  editSection(step: number) {
    this.currentStep = step;
    this.progressWidth = step * 25;
  }

  getSelectedPaymentMethod() {
    const methodId = this.paymentForm.get("paymentMethod")?.value;
    return this.paymentMethods.find(m => m.id === methodId)?.name || "";
  }

  async placeOrder() {
    this.isProcessing = true;
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Order placed successfully");
      // Handle success
    } catch (error) {
      console.error("Error placing order:", error);
      // Handle error
    } finally {
      this.isProcessing = false;
    }
  }
}




