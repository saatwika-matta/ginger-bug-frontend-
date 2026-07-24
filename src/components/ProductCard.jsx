// A small hand-drawn "jar" placeholder stands in for real product
// photography until Cloudinary images are uploaded (see design doc
// section 7). Once you have real photos, swap the <JarIllustration>
// below for:
//   <img src={product.imageUrl} alt={product.name} />
// No other markup needs to change.

function JarIllustration({ tint }) {
  return (
    <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M35 10 H65 V22 C65 22 78 30 78 48 V102 C78 108.6 72.6 114 66 114 H34 C27.4 114 22 108.6 22 102 V48 C22 30 35 22 35 22 V10 Z"
        fill={tint}
        fillOpacity="0.15"
        stroke={tint}
        strokeWidth="2.5"
      />
      <path d="M22 66 C34 72 66 60 78 66 V102 C78 108.6 72.6 114 66 114 H34 C27.4 114 22 108.6 22 102 V66Z" fill={tint} fillOpacity="0.55" />
      <rect x="33" y="6" width="34" height="8" rx="2" fill={tint} />
    </svg>
  )
}

export default function ProductCard({ product }) {
  const {
    name, tagline, description, price, currency,
    size, badge, heatLevel, available, batch
  } = product

  const currencySymbol = currency === 'USD' ? '$' : currency + ' '

  return (
    <article className="product-card">
      <div className="product-jar">
        {badge && <span className="product-badge">{badge}</span>}
        <JarIllustration tint={heatLevel >= 4 ? '#b23a2e' : '#e8a33d'} />
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
      </div>
    </article>
  )
}
