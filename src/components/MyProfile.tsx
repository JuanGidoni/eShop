import React, { useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Settings, Package, CreditCard } from 'lucide-react';
import OrdersList from './OrdersList';
import PersonalInfo from './PersonalInfo';
import ShippingInfo from './ShippingInfo';
import PaymentMethods from './PaymentMethods';

const MyProfile: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname.split('/')[2] || 'orders');

  const navItems = [
    { name: 'Orders', path: 'orders', icon: Package },
    { name: 'Personal Info', path: 'personal-info', icon: User },
    { name: 'Shipping', path: 'shipping', icon: Settings },
    { name: 'Payment Methods', path: 'payment', icon: CreditCard },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      <div className="flex flex-col md:flex-row">
        <nav className="w-full md:w-64 mb-8 md:mb-0">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={`/profile/${item.path}`}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    activeTab === item.path
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab(item.path)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <main className="flex-1 md:ml-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Routes>
              <Route path="orders" element={<OrdersList />} />
              <Route path="personal-info" element={<PersonalInfo />} />
              <Route path="shipping" element={<ShippingInfo />} />
              <Route path="payment" element={<PaymentMethods />} />
            </Routes>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default MyProfile;