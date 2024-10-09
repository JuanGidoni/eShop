import { ProductRepository } from '../../domain/ports/ProductRepository';
import { Product } from '../../domain/entities/Product';

export class InMemoryProductRepository implements ProductRepository {
  private products: Product[] = [
    new Product(1, 'Wireless Earbuds', 99.99, 'High-quality wireless earbuds with noise cancellation.', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80'),
    new Product(2, 'Smart Watch', 199.99, 'Feature-packed smartwatch with health tracking capabilities.', 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80'),
    new Product(3, 'Portable Charger', 49.99, 'High-capacity portable charger for all your devices.', 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80'),
    new Product(4, 'Bluetooth Speaker', 79.99, 'Waterproof Bluetooth speaker with amazing sound quality.', 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80'),
    new Product(5, 'Laptop Backpack', 59.99, 'Comfortable and spacious backpack for your laptop and accessories.', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80'),
    new Product(6, 'Wireless Mouse', 29.99, 'Ergonomic wireless mouse for improved productivity.', 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80'),
  ];

  async getAll(): Promise<Product[]> {
    return this.products;
  }

  async getById(id: number): Promise<Product | null> {
    return this.products.find(p => p.id === id) || null;
  }
}