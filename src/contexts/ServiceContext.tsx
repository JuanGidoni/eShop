import React, { createContext, useContext } from 'react';
import { ServiceFactory } from '../services/ServiceFactory';

const ServiceContext = createContext<ServiceFactory | undefined>(undefined);

export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const serviceFactory = ServiceFactory.getInstance();

  return (
    <ServiceContext.Provider value={serviceFactory}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useServices must be used within a ServiceProvider');
  }
  return context;
};