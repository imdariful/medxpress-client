import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerRegister } from '../../models/customer-register';

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
  });
  constructor(private fb: FormBuilder) {}

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
    console.log('submitted', this.registerForm.value, this.registerForm.valid);
  }

  handleRegistrationClick() {}
}
