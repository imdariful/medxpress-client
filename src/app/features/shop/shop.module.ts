import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopLoginComponent } from './components/shop-login/shop-login.component';
import { ShopRegisterComponent } from './components/shop-register/shop-register.component';
import { ShopDashboardComponent } from './components/shop-dashboard/shop-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopSelectScreenComponent } from './components/shop-select-screen/shop-select-screen.component';
import { ShopOrdersComponent } from './components/shop-orders/shop-orders.component';
import { ShopInventoryComponent } from './components/shop-inventory/shop-inventory.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ShopLoginComponent,
    ShopRegisterComponent,
    ShopDashboardComponent,
    ShopSelectScreenComponent,
    ShopOrdersComponent,
    ShopInventoryComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    ShopLoginComponent,
    ShopRegisterComponent,
    ShopDashboardComponent,
    ShopSelectScreenComponent,
    ShopOrdersComponent,
    ShopInventoryComponent
  ]
})
export class ShopModule { }
