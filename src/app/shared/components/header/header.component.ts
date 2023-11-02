import { CartItem } from './../../../features/cart/models/cart.model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PreviousUrlService } from '../../services/previous-url.service';
import { CartService } from 'src/app/features/cart/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private previousUrlService: PreviousUrlService,
    private cartService: CartService
  ) {}

  cartItems: CartItem[] = this.cartService.getItems();

  /**
   * Sets the previous URL and navigates to the cart page when the cart icon is clicked.
   */
  handleCartClick() {
    this.previousUrlService.setPreviousUrl(this.router.url);
    this.router.navigate(['/cart']);
  }
}
