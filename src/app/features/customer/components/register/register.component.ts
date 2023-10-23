import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerRegister } from '../../models/customer-register';
import { CustomerServicesService } from '../../services/customer-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  step = 1;

  registerForm = this.fb.group({
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
    const fieldControl = this.registerForm.get(String(fieldName));

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

  registerFormSubmit() {
    if (this.registerForm.valid) {
      const customerData: CustomerRegister = {
        firstName: this.registerForm.value.firstName!,
        lastName: this.registerForm.value.lastName!,
        email: this.registerForm.value.email!,
        password: this.registerForm.value.password!,
        address: this.registerForm.value.address!,
        postalCode: this.registerForm.value.postalCode!,
        role: this.registerForm.value.role!,
      };

      this.customerService.registerCustomer(customerData).subscribe({
        next: (data) => {
          console.log(data);
          this.increaseStep();
          this.customerService.saveAccessToken(
            data.access_token,
            data.expires_in
          );
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('Registration complete');
        },
      });
    }
    console.log('submitted', this.registerForm.value);
  }

  handleRegistrationClick() {}
}
