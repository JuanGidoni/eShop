import { LocalStorageCartStorage } from '../LocalStorageCartStorage';
import { Cart } from '../../../domain/entities/Cart';
import { Product } from '../../../domain/entities/Product';

describe('LocalStorageCartStorage', () => {
  let storage: LocalStorageCartStorage;
  let mockLocalStorage: { [key: string]: string };

  beforeEach(() => {
    mockLocalStorage = {};
    global.localStorage = {
      getItem: (key: string) => mockLocalStorage[key] || null,
      setItem: (key: string, value: string) => { mockLocalStorage[key] = value; },
      removeItem: (key: string) => delete mockLocalStorage[key],
      clear: () => { mockLocalStorage = {}; },
      length: 0,
      key: (_index: number) => null,
    };
    storage = new LocalStorageCartStorage();
  });

  test('saveCart should store cart data in localStorage', () => {
    const cart = new Cart();
    const product = new Product(1, 'Test Product', 10, 'Test Description', 'test-image.jpg');
    cart.addItem(product, 2);

    storage.saveCart(cart);

    const storedData = JSON.parse(mockLocalStorage['cart']);
    expect(storedData).toHaveLength(1);
    expect(storedData[0].productId).toBe(1);
    expect(storedData[0].quantity).toBe(2);
  });

  test('loadCart should retrieve cart data from localStorage', () => {
    mockLocalStorage['cart'] = JSON.stringify([
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 1 },
    ]);

    const loadedCart = storage.loadCart();

    expect(loadedCart.getItems()).toHaveLength(2);
    expect(loadedCart.getTotalItems()).toBe(3);
  });

  test('loadCart should return empty cart when localStorage is empty', () => {
    const loadedCart = storage.loadCart();

    expect(loadedCart.getItems()).toHaveLength(0);
    expect(loadedCart.getTotalItems()).toBe(0);
  });
});