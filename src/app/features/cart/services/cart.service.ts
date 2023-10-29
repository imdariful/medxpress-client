import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart.model';
import { Product } from 'src/app/shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  /*  private storageKey = 'cartItems';
  items: CartItem[] = [];

  constructor() {
    const storedItems = localStorage.getItem(this.storageKey);
    if (storedItems) {
      this.items = JSON.parse(storedItems);
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  addToCart(product: Product, quantity: number, totalAmount: number): void {
    const existingItem = this.items.find((item) => item._id === product._id);

    if (existingItem) {
      existingItem.quantity = quantity;
    } else {
      this.items.push({
        _id: product._id,
        name: product.name,
        price: parseFloat(String(product.price)),
        quantity: quantity,
        totalAmount: totalAmount,
      });
      console.log({
        _id: product._id,
        name: product.name,
        price: parseFloat(String(product.price)),
        quantity: quantity,
        totalAmount: totalAmount,
      });
    }

    this.saveToLocalStorage();
  }

  updateCartItemQuantity(productId: string, newQuantity: number): void {
    const item = this.items.find((item) => item._id === productId);

    if (item) {
      item.quantity = newQuantity;

      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      }

      this.saveToLocalStorage();
    }
  }

  removeFromCart(productId: string): void {
    const index = this.items.findIndex((item) => item._id === productId);

    if (index !== -1) {
      this.items.splice(index, 1);
      this.saveToLocalStorage();
    }
  }

  increaseQuantity(productId: string): void {
    const item = this.items.find((item) => item._id === productId);

    if (item) {
      item.quantity += 1;
      this.saveToLocalStorage();
    }
  }

  decreaseQuantity(productId: string): void {
    const item = this.items.find((item) => item._id === productId);

    if (item) {
      item.quantity -= 1;

      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      }

      this.saveToLocalStorage();
    }
  }

  getItems(): CartItem[] {
    return this.items;
  }

  getCartTotal(): number {
    let total = 0;
    for (const item of this.items) {
      total += parseFloat(String(item.price)) * item.quantity;
    }
    return total;
  }

  clearCart(): void {
    this.items = [];
    this.saveToLocalStorage();
  } */
  private storageKey = 'cartItems';
  items: CartItem[] = [];

  constructor() {
    const storedItems = localStorage.getItem(this.storageKey);
    if (storedItems) {
      this.items = JSON.parse(storedItems);
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  addToCart(product: Product, quantity: number): void {
    const existingItem = this.items.find((item) => item._id === product._id);

    if (existingItem) {
      existingItem.quantity = quantity;
      existingItem.totalAmount =
        existingItem.quantity * parseFloat(String(product.price));
    } else {
      this.items.push({
        _id: product._id,
        name: product.name,
        price: parseFloat(String(product.price)),
        quantity: quantity,
        totalAmount: quantity * parseFloat(String(product.price)),
      });
    }

    this.saveToLocalStorage();
  }

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

  increaseQuantity(productId: string): void {
    const item = this.items.find((item) => item._id === productId);

    if (item) {
      item.quantity += 1;
      item.totalAmount = item.quantity * item.price;
      this.saveToLocalStorage();
    }
  }

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

  getItems(): CartItem[] {
    return this.items;
  }

  getCartTotal(): number {
    let total = 0;
    for (const item of this.items) {
      total += item.totalAmount;
    }
    return total;
  }

  clearCart(): void {
    this.items = [];
    this.saveToLocalStorage();
  }

  removeFromCart(productId: string): void {
    const index = this.items.findIndex((item) => item._id === productId);

    if (index !== -1) {
      this.items.splice(index, 1);
      this.saveToLocalStorage();
    }
  }
}
