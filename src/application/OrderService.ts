import { Order, OrderItem } from '../domain/entities/Order';
import { User } from '../domain/entities/User';
import { CartService } from './CartService';

export class OrderService {
  private storageKey = 'orders';

  constructor(private cartService: CartService) {}

  private getOrders(): Order[] {
    const ordersJson = localStorage.getItem(this.storageKey);
    return ordersJson ? JSON.parse(ordersJson) : [];
  }

  private saveOrders(orders: Order[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(orders));
  }

  async createOrder(user: User): Promise<Order> {
    const cartItems = this.cartService.getCartItems();
    const total = this.cartService.getTotalPrice();

    const newOrder: Order = {
      id: Date.now().toString(),
      userId: user.id,
      items: cartItems.map(item => ({
        product: item.product,
        quantity: item.quantity
      })),
      total,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const orders = this.getOrders();
    orders.push(newOrder);
    this.saveOrders(orders);

    this.cartService.clearCart();

    return newOrder;
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    const orders = this.getOrders();
    return orders.filter(order => order.userId === userId);
  }

  async updateOrderStatus(orderId: string, status: Order['status']): Promise<Order> {
    const orders = this.getOrders();
    const orderIndex = orders.findIndex(order => order.id === orderId);
    if (orderIndex === -1) {
      throw new Error('Order not found');
    }

    orders[orderIndex].status = status;
    orders[orderIndex].updatedAt = new Date();
    this.saveOrders(orders);

    return orders[orderIndex];
  }
}