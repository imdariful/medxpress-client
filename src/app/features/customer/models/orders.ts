import { CartItem } from '../../cart/models/cart.model';

export enum OrderStatus {
  DELIVERED = 'DELIVERED',
  SHIPPED = 'SHIPPED',
  PENDING = 'PENDING',
  CANCELED = 'CANCELED',
}

export interface Orders {
  _id: string;
  userId: string;
  orderStatus: OrderStatus;
  createdAt: string;
  items: CartItem[];
}
