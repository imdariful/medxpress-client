import { Component, OnInit, inject } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { Order, item } from '../../models/order.model';
import { HotToastService } from '@ngneat/hot-toast';
import {
  getToastErrorMessage,
  getToastSuccessMessage,
} from 'src/app/shared/utilityFunctions';

@Component({
  selector: 'app-shop-orders',
  templateUrl: './shop-orders.component.html',
  styleUrls: ['./shop-orders.component.scss'],
})
export class ShopOrdersComponent implements OnInit {
  constructor(private shopService: ShopService) {}
  private toastService = inject(HotToastService);

  showProfileDropDown = false;
  showUpdateOrderModal = false;

  ngOnInit(): void {
    this.getAllOrders();
  }

  allOrders: any = [];
  orderDetails: Order = {} as Order;
  selectedOrderStatus: string = 'PENDING';

  async getAllOrders(): Promise<void> {
    (await this.shopService.getAllOrders()).subscribe({
      next: (response) => {
        this.allOrders = response;
        console.log(this.allOrders);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getTotalPrice(items: any): number {
    let totalPrice = 0;

    for (let item of items) {
      totalPrice += item.price * item.quantity;
    }

    return totalPrice;
  }

  handleOrderUpdateBtnClick(id: string) {
    this.orderDetails = this.allOrders.find((order: any) => order._id === id);

    const orderModal = document.querySelector('#orderModal');
    if (orderModal != null) {
      orderModal.classList.add('modal-open');
    }
  }

  closeOrderModal() {
    const orderModal = document.querySelector('#orderModal');
    if (orderModal != null) {
      orderModal.classList.remove('modal-open');
    }
  }

  onStatusChange(event: any) {
    this.selectedOrderStatus = event.target.value;
    console.log(this.selectedOrderStatus);
  }

  handleStatusUpdateClick() {
    this.shopService
      .updateOrderStatus(this.orderDetails, this.selectedOrderStatus)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.closeOrderModal();
          this.getAllOrders();
          this.toastService.success(
            'Updated Successfully!',
            getToastSuccessMessage()
          );
        },
        error: (error) => {
          this.toastService.error(
            'Ops! - something went wrong.',
            getToastErrorMessage()
          );
          console.error(error);
        },
      });
  }
}
