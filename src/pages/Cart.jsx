import { useState } from 'react'
import { Link } from 'react-router-dom'
import { createCheckoutSession } from '../lib/api.js'

export default function Cart({ cart, removeFromCart }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | error

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  async function handleCheckout() {
    setStatus('loading')
    try {
      const url = await createCheckoutSession(cart, email)
      window.location.href = url
    } catch (err) {
      setStatus('error')
    }
  }

  if (cart.length === 0) {
    return (
      <div className="contact-page">
        <span className="eyebrow">Your cart</span>
        <h1>Nothing in here yet</h1>
        <p>Head over to the Products page and add a batch or two.</p>
        <Link to="/products" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Browse products
        </Link>
      </div>
    )
  }

  return (
    <div className="contact-page">
      <span className="eyebrow">Your cart</span>
      <h1>{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</h1>

      <div style={{ marginTop: '2rem' }}>
        {cart.map(item => (
          <div key={item.id} className="product-footer" style={{ paddingBottom: '1rem', marginBottom: '1rem' }}>
            <div>
              <strong>{item.name}</strong>
              <div className="product-size">Qty: {item.quantity} · ${item.price.toFixed(2)} each</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span className="product-price">${(item.price * item.quantity).toFixed(2)}</span>
              <button
                onClick={() => removeFromCart(item.id)}
                style={{ background: 'none', border: 'none', color: 'var(--root-red)', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '1.5rem', fontSize: '1.2rem', fontFamily: 'var(--font-mono)' }}>
        Total: ${total.toFixed(2)}
      </div>

      <div className="form-field" style={{ marginTop: '1.5rem', maxWidth: '400px' }}>
        <label htmlFor="email">Email (for your receipt)</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>

      <button
        className="btn btn-primary"
        onClick={handleCheckout}
        disabled={status === 'loading' || !email}
        style={{ marginTop: '1rem' }}
      >
        {status === 'loading' ? 'Redirecting…' : 'Checkout'}
      </button>

      {status === 'error' && (
        <p className="form-status error">Something went wrong starting checkout — try again.</p>
      )}
    </div>
  )
}