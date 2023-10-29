import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BottomMenuComponent } from './components/bottom-menu/bottom-menu.component';
import { WelcomeScreenComponent } from './components/welcome-screen/welcome-screen.component';
import { RouterModule } from '@angular/router';
import { AddToCartModalComponent } from './components/add-to-cart-modal/add-to-cart-modal.component';
import { TakaCurrencyPipe } from './pipes/taka-currency.pipe';
import { CartModule } from '../features/cart/cart.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BottomMenuComponent,
    WelcomeScreenComponent,
    AddToCartModalComponent,
    TakaCurrencyPipe,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    BottomMenuComponent,
    WelcomeScreenComponent,
    AddToCartModalComponent,
    TakaCurrencyPipe,
  ],
})
export class SharedModule {}
