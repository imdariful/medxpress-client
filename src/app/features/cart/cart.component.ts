/**
 * This component represents the shopping cart page.
 * It displays the items in the cart, allows the user to modify the quantity of items, and initiate the checkout process.
 * @remarks
 * This component depends on the following services:
 * - CartService: to manage the cart items and total cost.
 * - CustomerServicesService: to get the user ID for the checkout process.
 * - PreviousUrlService: to navigate back to the previous URL when the close button is clicked.
 * - HttpClient: to send a POST request to the server for the checkout process.
 */
import { CartService } from './services/cart.service';
import { Component, OnInit } from '@angular/core';
import { CartItem } from './models/cart.model';
import { PreviousUrlService } from 'src/app/shared/services/previous-url.service';
import { Router } from '@angular/router';

import { setImage } from '../../shared/utilityFunctions';
import { HttpClient } from '@angular/common/http';

import { loadStripe } from '@stripe/stripe-js';
import { CustomerServicesService } from '../customer/services/customer-services.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;
  baseUrl = 'https://medxpress-wef4.onrender.com';

  constructor(
    private cartService: CartService,
    private customerService: CustomerServicesService,
    private previousUrlService: PreviousUrlService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();
    this.updateTotal();
  }

  /**
   * Returns the image URL for a given product.
   * @param product - The product to get the image for.
   * @returns The URL of the product's image.
   */
  getImage(product: any): string {
    return setImage(product);
  }

  /**
   * Updates the total cost of items in the cart.
   * Sets the value of `total` property to the result of `cartService.getCartTotal()`.
   */
  updateTotal(): void {
    this.total = this.cartService.getCartTotal();
  }

  /**
   * Increases the quantity of a product in the cart by 1.
   * @param productId - The ID of the product to increase the quantity of.
   */
  increaseQuantity(productId: string): void {
    this.cartService.increaseQuantity(productId);
    this.cartItems = this.cartService.getItems();
    this.updateTotal();
  }

  /**
   * Decreases the quantity of a product in the cart by one.
   * @param productId - The ID of the product to decrease the quantity of.
   */
  decreaseQuantity(productId: string): void {
    this.cartService.decreaseQuantity(productId);
    this.cartItems = this.cartService.getItems();
    this.updateTotal();
  }

  /**
   * Removes an item from the cart.
   * @param productId - The ID of the product to remove from the cart.
   */
  removeItemFromCart(productId: string): void {
    this.cartService.removeFromCart(productId);
    this.cartItems = this.cartService.getItems();
    this.updateTotal();
  }

  /**
   * Clears the cart by removing all items and updating the total.
   */
  clearCart(): void {
    this.cartService.clearCart();
    this.cartItems = [];
    this.updateTotal();
  }

  /**
   * Handles the click event of the close button.
   * Navigates to the previous URL if available.
   */
  handleCloseBtnClick() {
    const previousUrl = this.previousUrlService.getPreviousUrl();
    if (previousUrl) {
      this.router.navigateByUrl(previousUrl);
    }
  }

  /**
   * Removes an item from the cart and updates the cart items and total.
   * @param id - The ID of the item to remove from the cart.
   */
  handleRemoveFromCart(id: string) {
    this.cartService.removeFromCart(id);
    this.cartItems = this.cartService.getItems();
    this.updateTotal();
  }

  /**
   * Triggers the checkout process by sending a POST request to the server with the cart items and user ID.
   * If successful, redirects the user to the Stripe checkout page.
   */
  onCheckout(): void {
    const userId = this.customerService.getCustomerId();
    // ! CHANGE HERE
    this.http
      .post(`${this.baseUrl}/checkout`, {
        items: this.cartItems,
        userId: userId,
      })
      .pipe(
        catchError((error) => {
          console.error('HTTP Error:', error);
          return throwError(error);
        })
      )
      .subscribe(async (res: any) => {
        //Noel - move these to seperate services and the codes to dotenv.
        let stripe = await loadStripe(
          'pk_test_51O7BlTI3fhUzlLHID14wOqnQbm460zgooTPbs6orv9XG6q7p1dLye1wU3svqjItgKvMxCrvvxdxh2bP9Tbp0me9O00RNX3DmHd'
        );
        stripe?.redirectToCheckout({ sessionId: res.session.id });
      });
  }
}
