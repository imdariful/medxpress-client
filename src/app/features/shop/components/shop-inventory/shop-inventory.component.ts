import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { ProductService } from 'src/app/features/home/services/product.service';
import { Product } from 'src/app/shared/models/product.model';
import { setImage } from 'src/app/shared/utilityFunctions';
import { ShopService } from '../../services/shop.service';
import { Stock } from '../../models/stock.model';

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
  medicineId: string = '';
  searchResult: Product[] = [];
  imgSrc = '';
  selectedProduct: any | null = null;
  stock: Stock[] = [];
  shopId: string = '';

  btnText: string = 'Add Stock';

  addToStockForm: FormGroup = this.fb.group({
    quantity: null,
  });

  get quantity() {
    return this.addToStockForm.value.quantity;
  }

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
    if (stockModal !== null) {
      stockModal.classList.remove('modal-open');
      this.addToStockForm.value.quantity = null;
      console.log(this.addToStockForm.value.quantity);
    }
  }

  searchStocks(medicineId: string, shopId: string) {
    this.shopService
      .searchStockByMedicineAndShop(medicineId, shopId)
      .subscribe({
        next: (res) => {
          this.stock = res;
          return this.stock;
        },
        error: (err) => {
          console.error(err);
        },
      });
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

  handleAddStockBtnClick(product: any) {
    this.medicineId = product._id;
    this.shopId = String(this.shopService.getShopId());

    this.searchStocks(String(this.medicineId), String(this.shopId));

    if (this.stock.length > 0) {
      this.btnText = 'Update Stock';
    }

    console.log(`
    Medicine ID: ${this.medicineId},
    ShopId: ${this.shopId}
    `);

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
        if (stockModal !== null && this.selectedProduct !== null) {
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

    if (this.stock.length > 0) {
      // If stock exists, update it
      this.btnText = 'Update Stock';

      if (this.addToStockForm.valid) {
        console.log('here');
        console.log(typeof quantity);

        this.shopService.updateStock(this.stock[0], quantity).subscribe({
          next: (data) => {
            console.log('Stock updated successfully', data);
          },
          error: (err) => {
            console.error('Failed to update stock', err);
          },
        });
      } else {
        console.error('Form is not valid');
      }
    } else {
      // Create new stock
      this.btnText = 'Add To Stock';

      if (this.addToStockForm.valid) {
        this.shopService
          .createStock(this.medicineId, quantity, this.shopId)
          .subscribe({
            next: (data) => {
              console.log('Stock added successfully', data);
            },
            error: (err) => {
              console.error('Failed to add stock', err);
            },
          });
      } else {
        console.error('Form is not valid');
      }
    }
  }
}
