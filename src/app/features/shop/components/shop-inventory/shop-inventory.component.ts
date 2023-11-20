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
  ) { }

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

  setStockModal(val: boolean) {
    this.stockModal = val;
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
        console.log("data", data)
        this.shopAllMedicine = data;

      },
      error: (err) => {
        console.error('err', err);
      },
    });
  }

  stockModal = false
  handleAddStockBtnClick(product: any) {
    const { _id, ...res } = product
    this.medicineId = _id;
    this.shopId = String(this.shopService.getShopId());
    this.selectedProduct = { medicineId: this.medicineId, shopId: this.shopId, ...res }
    this.setStockModal(true);
  }

  itemQuantity!: number;

  addtoStock() {
    this.shopService.createStock({ ...this.selectedProduct, quantity: this.itemQuantity }).subscribe({
      next: (data) => {
        this.shopAllMedicine.unshift(data);
        this.searchResult = []
        this.stockModal = false;
        console.log('Stock added successfully', data);
      },
      error: (err) => {
        console.error('Failed to add stock', err);
      },
    });
  }

  updateStock() {
    const quantity = this.itemQuantity

    this.shopService.updateStock(this.stock[0], quantity).subscribe({
      next: (data) => {
        console.log('Stock updated successfully', data);
        this.setStockModal(false);
      },
      error: (err) => {
        console.error('Failed to update stock', err);
      },
    });
  }
}
