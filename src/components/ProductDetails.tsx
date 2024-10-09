import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../contexts/CartContext'
import { useServices } from '../contexts/ServiceContext'
import { Product } from '../domain/entities/Product'

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const { addToCart } = useCart()
  const services = useServices();
  const productService = services.getProductService();

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const fetchedProduct = await productService.getProductById(Number(id));
          setProduct(fetchedProduct);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      }
    };
    fetchProduct();
  }, [id, productService]);

  if (!product) {
    return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">Loading...</div>
  }

  const handleAddToCart = () => {
    addToCart(product)
  }

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = 'https://via.placeholder.com/400x300?text=Product+Image+Not+Available';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col-reverse"
        >
          <div className="mt-6 w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-center object-cover"
              onError={handleImageError}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0"
        >
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-4">{product.name}</h1>
          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900 mb-6">${product.price.toFixed(2)}</p>
          </div>
          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="text-base text-gray-700 space-y-6">
              <p>{product.description}</p>
            </div>
          </div>
          <div className="mt-10">
            <button
              onClick={handleAddToCart}
              className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Add to Cart
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProductDetails