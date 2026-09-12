import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export default function AdminProducts() {
  const [products, setProducts] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const token = localStorage.getItem('adminToken')
  const [newProduct, setNewProduct] = useState({
    name: '', tagline: '', description: '', price: '', size: '330ml', heatLevel: 1, batch: ''
  })
  
  async function handleAddProduct(e) {
    e.preventDefault()
  
    const res = await fetch(`${API_URL}/api/admin/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        ...newProduct,
        price: parseFloat(newProduct.price),
        heatLevel: parseInt(newProduct.heatLevel)
      })
    })
  
    if (res.ok) {
      setNewProduct({ name: '', tagline: '', description: '', price: '', size: '330ml', heatLevel: 1, batch: '' })
      fetchProducts()
    }
  }

  useEffect(() => {
    if (!token) {
      navigate('/admin/login')
      return
    }
    fetchProducts()
  }, [])

  async function fetchProducts() {
    const res = await fetch(`${API_URL}/api/products`)
    const data = await res.json()
    setProducts(data)
  }

  async function handleDelete(id) {
    if (!confirm('Delete this product?')) return

    const res = await fetch(`${API_URL}/api/admin/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })

    if (res.status === 403 || res.status === 401) {
      setError('Your session expired — please log in again.')
      localStorage.removeItem('adminToken')
      navigate('/admin/login')
      return
    }

    fetchProducts()
  }

  async function toggleAvailable(product) {
    await fetch(`${API_URL}/api/admin/products/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ available: !product.available })
    })
    fetchProducts()
  }

  function handleLogout() {
    localStorage.removeItem('adminToken')
    navigate('/admin/login')
  }

  return (
    <div className="products-page-header" style={{ background: 'var(--culture-white)', color: 'var(--ink)' }}>
      <div className="container" style={{ padding: '2rem 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="eyebrow">Admin</span>
            <h1>Manage products</h1>
          </div>
          <button className="btn btn-outline" style={{ color: 'var(--ink)', borderColor: 'var(--ink)' }} onClick={handleLogout}>
            Log out
          </button>
        </div>

        {error && <p className="form-status error">{error}</p>}

       

<form onSubmit={handleAddProduct} style={{ marginTop: '2rem', marginBottom: '2rem', maxWidth: '500px' }}>
  <h3>Add a new product</h3>
  <div className="form-field">
    <label>Name</label>
    <input value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} required />
  </div>
  <div className="form-field">
    <label>Tagline</label>
    <input value={newProduct.tagline} onChange={e => setNewProduct({ ...newProduct, tagline: e.target.value })} required />
  </div>
  <div className="form-field">
    <label>Description</label>
    <input value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} required />
  </div>
  <div className="form-field">
    <label>Price</label>
    <input type="number" step="0.01" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} required />
  </div>
  <div className="form-field">
    <label>Batch number</label>
    <input value={newProduct.batch} onChange={e => setNewProduct({ ...newProduct, batch: e.target.value })} required />
  </div>
  <button type="submit" className="btn btn-primary">Add product</button>
</form>



        {products === null && <p>Loading…</p>}

        {products?.map(product => (
          <div key={product.id} className="product-footer" style={{ padding: '1rem 0' }}>
            <div>
              <strong>{product.name}</strong>
              <div className="product-size">
                ${parseFloat(product.price).toFixed(2)} · Batch № {product.batch} ·{' '}
                {product.available ? 'Available' : 'Sold out'}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-outline" style={{ color: 'var(--ink)', borderColor: 'var(--ink)' }} onClick={() => toggleAvailable(product)}>
                Mark {product.available ? 'sold out' : 'available'}
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                style={{ background: 'none', border: 'none', color: 'var(--root-red)', cursor: 'pointer' }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}