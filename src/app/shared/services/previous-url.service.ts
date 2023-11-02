import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PreviousUrlService {
  private previousUrl: string | null = null;

  /**
   * Set previous url.
   * @param url The URL to set as the previous URL.
   */
  setPreviousUrl(url: string): void {
    this.previousUrl = url;
  }

  /**
   * Get previous url.
   * @returns The previous URL, or null if not found.
   */
  getPreviousUrl(): string | null {
    return this.previousUrl;
  }
}
