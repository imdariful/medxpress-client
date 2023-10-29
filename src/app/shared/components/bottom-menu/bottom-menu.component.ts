import { Component } from '@angular/core';
import { CartItem } from 'src/app/features/cart/models/cart.model';
import { CartService } from 'src/app/features/cart/services/cart.service';

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.scss'],
})
export class BottomMenuComponent {
  constructor(private cartService: CartService) {}

  CartItem: CartItem[] = this.cartService.getItems();
}
