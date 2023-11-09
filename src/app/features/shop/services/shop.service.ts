import { OrderDetails } from './../models/order.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getBaseUrl } from 'src/app/shared/utilityFunctions';
import { CreateShopDto } from '../models/shop.model';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private http: HttpClient) {}

  getAllOrders() {
    return this.http.get(`${getBaseUrl()}/orders`);
  }

  updateOrderStatus(orderDetails: OrderDetails, status: string) {
    return this.http.put(`${getBaseUrl()}/orders/${orderDetails._id}`, {
      ...orderDetails,
      orderStatus: status,
    });
  }

  registerShop(shopDetails: CreateShopDto) {
    return this.http.post(`${getBaseUrl()}/auth/register-shop`, shopDetails);
  }

  loginShop(shopDetails: { email: string; password: string }): Observable<any> {
    const loginUrl = `${getBaseUrl()}/auth/login-shop`;
    return this.http
      .post(loginUrl, shopDetails)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('HTTP Error:', error);
    return throwError(
      () => new Error('An error occurred. Please try again later.')
    );
  }
}
