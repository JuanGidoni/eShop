import React from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../contexts/CartContext'
import { Trash2 } from 'lucide-react'

const Cart: React.FC = () => {
  const { getCartItems, removeFromCart, getTotalPrice } = useCart()
  const items = getCartItems()

  return (
    <motion.div 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Your Cart</h1>
      {items.length === 0 ? (
        <motion.p 
          className="mt-4 text-gray-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Your cart is empty.
        </motion.p>
      ) : (
        <>
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AnimatePresence>
              {items.map((item) => (
                <motion.div 
                  key={item.product.id} 
                  className="flex items-center justify-between py-4 border-b border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center">
                    <img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                    <div className="ml-4">
                      <h2 className="text-lg font-medium text-gray-900">{item.product.name}</h2>
                      <p className="mt-1 text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="text-lg font-medium text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</p>
                    <motion.button
                      onClick={() => removeFromCart(item.product.id)}
                      className="ml-4 text-red-500 hover:text-red-700"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 className="h-5 w-5" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex justify-between items-center border-t border-gray-200 pt-4">
              <p className="text-xl font-medium text-gray-900">Total:</p>
              <p className="text-2xl font-bold text-gray-900">${getTotalPrice().toFixed(2)}</p>
            </div>
          </motion.div>
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link
              to="/checkout"
              className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Proceed to Checkout
            </Link>
          </motion.div>
        </>
      )}
    </motion.div>
  )
}

export default Cart