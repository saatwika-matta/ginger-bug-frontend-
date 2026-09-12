import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })

      if (!res.ok) {
        throw new Error('Invalid password')
      }

      const data = await res.json()
      localStorage.setItem('adminToken', data.token)
      navigate('/admin/products')
    } catch (err) {
      setError('Incorrect password')
    }
  }

  return (
    <div className="contact-page">
      <span className="eyebrow">Admin</span>
      <h1>Store login</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-field" style={{ maxWidth: '400px' }}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Log in</button>

        {error && <p className="form-status error">{error}</p>}
      </form>
    </div>
  )
}