import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.scss'],
})
export class WelcomeScreenComponent {
  constructor(private ngZone: NgZone, private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.ngZone.run(() => {
        this.router.navigate(['/home']);
      });
    }, 4000);
  }
}
