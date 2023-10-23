import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BottomMenuComponent } from './components/bottom-menu/bottom-menu.component';
import { WelcomeScreenComponent } from './components/welcome-screen/welcome-screen.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BottomMenuComponent,
    WelcomeScreenComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    BottomMenuComponent,
    WelcomeScreenComponent
  ]
})
export class SharedModule { }
