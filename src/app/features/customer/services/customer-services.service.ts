import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CustomerRegister } from '../models/customer-register';
import { CustomerLogin } from '../models/customer-login';

@Injectable({
  providedIn: 'root',
})
export class CustomerServicesService {
  // ! CHANGE HERE
  baseUrl = 'https://medxpress-wef4.onrender.com';
  private accessTokenKey = 'access_token';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  /**
   * Register a new customer.
   * @param customerData The customer registration data.
   * @returns An Observable with the registration result.
   */
  registerCustomer(customerData: CustomerRegister): Observable<any> {
    const registrationUrl = `${this.baseUrl}/auth/signup/`;
    return this.http
      .post(registrationUrl, customerData)
      .pipe(catchError(this.handleError));
  }

  /**
   * Log in a customer.
   * @param loginData The customer login data.
   * @returns An Observable with the login result.
   */
  loginCustomer(loginData: CustomerLogin): Observable<any> {
    const loginUrl = `${this.baseUrl}/auth/login/`;
    return this.http
      .post(loginUrl, loginData)
      .pipe(catchError(this.handleError));
  }

  /**
   * Get the customer's ID from the access token.
   * @returns The customer's ID if available, or null.
   */
  getCustomerId(): string | null {
    const token = this.getAccessToken();
    if (token) {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      const customerId = JSON.parse(decodedPayload).id;
      return customerId;
    }
    return null;
  }

  /**
   * Get customer information.
   * @returns An Observable with the customer's information.
   */
  getCustomer(): Observable<any> {
    const customerId = this.getCustomerId();
    if (customerId) {
      const customerUrl = `${this.baseUrl}/auth/user/${customerId}`;
      return this.http.get(customerUrl).pipe(catchError(this.handleError));
    }
    return throwError('Invalid customer id');
  }
  /**
   * Check for duplicate email during registration.
   * @param email The email to check for duplication.
   * @returns An Observable with the result of the email check.
   */
  checkDuplicateEmail(email: string | null): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/check-email`, { email });
  }

  /**
   * Save the access token and set its expiration date in cookies.
   * @param access_token The access token to save.
   * @param expires_in The number of seconds until the access token expires.
   */
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
  /**
   * Get the access token from cookies.
   * @returns The access token if found, or null if not found.
   */
  getAccessToken(): string | null {
    return this.cookieService.get(this.accessTokenKey);
  }
  /**
   * Check if the user is authenticated.
   * @returns True if the user is authenticated; otherwise, false.
   */
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
  /**
   * Log out the user by deleting the access token.
   */
  logout(): void {
    this.cookieService.delete(this.accessTokenKey);
  }
  /**
   * Get all orders for a customer by their ID.
   * @param customerId The ID of the customer.
   * @returns An Observable with the customer's orders.
   */
  getOrdersByUserId(customerId: string | null): Observable<any> {
    // const customerId = this.getCustomerId();
    if (customerId) {
      const ordersUrl = `${this.baseUrl}/orders/user/${customerId}`;
      return this.http.get(ordersUrl).pipe(catchError(this.handleError));
    }
    return throwError(() => new Error('Invalid customer id'));
  }

  /**
   * Handles HTTP errors and returns an observable with an error message.
   * @param error - The HttpErrorResponse object.
   * @returns An observable with an error message.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('HTTP Error:', error);
    return throwError(
      () => new Error('An error occurred. Please try again later.')
    );
  }
}
