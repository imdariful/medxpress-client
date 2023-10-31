import { NgModule } from '@angular/core';
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
