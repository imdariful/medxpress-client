import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/shared/models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-product-grid',
  templateUrl: './category-product-grid.component.html',
  styleUrls: ['./category-product-grid.component.scss'],
})
export class CategoryProductGridComponent implements OnInit {
  randomPageNumber: number = Math.floor(Math.random() * 30) + 1;
  constructor(private productService: ProductService, private router: Router) {}

  products: Product[] = [];
  isLoading: boolean = false;

  /**
   * Initializes the component and fetches random products from the product service.
   * @returns void
   */
  ngOnInit(): void {
    this.isLoading = true;

    this.productService.getRandomProducts(this.randomPageNumber).subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err) => console.error(err),
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  /**
   * Navigates to the product details page when a product is clicked.
   * @param product - The product to navigate to.
   */
  handleProductClick(product: Product) {
    this.router.navigate(['/products', product?._id]);
  }
}
