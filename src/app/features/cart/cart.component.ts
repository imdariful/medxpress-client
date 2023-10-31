import { CartService } from './services/cart.service';
import { Component, OnInit } from '@angular/core';
import { CartItem } from './models/cart.model';
import { PreviousUrlService } from 'src/app/shared/services/previous-url.service';
import { Router } from '@angular/router';

import { setImage } from '../../shared/utilityFunctions';
import { HttpClient } from '@angular/common/http';

import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(
    private cartService: CartService,
    private previousUrlService: PreviousUrlService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();
    console.log(this.cartItems);

    this.updateTotal();
  }

  getImage(product: any): string {
    return setImage(product);
  }

  updateTotal(): void {
    this.total = this.cartService.getCartTotal();
  }

  increaseQuantity(productId: string): void {
    this.cartService.increaseQuantity(productId);
    this.cartItems = this.cartService.getItems();
    this.updateTotal();
  }

  decreaseQuantity(productId: string): void {
    this.cartService.decreaseQuantity(productId);
    this.cartItems = this.cartService.getItems();
    this.updateTotal();
  }

  removeItemFromCart(productId: string): void {
    this.cartService.removeFromCart(productId);
    this.cartItems = this.cartService.getItems();
    this.updateTotal();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cartItems = [];
    this.updateTotal();
  }

  handleCloseBtnClick() {
    const previousUrl = this.previousUrlService.getPreviousUrl();
    console.log(previousUrl);

    if (previousUrl) {
      this.router.navigateByUrl(previousUrl);
    }
  }

  handleRemoveFromCart(id: string) {
    this.cartService.removeFromCart(id);
    this.cartItems = this.cartService.getItems();
    this.updateTotal();
  }

  onCheckout(): void {
    this.http
      .post('http://localhost:3000/checkout', {
        items: this.cartItems,
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe(
          'pk_test_51O7BlTI3fhUzlLHID14wOqnQbm460zgooTPbs6orv9XG6q7p1dLye1wU3svqjItgKvMxCrvvxdxh2bP9Tbp0me9O00RNX3DmHd'
        );

        console.log(res.session.id);

        stripe?.redirectToCheckout({
          sessionId: res.session.id,
        });
      });
  }
}
