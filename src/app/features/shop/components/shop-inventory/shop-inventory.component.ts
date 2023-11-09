import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-shop-inventory',
  templateUrl: './shop-inventory.component.html',
  styleUrls: ['./shop-inventory.component.scss'],
})
export class ShopInventoryComponent {
  constructor(private shopService: ShopService) {}
  showProfileDropDown = false;
  allOrders: any = [];
}
