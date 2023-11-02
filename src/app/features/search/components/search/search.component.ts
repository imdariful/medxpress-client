import { Component } from '@angular/core';
import { ProductService } from 'src/app/features/home/services/product.service';
import { Product } from 'src/app/shared/models/product.model';

import { setImage } from '../../../../shared/utilityFunctions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  constructor(private productService: ProductService) {}
  serachResult: Product[] = [];

  imgSrc: string = '';

  /**
   * Sets the image for a given product.
   * @param product - The product to set the image for.
   * @returns The image for the given product.
   */
  setImage(product: Product) {
    return setImage(product);
  }

  /**
   * Searches for a product based on the user's input.
   * @param query - The keyboard event triggered by the user's input.
   */
  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      if (element.value.length > 1) {
        this.productService.searchProduct(element.value).subscribe({
          next: (response) => {
            this.serachResult = response;
          },
          error: (err) => {
            console.error('err', err);
          },
        });
      } else {
        this.serachResult = [];
      }
    }
  }
}
