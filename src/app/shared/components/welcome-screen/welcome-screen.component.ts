import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.scss'],
})
export class WelcomeScreenComponent {
  constructor(private ngZone: NgZone, private router: Router) {}

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit() {
    setTimeout(() => {
      this.ngZone.run(() => {
        this.router.navigate(['customer/select']);
      });
    }, 4000);
  }
}
