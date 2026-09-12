import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'

export default function CheckoutSuccess({ cart, setCart }) {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [cleared, setCleared] = useState(false)

  useEffect(() => {
    if (sessionId && !cleared) {
      setCart([])
      setCleared(true)
    }
  }, [sessionId, cleared, setCart])

  return (
    <div className="contact-page">
      <span className="eyebrow">Order confirmed</span>
      <h1>Thank you — your order is on its way</h1>
      <p>
        We've received your payment and your batch is being prepared.
        A receipt has been sent to your email.
      </p>
      <Link to="/products" className="btn btn-primary" style={{ marginTop: '1rem' }}>
        Keep browsing
      </Link>
    </div>
  )
}