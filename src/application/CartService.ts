import { Cart } from '../domain/entities/Cart';
import { Product } from '../domain/entities/Product';
import { CartStorage } from '../domain/ports/CartStorage';

export class CartService {
  private cart: Cart;

  constructor(private cartStorage: CartStorage) {
    this.cart = this.cartStorage.loadCart();
  }

  addToCart(product: Product, quantity: number = 1): void {
    this.cart.addItem(product, quantity);
    this.cartStorage.saveCart(this.cart);
  }

  removeFromCart(productId: number): void {
    this.cart.removeItem(productId);
    this.cartStorage.saveCart(this.cart);
  }

  clearCart(): void {
    this.cart.clear();
    this.cartStorage.saveCart(this.cart);
  }

  getCartItems() {
    return this.cart.getItems();
  }

  getTotalItems(): number {
    return this.cart.getTotalItems();
  }

  getTotalPrice(): number {
    return this.cart.getTotalPrice();
  }
}