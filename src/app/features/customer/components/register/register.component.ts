import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerRegister } from '../../models/customer-register';
import { CustomerServicesService } from '../../services/customer-services.service';
import { Router } from '@angular/router';

import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  step = 1;
  private toastService = inject(HotToastService);
  registrationCompleted: boolean = false;

  registrationForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    address: ['', Validators.required],
    postalCode: [
      '',
      [
        Validators.required,
        Validators.pattern(/^\d{4}$/), // exactly 4 digits
      ],
    ],
    role: ['CUSTOMER'],
  });
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerServicesService,
    private router: Router
  ) {}

  // Validate form
  isFieldInvalid(fieldName: string | number): boolean {
    const fieldControl = this.registrationForm.get(String(fieldName));

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

  onEmailSubmit() {
    if (this.step === 1 && this.registrationForm.get('email')?.valid) {
      const email: string = this.registrationForm.get('email')?.value ?? '';

      // Check for duplicate email
      this.customerService.checkDuplicateEmail(email).subscribe({
        next: (data) => {
          console.log(data);
          this.increaseStep();
        },
        error: (error) => {
          if (error.status === 409) {
            this.registrationForm.get('email')?.setErrors({ duplicate: true });
            this.toastService.error(
              'Email already exists. Please use a different email.'
            );
          } else {
            console.error(error);
            this.toastService.error(
              'Something went wrong. Please try again later.'
            );
          }
        },
      });
    } else if (this.step === 2) {
      // Proceed to the next step (Step 3 or final step) when step 2 is valid
      this.step = 3;
    } else if (this.step === 3 && this.registrationForm.valid) {
      // Complete registration on the final step
      this.registrationFormSubmit();
    }
  }

  registrationFormSubmit() {
    if (this.registrationForm.valid) {
      const customerData: CustomerRegister = {
        firstName: this.registrationForm.value.firstName!,
        lastName: this.registrationForm.value.lastName!,
        email: this.registrationForm.value.email!,
        password: this.registrationForm.value.password!,
        address: this.registrationForm.value.address!,
        postalCode: this.registrationForm.value.postalCode!,
        role: this.registrationForm.value.role!,
      };

      this.customerService.registerCustomer(customerData).subscribe({
        next: (data) => {
          console.log(data);
          this.increaseStep();
          this.customerService.saveAccessToken(
            data.access_token,
            data.expires_in
          );
          this.increaseStep();

          this.toastService.success('Registration Successful', {
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
          this.registrationForm.reset();
          this.toastService.error('Something Went Wrong', {
            icon: '☹',
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
        complete: () => {
          this.registrationCompleted = true;
        },
      });
    }
    console.log('submitted', this.registrationForm.value);
  }

  HandleHomeBtnClick() {
    this.router.navigate(['/home']);
  }
}
