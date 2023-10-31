import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SuccessComponent } from './components/success/success.component';

@NgModule({
  declarations: [CartComponent, SuccessComponent],
  imports: [CommonModule, CartRoutingModule, SharedModule],
  exports: [],
})
export class CartModule {}
