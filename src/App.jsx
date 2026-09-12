import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import Contact from './pages/Contact.jsx'
import Cart from './pages/Cart.jsx'
import CheckoutSuccess from './pages/CheckoutSuccess.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminProducts from './pages/AdminProducts.jsx'

export default function App() {
  const [cart, setCart] = useState([])

  function addToCart(product) {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id)
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  function removeFromCart(productId) {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  return (
    <div className="app-shell">
      <Nav cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products addToCart={addToCart} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
          <Route path="/checkout-success" element={<CheckoutSuccess cart={cart} setCart={setCart} />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/products" element={<AdminProducts />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}