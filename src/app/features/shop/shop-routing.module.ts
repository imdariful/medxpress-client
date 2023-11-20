import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopRegisterComponent } from './components/shop-register/shop-register.component';
import { ShopLoginComponent } from './components/shop-login/shop-login.component';
import { ShopDashboardComponent } from './components/shop-dashboard/shop-dashboard.component';
import { ShopSelectScreenComponent } from './components/shop-select-screen/shop-select-screen.component';
import { ShopOrdersComponent } from './components/shop-orders/shop-orders.component';
import { ShopInventoryComponent } from './components/shop-inventory/shop-inventory.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ShopReportsComponent } from './components/shop-reports/shop-reports.component';

const routes: Routes = [
  {
    path: 'shop',
    children: [
      {
        path: 'select',
        component: ShopSelectScreenComponent,
      },
      {
        path: 'register',
        component: ShopRegisterComponent,
      },
      {
        path: 'login',
        component: ShopLoginComponent,
      },
      {
        path: 'dashboard',
        component: SidebarComponent,
        children: [
          {
            path: '',
            component: ShopDashboardComponent,
          },
          {
            path: 'reports',
            component: ShopReportsComponent,
          },
          {
            path: 'orders',
            component: ShopOrdersComponent,
          },
          {
            path: 'inventory',
            component: ShopInventoryComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
