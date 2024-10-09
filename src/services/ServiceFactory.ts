import { CartService } from '../application/CartService';
import { OrderService } from '../application/OrderService';
import { AuthService } from '../application/AuthService';
import { ProductService } from '../application/ProductService';
import { LocalStorageCartStorage } from '../infrastructure/adapters/LocalStorageCartStorage';
import { InMemoryProductRepository } from '../infrastructure/adapters/InMemoryProductRepository';
import { InMemoryAuthRepository } from '../infrastructure/adapters/InMemoryAuthRepository';

export class ServiceFactory {
  private static instance: ServiceFactory;
  private cartService: CartService;
  private orderService: OrderService;
  private authService: AuthService;
  private productService: ProductService;

  private constructor() {
    const cartStorage = new LocalStorageCartStorage();
    this.cartService = new CartService(cartStorage);
    this.orderService = new OrderService(this.cartService);
    const authRepository = new InMemoryAuthRepository();
    this.authService = new AuthService(authRepository);
    this.productService = new ProductService(new InMemoryProductRepository());
  }

  static getInstance(): ServiceFactory {
    if (!ServiceFactory.instance) {
      ServiceFactory.instance = new ServiceFactory();
    }
    return ServiceFactory.instance;
  }

  getCartService(): CartService {
    return this.cartService;
  }

  getOrderService(): OrderService {
    return this.orderService;
  }

  getAuthService(): AuthService {
    return this.authService;
  }

  getProductService(): ProductService {
    return this.productService;
  }
}