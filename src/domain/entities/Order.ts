import { Product } from './Product';

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  createdAt: Date;
  updatedAt: Date;
}