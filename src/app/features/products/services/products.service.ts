import { TokenService } from './../../../shared/services/token.service';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseUrl = 'http://localhost:3000';
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

  fetchProductsByNames(name: string): Observable<Product[]> {
    return this.http
      .get<Product[]>(
        `${this.baseUrl}/medicines/find?page=1&limit=10&search=${name}`
      )
      .pipe(catchError(this.handleError));
  }

  fetchProductsByForm(dosage_form: string): Observable<Product[]> {
    return this.http
      .get<Product[]>(
        `${this.baseUrl}/medicines/find?page=1&limit=10&dosage_form=${dosage_form}`
      )
      .pipe(catchError(this.handleError));
  }

  fetchProductById(id: string): Observable<Product> {
    return this.http
      .get<Product>(`${this.baseUrl}/medicines/${id}`)
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
