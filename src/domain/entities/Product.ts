/**
 * Represents a product in the e-commerce system.
 */
export class Product {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly price: number,
    public readonly description: string,
    public readonly imageUrl: string
  ) {}
}