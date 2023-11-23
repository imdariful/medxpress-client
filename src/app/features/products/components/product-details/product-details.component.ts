import { CartService } from 'src/app/features/cart/services/cart.service';
import { ProductsService } from './../../services/products.service';
import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';

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

  private toastService = inject(HotToastService);

  isLoading: boolean = false;

  id: string | null = this.route.snapshot.paramMap.get('id');

  product: Product | undefined;

  imgSrc: string = '';

  quantityForm: FormGroup;

  totalQuantity: number = 1;

  totalPrice: number = 0;

  /**
   * Sets the image source based on the dosage form of the product.
   * @returns void
   */


  images:any={
    'Syrup': 'assets/icons/syrup.svg',
    'Ophthalmic Suspension': 'assets/icons/suspension.svg',
    'Powder for Suspension': 'assets/icons/suspension.svg',
    'Capsule': 'assets/icons/capsule.svg',
    'Tablet': 'assets/icons/capsule.svg',
    'IV Infusion': 'assets/icons/injection.svg',
    'IM/IV Injection': 'assets/icons/injection.svg',
    'Cream': 'assets/icons/ointment.svg'
  }

  setImage() {
    if (this.product !== undefined) {
      this.imgSrc = this.images[this.product.dosage_form];
    }
  }


  
  /**
   * Initializes the component.
   * Fetches the product by id and sets the product, image and total price.
   */
  ngOnInit(): void {
    this.isLoading = true;
    this.productsService.fetchProductById(this.id).subscribe((product) => {
      this.product = product;
      this.setImage();
      this.totalPrice = parseFloat(this.product.price);
    });
    this.isLoading = false;
  }

  /**
   * Increases the total quantity of the product and updates the total price accordingly.
   */
  increaseQuantity() {
    this.totalQuantity++;
    this.totalPrice = this.totalQuantity * parseFloat(this.product!.price);
  }
  /**
   * Decreases the total quantity of the product by 1 and updates the total price accordingly.
   * If the total quantity is already 1, the method does nothing.
   */
  decreaseQuantity() {
    if (this.totalQuantity > 1) {
      this.totalQuantity--;
      this.totalPrice = this.totalQuantity * parseFloat(this.product!.price);
    }
  }
  /**
   * Calculates the total quantity and price based on the selected number of days and times.
   */
  calculateTotalQuantity() {
    this.totalQuantity =
      this.quantityForm.value.days * this.quantityForm.value.times;
    this.totalPrice = this.totalQuantity * parseFloat(this.product!.price);
  }

  /**
   * Handles the click event when the user clicks on the "Add to Cart" button.
   * Adds the product to the cart with the selected quantity and displays a success toast message.
   */
  handleAddToCartClick() {
    this.cartService.addToCart(
      this.product!,
      this.totalQuantity,
      this.quantityForm.value.days,
      this.quantityForm.value.times
    );
    this.totalPrice = this.totalQuantity * parseFloat(this.product!.price);
    this.toastService.success('Added to cart', {
      icon: '✔',
      position: 'top-center',
      duration: 2000,
      style: {
        border: '1px solid #067A46',
        padding: '16px',
        color: '#067A46',
        background: '#D2F895',
        fontFamily: 'Agrandir-Regular',
      },
    });
  }
}
