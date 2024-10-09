import { Cart } from '../Cart';
import { Product } from '../Product';
import { CartItem } from '../CartItem';

describe('Cart', () => {
  let cart: Cart;
  let product: Product;

  beforeEach(() => {
    cart = new Cart();
    product = new Product(1, 'Test Product', 10, 'Test Description', 'test-image.jpg');
  });

  test('addItem should add a new item to the cart', () => {
    cart.addItem(product);
    expect(cart.getItems()).toHaveLength(1);
    expect(cart.getItems()[0].product).toEqual(product);
    expect(cart.getItems()[0].quantity).toBe(1);
  });

  test('addItem should increase quantity for existing item', () => {
    cart.addItem(product);
    cart.addItem(product);
    expect(cart.getItems()).toHaveLength(1);
    expect(cart.getItems()[0].quantity).toBe(2);
  });

  test('removeItem should decrease quantity', () => {
    cart.addItem(product, 2);
    cart.removeItem(product.id);
    expect(cart.getItems()[0].quantity).toBe(1);
  });

  test('removeItem should remove item when quantity becomes 0', () => {
    cart.addItem(product);
    cart.removeItem(product.id);
    expect(cart.getItems()).toHaveLength(0);
  });

  test('clear should remove all items', () => {
    cart.addItem(product);
    cart.clear();
    expect(cart.getItems()).toHaveLength(0);
  });

  test('getTotalItems should return correct total', () => {
    cart.addItem(product, 2);
    cart.addItem(new Product(2, 'Another Product', 20, 'Description', 'image.jpg'), 3);
    expect(cart.getTotalItems()).toBe(5);
  });

  test('getTotalPrice should return correct total', () => {
    cart.addItem(product, 2);
    cart.addItem(new Product(2, 'Another Product', 20, 'Description', 'image.jpg'), 3);
    expect(cart.getTotalPrice()).toBe(80);
  });
});