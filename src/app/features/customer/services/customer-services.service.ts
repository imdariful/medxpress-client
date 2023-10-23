import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { CustomerRegister } from '../models/customer-register';
import { CustomerLogin } from '../models/customer-login';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerServicesService {
  baseUrl = 'http://localhost:3000';
  private accessTokenKey = 'access_token';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  // Register customer
  registerCustomer(customerData: CustomerRegister): Observable<any> {
    const registrationUrl = `${this.baseUrl}/auth/signup/`;

    return this.http.post(registrationUrl, customerData);
  }

  // Login customer
  loginCustomer(loginData: CustomerLogin): Observable<any> {
    const loginUrl = `${this.baseUrl}/auth/login/`;

    return this.http.post(loginUrl, loginData);
  }

  // Save the access token to cookies
  saveAccessToken(access_token: string, expires_in: number): void {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expires_in);
    this.cookieService.set(
      this.accessTokenKey,
      access_token,
      expirationDate,
      '/'
    );
  }

  // Get the access token from cookies
  getAccessToken(): string | null {
    return this.cookieService.get(this.accessTokenKey);
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  // Log out by removing the access token from cookies
  logout(): void {
    this.cookieService.delete(this.accessTokenKey);
  }
}
