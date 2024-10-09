import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../domain/entities/User';
import { useServices } from './ServiceContext';

interface ShippingInfo {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentMethod {
  cardNumber: string;
  cardHolder: string;
  expirationDate: string;
  cvv: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
  updateShippingInfo: (shippingInfo: ShippingInfo) => Promise<void>;
  addPaymentMethod: (paymentMethod: PaymentMethod) => Promise<void>;
  removePaymentMethod: (index: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const services = useServices();
  const authService = services.getAuthService();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authService.getUserData(token)
        .then(setUser)
        .catch(() => localStorage.removeItem('token'));
    }
  }, [authService]);

  const login = async (email: string, password: string) => {
    const { user, token } = await authService.login(email, password);
    setUser(user);
    localStorage.setItem('token', token);
  };

  const register = async (name: string, email: string, password: string) => {
    const { user, token } = await authService.register(name, email, password);
    setUser(user);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const updateUser = async (userData: Partial<User>) => {
    if (user) {
      const updatedUser = await authService.updateUser(user.id, userData);
      setUser(updatedUser);
    }
  };

  const updateShippingInfo = async (shippingInfo: ShippingInfo) => {
    if (user) {
      const updatedUser = await authService.updateShippingInfo(user.id, shippingInfo);
      setUser(updatedUser);
    }
  };

  const addPaymentMethod = async (paymentMethod: PaymentMethod) => {
    if (user) {
      const updatedUser = await authService.addPaymentMethod(user.id, paymentMethod);
      setUser(updatedUser);
    }
  };

  const removePaymentMethod = async (index: number) => {
    if (user) {
      const updatedUser = await authService.removePaymentMethod(user.id, index);
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateUser,
      updateShippingInfo,
      addPaymentMethod,
      removePaymentMethod
    }}>
      {children}
    </AuthContext.Provider>
  );
};