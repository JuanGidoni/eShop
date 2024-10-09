import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartService } from '../application/CartService';
import { LocalStorageCartStorage } from '../infrastructure/adapters/LocalStorageCartStorage';
import { Product } from '../domain/entities/Product';

const cartService = new CartService(new LocalStorageCartStorage());

interface CartContextType {
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  getCartItems: () => { product: Product; quantity: number }[];
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [, setCartUpdated] = useState(0);

  const updateCart = () => {
    setCartUpdated(prev => prev + 1);
  };

  const contextValue: CartContextType = {
    addToCart: (product, quantity = 1) => {
      cartService.addToCart(product, quantity);
      updateCart();
    },
    removeFromCart: (productId) => {
      cartService.removeFromCart(productId);
      updateCart();
    },
    clearCart: () => {
      cartService.clearCart();
      updateCart();
    },
    getCartItems: () => cartService.getCartItems(),
    getTotalItems: () => cartService.getTotalItems(),
    getTotalPrice: () => cartService.getTotalPrice(),
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};