import { OrderDetails } from './../models/order.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getBaseUrl } from 'src/app/shared/utilityFunctions';

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
}
