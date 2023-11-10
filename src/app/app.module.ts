import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './features/home/home.module';
import { CustomerModule } from './features/customer/customer.module';
import { CartModule } from './features/cart/cart.module';

// import hot toast
import { HotToastModule } from '@ngneat/hot-toast';

// Import stripe
import { ServiceWorkerModule } from '@angular/service-worker';
import { ShopModule } from './features/shop/shop.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    CustomerModule,
    CartModule,
    ShopModule,
    HotToastModule.forRoot(),

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
