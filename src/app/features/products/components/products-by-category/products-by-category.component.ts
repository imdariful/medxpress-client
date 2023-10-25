import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.scss'],
})
export class ProductsByCategoryComponent implements OnInit {
  constructor(private productService: ProductsService) {}

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
