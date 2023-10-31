import { Component, OnInit } from '@angular/core';
import { CustomerServicesService } from '../../services/customer-services.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private customerService: CustomerServicesService) {}

  customerDetails: any;

  ngOnInit(): void {
    const customerId = this.customerService.getCustomerId();
    if (customerId) {
      this.customerService.getCustomer().subscribe({
        next: (data) => {
          this.customerDetails = data;
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
