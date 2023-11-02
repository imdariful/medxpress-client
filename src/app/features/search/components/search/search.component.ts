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

  setImage(product: Product) {
    return setImage(product);
  }

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
