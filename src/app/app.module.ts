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
import { NgxStripeModule } from 'ngx-stripe';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    CustomerModule,
    CartModule,
    HotToastModule.forRoot(),
    NgxStripeModule.forRoot(
      'pk_test_51O7BlTI3fhUzlLHID14wOqnQbm460zgooTPbs6orv9XG6q7p1dLye1wU3svqjItgKvMxCrvvxdxh2bP9Tbp0me9O00RNX3DmHd'
    ),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
