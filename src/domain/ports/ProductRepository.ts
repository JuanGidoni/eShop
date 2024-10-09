import { Product } from '../entities/Product';

/**
 * Defines the interface for product data access.
 */
export interface ProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: number): Promise<Product | null>;
}