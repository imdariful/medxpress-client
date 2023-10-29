import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/features/cart/services/cart.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product: Product | undefined;

  constructor(private router: Router, private cartService: CartService) {}

  showModal = false;
  imgSrc: string = '';

  setImage() {
    if (this.product) {
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

  productDetailsView() {
    this.router.navigate(['/products', this.product?._id]);
  }

  ngOnInit(): void {
    this.setImage();
  }

  handleAddToCart() {
    this.showModal = true;
  }
}
