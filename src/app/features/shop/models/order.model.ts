export interface Order {
  _id: string;
  items: item[];
  totalPrice: number;
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  closestShop: string;
  __v: number;
}

export interface item {
  _id: string;
  dosage_form: string;
  name: string;
  price: number;
  quantity: number;
  times: number;
  days: number;
  totalAmount: number;
}

export interface OrderDetails {
  _id: string;
  items: item[];
  totalPrice: number;
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  __v: number;
}
