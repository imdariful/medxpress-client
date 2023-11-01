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
  isLoading: boolean = true;

  ngOnInit(): void {
    this.productService.getRandomProducts(this.randomPageNumber).subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err) => console.log(err),
      complete: () => {
        console.log('Completed');
        this.isLoading = false;
      },
    });
  }

  handleProductClick(product: Product) {
    this.router.navigate(['/products', product?._id]);
  }
}
