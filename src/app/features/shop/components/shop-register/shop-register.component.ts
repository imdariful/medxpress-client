import { ShopService } from './../../services/shop.service';
import { Component, inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-shop-register',
  templateUrl: './shop-register.component.html',
  styleUrls: ['./shop-register.component.scss'],
})
export class ShopRegisterComponent {
  constructor(
    private router: Router,
    private shopService: ShopService,
    private fb: FormBuilder
  ) {}

  step: number = 1;
  private toastService = inject(HotToastService);
  registrationCompleted: boolean = false;

  shopRegistrationForm = this.fb.group({
    shopName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    role: ['SHOP'],
  });

  isFieldInvalid(fieldName: string | number): boolean {
    const fieldControl = this.shopRegistrationForm.get(String(fieldName));

    if (fieldControl) {
      return (
        fieldControl.invalid && (fieldControl.dirty || fieldControl.touched)
      );
    }

    // If null or undefined or invalid
    return false;
  }
  increaseStep() {
    this.step++;
  }
  registrationFormSubmit() {}
  onEmailSubmit() {}
}
