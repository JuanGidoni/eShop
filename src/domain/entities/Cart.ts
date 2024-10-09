import { CartItem } from './CartItem';
import { Product } from './Product';

/**
 * Represents a shopping cart in the e-commerce system.
 */
export class Cart {
  private items: CartItem[] = [];

  /**
   * Adds a product to the cart.
   * @param product The product to add
   * @param quantity The quantity to add (default: 1)
   */
  addItem(product: Product, quantity: number = 1): void {
    const existingItem = this.items.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push(new CartItem(product, quantity));
    }
  }

  /**
   * Removes a product from the cart.
   * @param productId The ID of the product to remove
   */
  removeItem(productId: number): void {
    const index = this.items.findIndex(item => item.product.id === productId);
    if (index !== -1) {
      if (this.items[index].quantity > 1) {
        this.items[index].quantity--;
      } else {
        this.items.splice(index, 1);
      }
    }
  }

  /**
   * Clears all items from the cart.
   */
  clear(): void {
    this.items = [];
  }

  /**
   * Gets all items in the cart.
   * @returns An array of CartItems
   */
  getItems(): CartItem[] {
    return [...this.items];
  }

  /**
   * Calculates the total number of items in the cart.
   * @returns The total number of items
   */
  getTotalItems(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  /**
   * Calculates the total price of all items in the cart.
   * @returns The total price
   */
  getTotalPrice(): number {
    return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }
}