import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { useServices } from '../contexts/ServiceContext'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import PayPalButton from './PayPalButton'

const CheckoutSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  address: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  zipCode: Yup.string().required('Required'),
})

const Checkout: React.FC = () => {
  const { getCartItems, getTotalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'card'>('card')
  const services = useServices()
  const orderService = services.getOrderService()

  const handleSubmit = async (values: any) => {
    try {
      const order = await orderService.createOrder({
        ...values,
        userId: user?.id,
        items: getCartItems(),
        total: getTotalPrice(),
      })
      clearCart()
      navigate(`/order-confirmation/${order.id}`)
    } catch (error) {
      console.error('Error creating order:', error)
      // Handle error (e.g., show error message to user)
    }
  }

  const handlePayPalSuccess = async (details: any) => {
    // Handle successful PayPal payment
    console.log('PayPal payment successful:', details)
    // You might want to create an order here or update the payment status
    clearCart()
    navigate('/order-confirmation')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-8">Checkout</h1>
      <div className="mt-8 grid grid-cols-1 gap-y-6 lg:grid-cols-2 lg:gap-x-8">
        <div>
          <Formik
            initialValues={{
              name: user?.name || '',
              email: user?.email || '',
              address: '',
              city: '',
              zipCode: '',
            }}
            validationSchema={CheckoutSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <ErrorMessage name="name" component="div" className="mt-2 text-sm text-red-600" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <ErrorMessage name="email" component="div" className="mt-2 text-sm text-red-600" />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <Field
                    type="text"
                    name="address"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <ErrorMessage name="address" component="div" className="mt-2 text-sm text-red-600" />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <Field
                    type="text"
                    name="city"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <ErrorMessage name="city" component="div" className="mt-2 text-sm text-red-600" />
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                    ZIP Code
                  </label>
                  <Field
                    type="text"
                    name="zipCode"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <ErrorMessage name="zipCode" component="div" className="mt-2 text-sm text-red-600" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                  <div className="mt-2 space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                    <div className="flex items-center">
                      <input
                        id="card"
                        name="paymentMethod"
                        type="radio"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor="card" className="ml-3 block text-sm font-medium text-gray-700">
                        Credit Card
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="paypal"
                        name="paymentMethod"
                        type="radio"
                        checked={paymentMethod === 'paypal'}
                        onChange={() => setPaymentMethod('paypal')}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                        PayPal
                      </label>
                    </div>
                  </div>
                </div>
                {paymentMethod === 'card' && (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Place Order
                  </button>
                )}
              </Form>
            )}
          </Formik>
          {paymentMethod === 'paypal' && (
            <div className="mt-6">
              <PayPalButton
                amount={getTotalPrice().toString()}
                onSuccess={handlePayPalSuccess}
              />
            </div>
          )}
        </div>
        <div className="mt-10 lg:mt-0">
          <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
          <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <ul className="divide-y divide-gray-200">
              {getCartItems().map((item) => (
                <li key={item.product.id} className="flex py-6 px-4 sm:px-6">
                  <div className="flex-shrink-0">
                    <img src={item.product.imageUrl} alt={item.product.name} className="w-20 rounded-md" />
                  </div>
                  <div className="ml-6 flex-1 flex flex-col">
                    <div className="flex">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm">
                          <a href={`/product/${item.product.id}`} className="font-medium text-gray-700 hover:text-gray-800">
                            {item.product.name}
                          </a>
                        </h4>
                      </div>
                    </div>
                    <div className="flex-1 pt-2 flex items-end justify-between">
                      <p className="mt-1 text-sm font-medium text-gray-900">${item.product.price.toFixed(2)}</p>
                      <div className="ml-4">
                        <label htmlFor={`quantity-${item.product.id}`} className="sr-only">
                          Quantity
                        </label>
                        <span className="text-gray-500">Qty {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
              <div className="flex items-center justify-between">
                <dt className="text-sm">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">${getTotalPrice().toFixed(2)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm">Shipping</dt>
                <dd className="text-sm font-medium text-gray-900">$0.00</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm">Taxes</dt>
                <dd className="text-sm font-medium text-gray-900">$0.00</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                <dt className="text-base font-medium">Total</dt>
                <dd className="text-base font-medium text-gray-900">${getTotalPrice().toFixed(2)}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout