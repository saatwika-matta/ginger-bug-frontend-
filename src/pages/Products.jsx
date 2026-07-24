import { useEffect, useState } from 'react'
import { getProducts } from '../lib/api.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Products() {
  const [products, setProducts] = useState(null)

  useEffect(() => {
    getProducts().then(setProducts)
  }, [])

  return (
    <>
      <div className="products-page-header">
        <div className="container">
          <span className="eyebrow">Current lineup</span>
          <h1>Every batch we're brewing</h1>
          <p>Live culture means every batch varies slightly. What's listed here is what's actually fermented and ready — not a static catalog.</p>
        </div>
      </div>

      <div className="product-grid">
        {products === null && (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>Loading batches…</p>
        )}
        {products?.length === 0 && (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
            Nothing in stock right now — check back soon, or head to Contact to ask what's brewing next.
          </p>
        )}
        {products?.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}
