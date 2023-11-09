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
  totalPendingStatus: number = 0;
  totalEarnings: number = 0;

  async getAllOrders(): Promise<void> {
    (await this.shopService.getAllOrders()).subscribe({
      next: (response) => {
        this.allOrders = response;

        this.totalPendingStatus = this.allOrders.filter(
          (order: any) => order.orderStatus === 'PENDING'
        ).length;

        this.totalEarnings = this.getTotalEarnings();
        console.log(this.totalEarnings);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getTotalEarnings(): number {
    let totalEarnings: number = 0;

    for (let order of this.allOrders) {
      if (order.orderStatus === 'COMPLETED') {
        totalEarnings += this.getTotalPrice(order.items);
      }
    }

    return totalEarnings;
  }

  getTotalPrice(items: any): number {
    let totalPrice: number = 0;

    for (let item of items) {
      let price = Number(item.price);
      if (!isNaN(price)) {
        totalPrice += price * item.quantity;
      }
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

  handleOrderAllItemBtnClick(id: string) {
    this.orderDetails = this.allOrders.find((order: any) => order._id === id);
    const orderAllItemModal = document.querySelector('#orderAllItemModal');
    if (orderAllItemModal != null) {
      orderAllItemModal.classList.add('modal-open');
    }
  }

  closeOrderModal() {
    const orderModal = document.querySelector('#orderModal');
    if (orderModal != null) {
      orderModal.classList.remove('modal-open');
    }
  }

  closeOrderAllItemModal() {
    const orderAllItemModal = document.querySelector('#orderAllItemModal');
    if (orderAllItemModal != null) {
      orderAllItemModal.classList.remove('modal-open');
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

  handleAddNewOrderClick() {
    //
    this.toastService.error(
      'Need time more to implement',
      getToastErrorMessage()
    );
  }
}
