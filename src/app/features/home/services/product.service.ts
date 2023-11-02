import { Injectable } from '@angular/core';
import { TokenService } from 'src/app/shared/services/token.service';
import { Observable, catchError, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Product } from 'src/app/shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // ! CHANGE HERE
  baseUrl = 'https://medxpress-wef4.onrender.com';
  randomPage = Math.floor(Math.random() * 30) + 1;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  // fetchProducts by type herbal or allopathy
  fetchProductsByType(type: string): Observable<Product[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.tokenService.getAccessToken()}`,
    });
    return this.http
      .get<Product[]>(
        `${this.baseUrl}/medicines/find?page=1&limit=10&type=${type}`,
        { headers }
      )
      .pipe(catchError(this.handleError));
  }

  // fetchProducts by name
  searchProduct(name: string): Observable<Product[]> {
    const headers = this.getHeaders();
    return this.http
      .get<Product[]>(
        `${this.baseUrl}/medicines/find?page=1&limit=5&search=${name}`,
        { headers }
      )
      .pipe(catchError(this.handleError));
  }

  // fetchProducts by dosage form
  fetchProductsByForm(dosage_form: string): Observable<Product[]> {
    return this.http
      .get<Product[]>(
        `${this.baseUrl}/medicines/find?page=1&limit=10&dosage_form=${dosage_form}`
      )
      .pipe(catchError(this.handleError));
  }

  // fetchProducts by product id
  fetchProductById(id: any): Observable<Product> {
    const headers = this.getHeaders();

    return this.http
      .get<Product>(`${this.baseUrl}/medicines/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  // Get Headers

  getHeaders() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.tokenService.getAccessToken()}`,
    });
    return headers;
  }

  // fetchProducts random
  getRandomProducts(page: number): Observable<Product[]> {
    const headers = this.getHeaders();
    return this.http
      .get<Product[]>(`${this.baseUrl}/medicines/find?page=${page}&limit=5`, {
        headers,
      })
      .pipe(catchError(this.handleError));
  }

  // handle error
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
