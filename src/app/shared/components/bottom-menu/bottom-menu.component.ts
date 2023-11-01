import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/features/cart/models/cart.model';
import { CartService } from 'src/app/features/cart/services/cart.service';

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.scss'],
})
export class BottomMenuComponent implements OnInit {
  constructor(private cartService: CartService, private location: Location) {}
  CartItem: CartItem[] = this.cartService.getItems();
  currentLocation: string = '';
  highlight: string = '';
  showSideMenu: boolean = false;

  ngOnInit(): void {
    this.getCurrentLocation();
  }

  getCurrentLocation(): void {
    this.currentLocation = this.location.path();
    if (this.currentLocation.includes('/cart')) {
      this.highlight = 'cart';
    }

    if (this.currentLocation.includes('/home')) {
      this.highlight = 'home';
    }

    if (this.currentLocation.includes('/profile')) {
      this.highlight = 'profile';
    }
  }

  handleSideMenuClick() {
    this.showSideMenu = !this.showSideMenu;
  }
}
