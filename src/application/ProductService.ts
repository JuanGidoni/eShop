import { ProductRepository } from '../domain/ports/ProductRepository';
import { Product } from '../domain/entities/Product';

/**
 * Manages product-related operations.
 */
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.getAll();
  }

  async getProductById(id: number): Promise<Product | null> {
    return this.productRepository.getById(id);
  }
}