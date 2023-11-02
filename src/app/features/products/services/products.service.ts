import { TokenService } from './../../../shared/services/token.service';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // ! CHANGE HERE
  baseUrl = 'https://medxpress-wef4.onrender.com';
  randomPage = Math.floor(Math.random() * 30) + 1;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  /**
   * Fetches a product by its ID.
   * @param id The ID of the product to fetch.
   * @returns An Observable that emits the fetched Product.
   */
  fetchProductById(id: any): Observable<Product> {
    const headers = this.getHeaders();

    return this.http
      .get<Product>(`${this.baseUrl}/medicines/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Returns the HTTP headers with the authorization token.
   * @returns The HTTP headers with the authorization token.
   */
  getHeaders() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.tokenService.getAccessToken()}`,
    });
    return headers;
  }

  /**
   * Handles HTTP errors.
   * @param error - The HttpErrorResponse object.
   * @returns An Observable that emits an Error object.
   */
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
