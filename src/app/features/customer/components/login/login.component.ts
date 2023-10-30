import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerServicesService } from '../../services/customer-services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  private toastService = inject(HotToastService);

  constructor(
    private router: Router,
    private customerService: CustomerServicesService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const fieldControl = this.loginForm.get(fieldName);
    if (fieldControl) {
      return (
        fieldControl.invalid && (fieldControl.dirty || fieldControl.touched)
      );
    }
    // If null or undefined or invalid
    return false;
  }

  handleLoginClick(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.customerService.loginCustomer(loginData).subscribe({
        next: (data) => {
          console.log(data);
          this.customerService.saveAccessToken(
            data.access_token,
            data.expires_in
          );
          this.toastService.success('Login Successful', {
            icon: '😀',
            position: 'top-center',
            duration: 2000,
            style: {
              border: '1px solid #067A46',
              padding: '16px',
              color: '#067A46',
              background: '#D2F895',
              fontFamily: 'Agrandir-Regular',
            },
          });
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.router.navigate(['/home']);
        },
      });
    }
  }
}
