import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component';
import { SuccessComponent } from './components/success/success.component';

const routes: Routes = [
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'cart/success',
    component: SuccessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
