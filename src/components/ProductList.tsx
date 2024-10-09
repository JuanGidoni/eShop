import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useServices } from '../contexts/ServiceContext'
import { Product } from '../domain/entities/Product'

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const services = useServices();
  const productService = services.getProductService();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await productService.getAllProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [productService]);

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = 'https://via.placeholder.com/400x300?text=Product+Image+Not+Available';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.h1 
        className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Products
      </motion.h1>
      <motion.div 
        className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group"
          >
            <Link to={`/product/${product.id}`} className="block">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-center object-cover group-hover:opacity-75 transition-opacity duration-300" 
                  onError={handleImageError}
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default ProductList