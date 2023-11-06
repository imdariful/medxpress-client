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

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   * Initialize the component by fetching the products by type and subscribing to the response.
   */
  ngOnInit(): void {
    this.isLoading = true;
    // Noel - make forkJoin open for extension. unlimited number of catergories should be open to addition.
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
      },
    });
  }
}
