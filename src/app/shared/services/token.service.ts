import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private accessTokenKey = 'access_token';

  constructor(private cookieService: CookieService) {}

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
}
