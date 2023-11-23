import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart.model';
import { Product } from 'src/app/shared/models/product.model';
import { catchError, throwError } from 'rxjs';

/**
 * Service responsible for managing the shopping cart.
 */
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private storageKey = 'cartItems';
  items: CartItem[] = [];

  constructor(private http: HttpClient) {
    const storedItems = localStorage.getItem(this.storageKey);
    if (storedItems) {
      this.items = JSON.parse(storedItems);
    }
  }

  /**
   * Save the shopping cart to local storage.
   */
  private saveToLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  /**
   * Add a product to the shopping cart.
   * @param product The product to be added.
   * @param quantity The quantity of the product.
   * @param days The number of days.
   * @param times The number of times.
   */
  addToCart(
    product: Product,
    quantity: number,
    days: number,
    times: number
  ): void {
    const existingItem = this.items.find((item) => item._id === product._id);

    if (existingItem) {
      existingItem.quantity = quantity;
      existingItem.totalAmount = quantity * parseFloat(String(product.price));
    } else {
      this.items.push({
        _id: product._id,
        dosage_form: product.dosage_form,
        name: product.name,
        price: parseFloat(String(product.price)),
        quantity: quantity,
        totalAmount: quantity * parseFloat(String(product.price)),
        days: days,
        times: times,
      });
    }

    this.saveToLocalStorage();
  }

  /**
   * Update the quantity of a product in the cart.
   * @param productId The ID of the product to update.
   * @param newQuantity The new quantity for the product.
   */
  updateCartItemQuantity(productId: string, newQuantity: number): void {
    const item = this.items.find((item) => item._id === productId);

    if (item) {
      item.quantity = newQuantity;
      item.totalAmount = newQuantity * item.price;

      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      }

      this.saveToLocalStorage();
    }
  }

  /**
   * Increase the quantity of a product in the cart.
   * @param productId The ID of the product to update.
   */
  increaseQuantity(productId: string): void {
    const item = this.items.find((item) => item._id === productId);

    if (item) {
      item.quantity += 1;
      item.totalAmount = item.quantity * item.price;
      this.saveToLocalStorage();
    }
  }

  /**
   * Decrease the quantity of a product in the cart.
   * @param productId The ID of the product to update.
   */
  decreaseQuantity(productId: string): void {
    const item = this.items.find((item) => item._id === productId);

    if (item) {
      item.quantity -= 1;
      item.totalAmount = item.quantity * item.price;

      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      }

      this.saveToLocalStorage();
    }
  }

  /**
   * Get the items in the shopping cart.
   * @returns The items in the shopping cart.
   */
  getItems(): CartItem[] {
    return this.items;
  }

  /**
   * Get the total number of items in the shopping cart.
   * @returns The total number of items.
   */
  getCartTotal(): number {
    let total = 0;
    for (const item of this.items) {
      total += item.totalAmount;
    }
    return total;
  }

  /**
   * Clear the shopping cart.
   */

  clearCart(): void {
    this.items = [];
    this.saveToLocalStorage();
  }

  /**
   * Remove a product from the shopping cart.
   * @param productId The ID of the product to be removed.
   */
  removeFromCart(productId: string): void {
    const index = this.items.findIndex((item) => item._id === productId);

    if (index !== -1) {
      this.items.splice(index, 1);
      this.saveToLocalStorage();
    }
  }

  /**
   * Handle HTTP errors when communicating with the server.
   * @param error The HTTP error response.
   * @returns An observable with an error message.
   */
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
