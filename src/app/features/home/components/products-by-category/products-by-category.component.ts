import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.scss']
})
export class ProductsByCategoryComponent {
  constructor(private productService: ProductService) {}

  products: Product[] = [];
  isLoading: boolean = false;

  ngOnInit(): void {
    isLoading: true;
    this.productService.fetchProductsByType('herbal').subscribe({
      next: (products) => {
        this.products = products;
        console.log(products);
      },
      error: (err) => console.log(err),
      complete: () => {
        console.log('Completed');
        this.isLoading = false;
      },
    });
  }
}
