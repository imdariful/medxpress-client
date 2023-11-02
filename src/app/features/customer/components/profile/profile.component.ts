/**
 * @description This component is responsible for displaying the customer's profile and their orders.
 *
 * @remarks
 * This component depends on the following services:
 * - CustomerServicesService
 *
 * This component uses the following models:
 * - Orders
 *
 * @example
 * <app-profile></app-profile>
 */
import { Component, OnInit } from '@angular/core';
import { CustomerServicesService } from '../../services/customer-services.service';
import { Orders } from '../../models/orders';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private customerService: CustomerServicesService) {}

  customerDetails: any;
  orders: Orders[] = [];

  /**
   * Initializes the component.
   * Retrieves the customer details and orders by user id.
   */
  ngOnInit(): void {
    const customerId: string | null = this.customerService.getCustomerId();
    if (customerId) {
      this.customerService.getCustomer().subscribe({
        next: (data) => {
          this.customerDetails = data;
        },
        error: (error) => {
          console.error(error);
        },
      });
    }

    // get orders by user id
    if (customerId) {
      this.getOrdersByUserId(customerId);
    }
  }

  /**
   * Retrieves orders for a given customer ID.
   * @param customerId The ID of the customer to retrieve orders for.
   */
  getOrdersByUserId(customerId: string): void {
    this.customerService.getOrdersByUserId(customerId).subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {},
    });
  }
}
