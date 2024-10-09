import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { CartProvider } from './contexts/CartContext'
import { AuthProvider } from './contexts/AuthContext'
import { ServiceProvider } from './contexts/ServiceContext'
import ErrorBoundary from './components/ErrorBoundary'

const HomePage = lazy(() => import('./components/HomePage'))
const ProductList = lazy(() => import('./components/ProductList'))
const ProductDetails = lazy(() => import('./components/ProductDetails'))
const Cart = lazy(() => import('./components/Cart'))
const Checkout = lazy(() => import('./components/Checkout'))
const Login = lazy(() => import('./components/Login'))
const Register = lazy(() => import('./components/Register'))
const MyProfile = lazy(() => import('./components/MyProfile'))
const ContactUs = lazy(() => import('./components/ContactUs'))
const FAQ = lazy(() => import('./components/FAQ'))

function App() {
  return (
    <ErrorBoundary>
      <ServiceProvider>
        <AuthProvider>
          <CartProvider>
            <Router>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                  <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/products" element={<ProductList />} />
                      <Route path="/product/:id" element={<ProductDetails />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/profile/*" element={<MyProfile />} />
                      <Route path="/contact" element={<ContactUs />} />
                      <Route path="/faq" element={<FAQ />} />
                    </Routes>
                  </Suspense>
                </main>
                <Footer />
              </div>
            </Router>
          </CartProvider>
        </AuthProvider>
      </ServiceProvider>
    </ErrorBoundary>
  )
}

export default App