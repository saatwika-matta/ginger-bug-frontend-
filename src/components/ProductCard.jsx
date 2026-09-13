function getProductImage(name) {
  const map = {
    'Original Root': '/original-root.png',
    'Turmeric Bug': '/turmeric-bug.png',
    'Habanero Reserve': '/habanero.png',
    'Lemon & Bug': '/lemon-and-bug.png'
  }
  return map[name] || '/original-root.png'
}

export default function ProductCard({ product, addToCart }) {
  const {
    name, tagline, description, price, currency,
    size, badge, heatLevel, available, batch
  } = product

  const currencySymbol = currency === 'USD' ? '$' : currency + ' '

  return (
    <article className="product-card">
      <div className="product-jar">
        {badge && <span className="product-badge">{badge}</span>}
        <img
          src={getProductImage(name)}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <div className="product-body">
        <span className="product-batch">Batch № {batch}</span>
        <h3>{name}</h3>
        <p className="product-tagline">{tagline}</p>
        <p className="product-desc">{description}</p>

        <div className="heat-gauge">
          <span>Heat</span>
          <span className="heat-gauge-track">
            <span
              className="heat-gauge-fill"
              style={{ width: `${(heatLevel / 5) * 100}%` }}
            />
          </span>
          <span>{heatLevel}/5</span>
        </div>

        <div className="product-footer">
          {available ? (
            <span className="product-price">{currencySymbol}{price.toFixed(2)}</span>
          ) : (
            <span className="unavailable-tag">Sold out</span>
          )}
          <span className="product-size">{size}</span>
        </div>

        <button
          className="btn btn-primary"
          style={{ marginTop: '0.75rem', width: '100%', justifyContent: 'center' }}
          disabled={!available}
          onClick={() => addToCart(product)}
        >
          {available ? 'Add to cart' : 'Sold out'}
        </button>
      </div>
    </article>
  )
}