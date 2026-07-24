import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getConfig } from '../lib/api.js'

// Deterministic-ish bubble field: fixed set of sizes/positions/delays
// so the hero doesn't reflow or look different on every reload.
const BUBBLES = [
  { left: '8%', size: 10, delay: 0, duration: 9, drift: 10 },
  { left: '18%', size: 6, delay: 2, duration: 7, drift: -15 },
  { left: '28%', size: 14, delay: 4, duration: 11, drift: 20 },
  { left: '40%', size: 8, delay: 1, duration: 8, drift: -10 },
  { left: '55%', size: 12, delay: 3, duration: 10, drift: 15 },
  { left: '68%', size: 7, delay: 5, duration: 7.5, drift: -20 },
  { left: '78%', size: 16, delay: 0.5, duration: 12, drift: 12 },
  { left: '90%', size: 9, delay: 3.5, duration: 9.5, drift: -8 },
]

export default function Home() {
  const [config, setConfig] = useState(null)

  useEffect(() => {
    getConfig().then(setConfig)
  }, [])

  if (!config) return null

  return (
    <>
      <section className="hero">
        <div className="bubbles" aria-hidden="true">
          {BUBBLES.map((b, i) => (
            <span
              key={i}
              className="bubble"
              style={{
                left: b.left,
                width: b.size,
                height: b.size,
                animationDelay: `${b.delay}s`,
                animationDuration: `${b.duration}s`,
                '--drift': `${b.drift}px`
              }}
            />
          ))}
        </div>
        <div className="hero-inner">
          <span className="eyebrow">Small-batch · Wild fermentation</span>
          <h1>{config.hero_title}</h1>
          <p>{config.hero_subtitle}</p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary">Shop the batch</Link>
            <Link to="/contact" className="btn btn-outline">Ask us anything</Link>
          </div>
        </div>
      </section>

      <section className="story">
        <div className="story-inner">
          <div>
            <span className="eyebrow">The process</span>
            <h2>{config.story_title}</h2>
            <p>{config.story_text}</p>
          </div>
          <div className="story-visual" aria-hidden="true">
            <svg viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="34" stroke="#e8a33d" strokeWidth="2" fillOpacity="0" />
              <circle cx="50" cy="50" r="24" stroke="#e8a33d" strokeWidth="1.5" strokeDasharray="3 4" fillOpacity="0" />
              <circle cx="50" cy="35" r="3" fill="#e8a33d" />
              <circle cx="60" cy="55" r="2" fill="#e8a33d" />
              <circle cx="42" cy="60" r="2.5" fill="#e8a33d" />
            </svg>
          </div>
        </div>
      </section>
    </>
  )
}
