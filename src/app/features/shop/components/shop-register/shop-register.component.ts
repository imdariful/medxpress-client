import { ShopService } from './../../services/shop.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { CreateShopDto } from '../../models/shop.model';
import {
  getToastErrorMessage,
  getToastSuccessMessage,
} from 'src/app/shared/utilityFunctions';

@Component({
  selector: 'app-shop-register',
  templateUrl: './shop-register.component.html',
  styleUrls: ['./shop-register.component.scss'],
})
export class ShopRegisterComponent implements OnInit {
  private toastService: HotToastService; // Corrected this line

  constructor(
    private router: Router,
    private shopService: ShopService,
    private fb: FormBuilder,
    toastService: HotToastService // Removed the "inject" function
  ) {
    this.toastService = toastService; // Assigning the toast service in the constructor
  }

  ngOnInit(): void {
    this.getLocation();
  }

  shopRegistrationForm = this.fb.group({
    shopName: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    address: ['', Validators.required],
    lat: [0, Validators.required],
    lng: [0, Validators.required],
    role: 'SHOP',
  });

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.shopRegistrationForm.patchValue({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
      console.log(
        'lat:',
        this.shopRegistrationForm.get('lat')?.value,
        'lng: ',
        this.shopRegistrationForm.get('lng')?.value
      );
    } else {
      console.log('No support for geolocation');
    }
  }

  shopRegistrationFormSubmit() {
    if (this.shopRegistrationForm.valid) {
      const shopDetails: CreateShopDto = {
        shopName: this.shopRegistrationForm.get('shopName')?.value || '',
        firstName: this.shopRegistrationForm.get('firstName')?.value || '',
        lastName: this.shopRegistrationForm.get('lastName')?.value || '',
        email: this.shopRegistrationForm.get('email')?.value || '',
        password: this.shopRegistrationForm.get('password')?.value || '',
        address: this.shopRegistrationForm.get('address')?.value || '',
        lat: this.shopRegistrationForm.get('lat')?.value || 0,
        lng: this.shopRegistrationForm.get('lng')?.value || 0,
        role: 'SHOP',
      };

      this.shopService.registerShop(shopDetails).subscribe({
        next: (res) => {
          this.toastService.success(
            'Registration successful!',
            getToastSuccessMessage()
          );
        },
        error: (err) => {
          if (err.status === 409) {
            this.toastService.error(
              'Email already exists',
              getToastErrorMessage()
            );
            return;
          }
          this.toastService.error(err.message, getToastErrorMessage());
          console.error(err);
        },
      });
    }
  }
  onEmailSubmit() {}
}
