import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { ShopService } from '../../services/shop.service';
import { TokenService } from 'src/app/shared/services/token.service';
import {
  getToastErrorMessage,
  getToastSuccessMessage,
} from 'src/app/shared/utilityFunctions';

@Component({
  selector: 'app-shop-login',
  templateUrl: './shop-login.component.html',
  styleUrls: ['./shop-login.component.scss'],
})
export class ShopLoginComponent {
  shopLoginForm: FormGroup;
  private toastService = inject(HotToastService);

  constructor(
    private router: Router,
    private shopService: ShopService,
    private formBuilder: FormBuilder,
    private tokenService: TokenService
  ) {
    this.shopLoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * Checks if a form field is invalid based on its name.
   * @param fieldName The name of the form field to check.
   * @returns True if the field is invalid and has been touched or modified, false otherwise.
   */
  isFieldInvalid(fieldName: string): boolean {
    const fieldControl = this.shopLoginForm.get(fieldName);
    if (fieldControl) {
      return (
        fieldControl.invalid && (fieldControl.dirty || fieldControl.touched)
      );
    }
    return false;
  }

  handleShopLoginClick() {
    if (this.shopLoginForm.valid) {
      const loginData = this.shopLoginForm.value;
      this.shopService.loginShop(loginData).subscribe({
        next: (data) => {
          this.tokenService.saveAccessToken(data.access_token, data.expires_in);
          this.toastService.success(
            'Login Successful',
            getToastSuccessMessage()
          );
          this.router.navigate(['/shop/dashboard/inventory']);
        },
        error: (error) => {
          console.error(error);
          this.toastService.error('Login failed', getToastErrorMessage());
        },
      });
    }
  }
}
