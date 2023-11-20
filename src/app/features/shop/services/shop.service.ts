import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { getBaseUrl } from 'src/app/shared/utilityFunctions';
import { CreateShopDto } from '../models/shop.model';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenService } from 'src/app/shared/services/token.service';
import { OrderDetails } from '../models/order.model';
import { Stock } from '../models/stock.model';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getAllOrders() {
    return this.http.get(`${getBaseUrl()}/orders`);
  }

  /*   updateOrderStatus(orderDetails: OrderDetails, status: string) {
    if (status === 'COMPLETED') {
      const shopId = this.getShopId();
      // decrease stock
      for (let item of orderDetails.items) {
        this.searchStockByMedicineAndShop(item._id, shopId).subscribe({
          next: (data) => {
            const stock = data[0];
            this.updateStock(stock, stock.quantity - item.quantity).subscribe({
              next: (data) => {
                console.log(data);
              },
              error: (err) => {
                console.error(err);
              },
            });
          },
          error: (err) => {
            console.error(err);
          },
        });
      }
    }

    return this.http.put(`${getBaseUrl()}/orders/${orderDetails._id}`, {
      ...orderDetails,
      orderStatus: status,
    });
  } */

  updateOrderStatus(orderDetails: OrderDetails, status: string) {
    if (status === 'COMPLETED') {
      const shopId = this.getShopId();

      // Check if shopId is not null before making the API call
      if (shopId) {
        for (let item of orderDetails.items) {
          this.searchStockByMedicineAndShop(item._id, shopId).subscribe({
            next: (data) => {
              const stock = data[0];
              this.updateStock(stock, stock.quantity - item.quantity).subscribe(
                {
                  next: (data) => {
                    console.log(data);
                  },
                  error: (err) => {
                    console.error(err);
                  },
                }
              );
            },
            error: (err) => {
              console.error(err);
            },
          });
        }
      }
    }

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

  getShopId(): string | null {
    const token = this.tokenService.getAccessToken();
    console.log("token", token)
    if (token) {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      const shopId = JSON.parse(decodedPayload).id;
      return shopId;
    }
    return null;
  }

  getStocksByShopId(): Observable<any> {
    return this.http.get(`${getBaseUrl()}/stocks/shop/${this.getShopId()}`);
  }

  createStock(data: any) {
    console.log(data)
    return this.http.post(`${getBaseUrl()}/stocks`, data);
  }

  addToStock(medicineId: string, quantity: number): Observable<any> {
    return new Observable<any>((observer) => {
      this.getStockIdByMedicineId(medicineId).subscribe({
        next: (data) => {
          const stockId = data[0]._id;
          this.updateStock(stockId, quantity).subscribe({
            next: (data) => {
              observer.next(data);
              observer.complete();
            },
            error: (err) => {
              observer.error(err);
            },
          });
        },
        error: (err) => {
          observer.error(err);
        },
      });
    });
  }

  updateStock(stock: Stock, quantity: number) {
    const stockId = stock._id;
    return this.http.put(`${getBaseUrl()}/stocks/${stockId}`, {
      ...stock,
      quantity,
    });
  }

  getStockIdByMedicineId(medicineId: string): Observable<any> {
    return this.http.get(`${getBaseUrl()}/stocks/medicine/${medicineId}`);
  }

  searchStockByMedicineAndShop(
    medicineId: string,
    shopId: string
  ): Observable<Stock[]> {
    const params = new HttpParams()
      .set('medicineId', medicineId)
      .set('shopId', shopId);

    return this.http.get<Stock[]>(
      `${getBaseUrl()}/stocks/search/medicine-and-shop`,
      {
        params,
      }
    );
  }
}
