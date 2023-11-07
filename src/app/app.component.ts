import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  SwPush,
  SwUpdate,
  UnrecoverableStateEvent,
  VersionEvent,
  VersionReadyEvent,
} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'medxpress-client';
  innerWidth = 0;
  constructor(
    private updateService: SwUpdate,
    private pushService: SwPush, // private notificationService: NotificationService
    private router: Router
  ) {}

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth);

    console.log('App Component Initialized');
    if (!this.updateService.isEnabled) {
      console.log('Service Worker is Not Enabled');
      return;
    }
    console.log('Service Worker is Enabled');
    this.#handleUpdates();
    this.#handleNotifications();
  }

  #handleUpdates() {
    this.updateService.versionUpdates.subscribe((event: VersionEvent) => {
      console.log(event);
      alert(event.type);

      if (
        event.type === 'VERSION_READY' &&
        confirm(
          `New Version ${
            (event as VersionReadyEvent).latestVersion.hash
          } Available. Load New Version?`
        )
      ) {
        window.location.reload();
      }
    });

    /*  // if application frequently changing
    const interval = setInterval(async () => {
      const shouldUpdate = await this.updateService.checkForUpdate();
      alert('Check for update with result: ' + shouldUpdate);

      if (shouldUpdate) {
        const result = await this.updateService.activateUpdate();
        alert('Update activated: ' + result);
        clearInterval(interval);
      }
    }, 1000);

    this.updateService.unrecoverable.subscribe(
      (event: UnrecoverableStateEvent) => {
        alert('Error reason: ' + event.reason);
      }
    ); */
  }

  async #handleNotifications() {
    try {
      const sub = await this.pushService.requestSubscription({
        serverPublicKey: 'VAPID_PUBLIC_KEY',
      });
    } catch (error) {}
  }
}
