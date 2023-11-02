import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private accessTokenKey = 'access_token';

  constructor(private cookieService: CookieService) {}

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
   * Remove the access token from cookies.
   */
  removeAccessToken(): void {
    this.cookieService.delete(this.accessTokenKey, '/');
  }
}
