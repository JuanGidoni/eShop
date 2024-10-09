import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ProductService } from '../application/ProductService'
import { InMemoryProductRepository } from '../infrastructure/adapters/InMemoryProductRepository'
import { Product } from '../domain/entities/Product'
import { Truck, ShieldCheck, CreditCard, PhoneCall } from 'lucide-react'

const productService = new ProductService(new InMemoryProductRepository());

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      const allProducts = await productService.getAllProducts();
      setFeaturedProducts(allProducts.slice(0, 3)); // Get first 3 products as featured
    };
    fetchFeaturedProducts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="bg-white">
      <main>
        {/* Hero section */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
              <div className="absolute inset-0">
                <img
                  className="h-full w-full object-cover sm:object-center object-top"
                  src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100"
                  alt="People working on laptops"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-700 mix-blend-multiply" />
              </div>
              <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                <motion.h1 
                  className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <span className="block text-white">Take control of your</span>
                  <span className="block text-indigo-200">tech shopping</span>
                </motion.h1>
                <motion.p 
                  className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Discover the latest gadgets and accessories to enhance your digital lifestyle. Shop with confidence and ease.
                </motion.p>
                <motion.div 
                  className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                    <Link
                      to="/products"
                      className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8 transition-colors duration-300"
                    >
                      Shop Now
                    </Link>
                    <Link
                      to="/about"
                      className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 bg-opacity-60 hover:bg-opacity-70 sm:px-8 transition-colors duration-300"
                    >
                      Learn More
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured Products section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-8"
          >
            Featured Products
          </motion.h2>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative"
              >
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none transition-opacity duration-300">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={`/product/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Features section */}
        <motion.section 
          className="bg-gray-50 py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 
              className="text-3xl font-extrabold text-gray-900 text-center mb-12"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Why Choose Us
            </motion.h2>
            <motion.div 
              className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  <Truck className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Fast Shipping</h3>
                <p className="mt-2 text-base text-gray-500">
                  Get your products delivered quickly and efficiently.
                </p>
              </motion.div>
              <motion.div variants={itemVariants} className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Secure Payments</h3>
                <p className="mt-2 text-base text-gray-500">
                  Shop with confidence using our secure payment methods.
                </p>
              </motion.div>
              <motion.div variants={itemVariants} className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  <CreditCard className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Easy Returns</h3>
                <p className="mt-2 text-base text-gray-500">
                  Not satisfied? Return your product hassle-free within 30 days.
                </p>
              </motion.div>
              <motion.div variants={itemVariants} className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  <PhoneCall className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">24/7 Support</h3>
                <p className="mt-2 text-base text-gray-500">
                  Our customer support team is always here to help you.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Mission statement */}
        <motion.section 
          className="bg-indigo-700 py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2 
              className="text-3xl font-extrabold text-white mb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Our Mission
            </motion.h2>
            <motion.p 
              className="text-xl text-indigo-200 max-w-3xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              At E-Shop, we're committed to providing cutting-edge technology products that enhance your digital lifestyle. 
              Our mission is to make high-quality tech accessible to everyone, offering exceptional customer service and 
              a seamless shopping experience.
            </motion.p>
          </div>
        </motion.section>
      </main>
    </div>
  )
}

export default HomePage