import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Menu, User, X } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'

const Header: React.FC = () => {
  const { getTotalItems, getTotalPrice, getCartItems } = useCart();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartPreviewOpen, setIsCartPreviewOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavigation = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const cartItems = getCartItems();
  const cartItemCount = getTotalItems();
  const cartTotalPrice = getTotalPrice();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-500 transition-colors duration-300">E-Shop</Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <button
              type="button"
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors duration-300"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <nav className="hidden md:flex space-x-10">
            <Link to="/" className="text-base font-medium text-gray-500 hover:text-gray-900 transition-colors duration-300">
              Home
            </Link>
            <Link to="/products" className="text-base font-medium text-gray-500 hover:text-gray-900 transition-colors duration-300">
              Products
            </Link>
            <Link to="/contact" className="text-base font-medium text-gray-500 hover:text-gray-900 transition-colors duration-300">
              Contact Us
            </Link>
            <Link to="/faq" className="text-base font-medium text-gray-500 hover:text-gray-900 transition-colors duration-300">
              FAQ
            </Link>
          </nav>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            {user ? (
              <>
                <Link to="/profile" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 transition-colors duration-300 mr-8">
                  <User className="inline-block w-5 h-5 mr-1" />
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 transition-colors duration-300">
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
                >
                  Sign up
                </Link>
              </>
            )}
            <div 
              className="relative ml-8"
              onMouseEnter={() => setIsCartPreviewOpen(true)}
              onMouseLeave={() => setIsCartPreviewOpen(false)}
            >
              <Link 
                to="/cart" 
                className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
              >
                <ShoppingCart className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
                ${cartTotalPrice.toFixed(2)} ({cartItemCount})
              </Link>
              <AnimatePresence>
                {isCartPreviewOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-50"
                  >
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Cart Preview</h3>
                      {cartItems.length > 0 ? (
                        <>
                          <ul className="space-y-2 mb-4 max-h-60 overflow-y-auto">
                            {cartItems.map((item) => (
                              <li key={item.product.id} className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">{item.product.name}</span>
                                <span className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="flex justify-between items-center border-t pt-2">
                            <span className="text-base font-medium">Total:</span>
                            <span className="text-base font-bold">${cartTotalPrice.toFixed(2)}</span>
                          </div>
                        </>
                      ) : (
                        <p className="text-sm text-gray-500">Your cart is empty</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button onClick={() => handleNavigation('/')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-300">Home</button>
              <button onClick={() => handleNavigation('/products')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-300">Products</button>
              <button onClick={() => handleNavigation('/contact')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-300">Contact Us</button>
              <button onClick={() => handleNavigation('/faq')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-300">FAQ</button>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-5">
                {user ? (
                  <>
                    <button onClick={() => handleNavigation('/profile')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-300">Profile</button>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="ml-auto block px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleNavigation('/login')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-300">Sign in</button>
                    <button onClick={() => handleNavigation('/register')} className="ml-auto block px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300">Sign up</button>
                  </>
                )}
              </div>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <button onClick={() => handleNavigation('/cart')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-300">
                <ShoppingCart className="inline-block mr-2 h-5 w-5" aria-hidden="true" />
                ${cartTotalPrice.toFixed(2)} ({cartItemCount})
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header