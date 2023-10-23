import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerServicesService {
  constructor(private http: HttpClient) {}

  baseUrl = 'http://localhost:3000';

  // Register customer

  registerCustomer(customer: any) {
    
  }
}
