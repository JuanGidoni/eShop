import { CartStorage } from '../../domain/ports/CartStorage';
import { Cart } from '../../domain/entities/Cart';
import { Product } from '../../domain/entities/Product';

/**
 * Implements cart storage using browser's localStorage.
 */
export class LocalStorageCartStorage implements CartStorage {
  private readonly storageKey = 'cart';

  saveCart(cart: Cart): void {
    const serializedCart = JSON.stringify(cart.getItems().map(item => ({
      productId: item.product.id,
      quantity: item.quantity
    })));
    localStorage.setItem(this.storageKey, serializedCart);
  }

  loadCart(): Cart {
    const cart = new Cart();
    const serializedCart = localStorage.getItem(this.storageKey);
    if (serializedCart) {
      const items = JSON.parse(serializedCart);
      items.forEach((item: { productId: number; quantity: number }) => {
        // Note: This is a simplification. In a real app, you'd need to fetch the full product details.
        const product = new Product(item.productId, '', 0, '', '');
        cart.addItem(product, item.quantity);
      });
    }
    return cart;
  }
}