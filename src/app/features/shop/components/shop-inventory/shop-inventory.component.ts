import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { ProductService } from 'src/app/features/home/services/product.service';
import { Product } from 'src/app/shared/models/product.model';
import { setImage } from 'src/app/shared/utilityFunctions';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-shop-inventory',
  templateUrl: './shop-inventory.component.html',
  styleUrls: ['./shop-inventory.component.scss'],
})
export class ShopInventoryComponent implements OnInit {
  constructor(
    private shopService: ShopService,
    private productService: ProductService,
    private toastService: HotToastService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getStocksByShopId();
  }
  shopAllMedicine: any[] = [];

  showProfileDropDown = false;
  medicineId = '';
  searchResult: Product[] = [];
  imgSrc = '';
  selectedProduct: Product | null = null;

  // Define the form group with 'quantity' and 'medicineId' controls
  addToStockForm: FormGroup = this.fb.group({
    quantity: [0],
  });

  setImage(product: Product) {
    return setImage(product);
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      if (element.value.length > 1) {
        this.productService.searchProduct(element.value).subscribe({
          next: (response) => {
            this.searchResult = response;
          },
          error: (err) => {
            console.error('err', err);
          },
        });
      } else {
        this.searchResult = [];
      }
    }
  }

  closeStockModal() {
    const stockModal = document.querySelector('#stockModal');
    if (stockModal != null) {
      stockModal.classList.remove('modal-open');
    }
  }

  handleAddStockBtnClick(product: any) {
    this.medicineId = product._id;

    for (let i = 0; i < this.shopAllMedicine.length; i++) {
      if (this.shopAllMedicine[i].medicineId === product._id) {
        this.selectedProduct = {
          ...product,
          quantity: this.shopAllMedicine[i].quantity,
        };
        this.addToStockForm.patchValue({
          quantity: this.shopAllMedicine[i].quantity,
        });
        break;
      }
    }

    this.shopService.getStocksByShopId().subscribe({
      next: (data) => {
        const selectedProduct = data.find(
          (stock: any) => stock.medicineId === product._id
        );
        if (selectedProduct) {
          this.selectedProduct = {
            ...product,
            quantity: selectedProduct.quantity,
          };
          this.addToStockForm.patchValue({
            quantity: selectedProduct.quantity,
          });
        } else {
          this.selectedProduct = product;
        }
        const stockModal = document.querySelector('#stockModal');
        if (stockModal != null && this.selectedProduct != null) {
          stockModal.classList.add('modal-open');
        }
      },
      error: (err) => {
        console.error('err', err);
      },
    });
  }

  addToStockFormSubmit() {
    const quantity = this.addToStockForm.get('quantity')?.value;

    if (quantity) {
      this.shopService.addToStock(this.medicineId, quantity).subscribe({
        next: () => {
          this.toastService.success('Stock added successfully');
          this.closeStockModal();
        },
        error: (err) => {
          console.error('err', err);
          this.toastService.error('Failed to add stock');
        },
      });
    }
  }

  getStocksByShopId() {
    this.shopService.getStocksByShopId().subscribe({
      next: (data) => {
        this.shopAllMedicine = data;
      },
      error: (err) => {
        console.error('err', err);
      },
    });
  }
}
