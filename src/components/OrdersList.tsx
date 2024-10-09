import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useServices } from '../contexts/ServiceContext';
import { Order } from '../domain/entities/Order';
import { motion } from 'framer-motion';

const OrdersList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { user } = useAuth();
  const services = useServices();
  const orderService = services.getOrderService();

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        const userOrders = await orderService.getUserOrders(user.id);
        setOrders(userOrders);
      }
    };
    fetchOrders();
  }, [user, orderService]);

  if (!user) {
    return <div>Please log in to view your orders.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {orders.map((order) => (
            <motion.div
              key={order.id}
              className="bg-white shadow-md rounded-lg p-6 mb-6"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-4">Order #{order.id}</h2>
              <p className="mb-2">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p className="mb-2">Status: {order.status}</p>
              <p className="mb-4">Total: ${order.total.toFixed(2)}</p>
              <h3 className="font-semibold mb-2">Items:</h3>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index} className="mb-2">
                    {item.product.name} - Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default OrdersList;