import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { Product } from 'src/app/shared/models/product.model';
import { setImage } from 'src/app/shared/utilityFunctions';
import { ProductService } from 'src/app/features/home/services/product.service';

@Component({
  selector: 'app-shop-inventory',
  templateUrl: './shop-inventory.component.html',
  styleUrls: ['./shop-inventory.component.scss'],
})
export class ShopInventoryComponent {
  constructor(
    private shopService: ShopService,
    private productService: ProductService
  ) {}
  showProfileDropDown = false;
  allOrders: any = [];

  searchResult: Product[] = [];

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
            this.searchResult = response;
          },
          error: (err) => {
            console.error('err', err);
          },
        });
      } else {
        this.searchResult = [];
      }
    }
  }
}
