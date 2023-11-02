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
