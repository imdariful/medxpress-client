import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SelectionScreenComponent } from './components/selection-screen/selection-screen.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: 'customer',
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'select',
        component: SelectionScreenComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
