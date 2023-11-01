import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/shared/models/product.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.scss'],
})
export class ProductsByCategoryComponent implements OnInit {
  herbalProducts: Product[] = [];
  allopathyProducts: Product[] = [];
  isLoading: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.isLoading = true;

    forkJoin([
      this.productService.fetchProductsByType('herbal'),
      this.productService.fetchProductsByType('allopathic'),
    ]).subscribe({
      next: ([herbalProducts, allopathyProducts]) => {
        this.herbalProducts = herbalProducts;
        this.allopathyProducts = allopathyProducts;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.isLoading = false;
        console.log('Completed');
        console.log('Herbal', this.herbalProducts);
        console.log('Herbal', this.allopathyProducts);
      },
    });
  }
}
