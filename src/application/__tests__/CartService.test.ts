import { CartService } from '../CartService';
import { CartStorage } from '../../domain/ports/CartStorage';
import { Product } from '../../domain/entities/Product';
import { Cart } from '../../domain/entities/Cart';

class MockCartStorage implements CartStorage {
  private cart: Cart = new Cart();

  saveCart(cart: Cart): void {
    this.cart = cart;
  }

  loadCart(): Cart {
    return this.cart;
  }
}

describe('CartService', () => {
  let cartService: CartService;
  let mockCartStorage: MockCartStorage;

  beforeEach(() => {
    mockCartStorage = new MockCartStorage();
    cartService = new CartService(mockCartStorage);
  });

  test('addToCart should add a product to the cart', () => {
    const product = new Product(1, 'Test Product', 10, 'Test Description', 'test-image.jpg');
    cartService.addToCart(product);
    expect(cartService.getTotalItems()).toBe(1);
    expect(cartService.getTotalPrice()).toBe(10);
  });

  test('removeFromCart should remove a product from the cart', () => {
    const product = new Product(1, 'Test Product', 10, 'Test Description', 'test-image.jpg');
    cartService.addToCart(product, 2);
    cartService.removeFromCart(product.id);
    expect(cartService.getTotalItems()).toBe(1);
  });

  test('clearCart should remove all items from the cart', () => {
    const product = new Product(1, 'Test Product', 10, 'Test Description', 'test-image.jpg');
    cartService.addToCart(product, 2);
    cartService.clearCart();
    expect(cartService.getTotalItems()).toBe(0);
    expect(cartService.getTotalPrice()).toBe(0);
  });
});