import { Cart } from '../entities/Cart';

/**
 * Defines the interface for cart storage.
 */
export interface CartStorage {
  saveCart(cart: Cart): void;
  loadCart(): Cart;
}