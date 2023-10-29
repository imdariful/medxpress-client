import { CartService } from './services/cart.service';
import { Component, OnInit } from '@angular/core';
import { CartItem } from './models/cart.model';
import { PreviousUrlService } from 'src/app/shared/services/previous-url.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();
    console.log(this.cartItems);

    this.updateTotal();
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
}
