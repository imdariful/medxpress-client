import { CartService } from 'src/app/features/cart/services/cart.service';
import { ProductsService } from './../../services/products.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    private productsService: ProductsService,
    private formBuilder: FormBuilder,
    private cartService: CartService
  ) {
    this.quantityForm = this.formBuilder.group({
      days: [0, Validators.required],
      times: [1, Validators.required],
    });
  }

  id: string | null = this.route.snapshot.paramMap.get('id');

  product: Product | undefined;

  imgSrc: string = '';

  quantityForm: FormGroup;

  totalQuantity: number = 1;

  totalPrice: number = 0;

  // @Input('ngModel') quantity: number = 1;

  setImage() {
    if (this.product !== undefined) {
      switch (this.product.dosage_form) {
        case 'Syrup':
          this.imgSrc = 'assets/icons/syrup.svg';
          break;
        case 'Ophthalmic Suspension' || 'Powder for Suspension':
          this.imgSrc = 'assets/icons/suspension.svg';
          break;
        case 'Capsule' || 'Tablet':
          this.imgSrc = 'assets/icons/capsule.svg';
          break;
        case 'IV Infusion' || 'IM/IV Injection':
          this.imgSrc = 'assets/icons/injection.svg';
          break;
        case 'Cream':
          this.imgSrc = 'assets/icons/ointment.svg';
          break;
        default:
          this.imgSrc = 'assets/icons/capsule.svg';
          break;
      }
    }
  }

  ngOnInit(): void {
    this.productsService.fetchProductById(this.id).subscribe((product) => {
      this.product = product;
      this.setImage();
      this.totalPrice = parseFloat(this.product.price);
    });
  }

  increaseQuantity() {
    this.totalQuantity++;
    this.totalPrice = this.totalQuantity * parseFloat(this.product!.price);
  }
  decreaseQuantity() {
    if (this.totalQuantity > 1) {
      this.totalQuantity--;
      this.totalPrice = this.totalQuantity * parseFloat(this.product!.price);
    }
  }
  calculateTotalQuantity() {
    this.totalQuantity =
      this.quantityForm.value.days * this.quantityForm.value.times;
    this.totalPrice = this.totalQuantity * parseFloat(this.product!.price);
  }

  handleAddToCartClick() {
    this.cartService.addToCart(
      this.product!,
      this.totalQuantity,
      this.quantityForm.value.days,
      this.quantityForm.value.times
    );
    this.totalPrice = this.totalQuantity * parseFloat(this.product!.price);
  }
}
