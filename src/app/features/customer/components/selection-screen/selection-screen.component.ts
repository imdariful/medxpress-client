import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selection-screen',
  templateUrl: './selection-screen.component.html',
  styleUrls: ['./selection-screen.component.scss'],
})
export class SelectionScreenComponent {
  constructor(private router: Router) {}
  onLoginClick() {
    this.router.navigate(['/customer/login']);``
  }

  onRegisterClick() {
    this.router.navigate(['/customer/register']);
  }
}
