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
    this.router.navigate(['/user/login']);``
  }

  onRegisterClick() {
    this.router.navigate(['/user/register']);
  }
}
