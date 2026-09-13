import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export default function AdminOrders() {
  const [orders, setOrders] = useState(null)
  const navigate = useNavigate()
  const token = localStorage.getItem('adminToken')

  useEffect(() => {
    if (!token) {
      navigate('/admin/login')
      return
    }
    fetchOrders()
  }, [])

  async function fetchOrders() {
    const res = await fetch(`${API_URL}/api/admin/orders`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (res.status === 401 || res.status === 403) {
      localStorage.removeItem('adminToken')
      navigate('/admin/login')
      return
    }
    const data = await res.json()
    setOrders(data)
  }

  return (
    <div className="products-page-header" style={{ background: 'var(--culture-white)', color: 'var(--ink)' }}>
      <div className="container" style={{ padding: '2rem 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="eyebrow">Admin</span>
            <h1>Orders</h1>
          </div>
          <Link to="/admin/products" className="btn btn-outline" style={{ color: 'var(--ink)', borderColor: 'var(--ink)' }}>
            Manage products
          </Link>
        </div>

        {orders === null && <p>Loading…</p>}
        {orders?.length === 0 && <p>No orders yet.</p>}

        {orders?.map(order => (
          <div key={order.id} style={{ padding: '1.5rem 0', borderBottom: '1px solid rgba(17,17,17,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{order.customerEmail}</strong>
              <span className="product-price">${parseFloat(order.totalAmount).toFixed(2)}</span>
            </div>
            <div className="product-size" style={{ marginTop: '0.25rem' }}>
              {new Date(order.createdAt).toLocaleDateString()} · {order.items.map(i => `${i.name} x${i.quantity}`).join(', ')}
            </div>
            {order.shippingAddress ? (
              <div className="product-size" style={{ marginTop: '0.5rem' }}>
                Ship to: {order.shippingAddress.name}, {order.shippingAddress.address.line1}
                {order.shippingAddress.address.line2 ? `, ${order.shippingAddress.address.line2}` : ''}, {order.shippingAddress.address.city}, {order.shippingAddress.address.state} {order.shippingAddress.address.postal_code}
              </div>
            ) : (
              <div className="product-size" style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>
                No shipping address on file
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
