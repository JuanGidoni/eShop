import { Product } from './Product';

/**
 * Represents an item in the shopping cart.
 */
export class CartItem {
  constructor(
    public readonly product: Product,
    public quantity: number
  ) {}

  /**
   * Calculates the total price for this cart item.
   * @returns The total price of the item (price * quantity)
   */
  getTotalPrice(): number {
    return this.product.price * this.quantity;
  }
}