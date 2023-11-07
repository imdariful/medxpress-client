import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-select-screen',
  templateUrl: './shop-select-screen.component.html',
  styleUrls: ['./shop-select-screen.component.scss'],
})
export class ShopSelectScreenComponent {
  constructor(private router: Router) {}

  onLoginClick() {
    this.router.navigate(['/shop/login']);
  }
  onRegisterClick() {
    this.router.navigate(['/shop/register']);
  }
}
