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

  registerCustomer(customerData: CustomerRegister): Observable<any> {
    const registrationUrl = `${this.baseUrl}/auth/signup/`;
    return this.http
      .post(registrationUrl, customerData)
      .pipe(catchError(this.handleError));
  }

  loginCustomer(loginData: CustomerLogin): Observable<any> {
    const loginUrl = `${this.baseUrl}/auth/login/`;
    return this.http
      .post(loginUrl, loginData)
      .pipe(catchError(this.handleError));
  }

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

  getCustomer(): Observable<any> {
    const customerId = this.getCustomerId();
    if (customerId) {
      const customerUrl = `${this.baseUrl}/auth/user/${customerId}`;
      return this.http.get(customerUrl).pipe(catchError(this.handleError));
    }
    return throwError('Invalid customer id');
  }

  checkDuplicateEmail(email: string | null): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/check-email`, { email });
  }

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

  getAccessToken(): string | null {
    return this.cookieService.get(this.accessTokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  logout(): void {
    this.cookieService.delete(this.accessTokenKey);
  }

  getOrdersByUserId(customerId: string | null): Observable<any> {
    // const customerId = this.getCustomerId();
    if (customerId) {
      const ordersUrl = `${this.baseUrl}/orders/user/${customerId}`;
      return this.http.get(ordersUrl).pipe(catchError(this.handleError));
    }
    return throwError(() => new Error('Invalid customer id'));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('HTTP Error:', error);
    return throwError(
      () => new Error('An error occurred. Please try again later.')
    );
  }
}
