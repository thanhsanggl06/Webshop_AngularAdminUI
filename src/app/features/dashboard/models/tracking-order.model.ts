import { Product } from '../../product/models/product.model';
import { Customer } from './customer.model';

export interface TrackingOrder {
  id: number;
  customer: Customer;
  amount: number;
  shippingAddress: string;
  orderDate: Array<number>;
  orderStatus: string;
  orderDetails: Array<TrackingOrderDetails>;
}

export interface TrackingOrderDetails {
  product: Product;
  quantity: number;
  price: number;
}
