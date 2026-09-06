const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export async function getProducts() {
  const res = await fetch(`${API_URL}/api/products`)
  if (!res.ok) throw new Error('Failed to fetch products')
  const data = await res.json()
  return data.map(p => ({ ...p, price: parseFloat(p.price) }))
}

export async function getConfig() {
  const res = await fetch(`${API_URL}/api/config`)
  if (!res.ok) throw new Error('Failed to fetch config')
  const config = await res.json()
  return {
    hero_title: config.heroTitle,
    hero_subtitle: config.heroSubtitle,
    story_title: config.storyTitle,
    story_text: config.storyText
  }
}

export async function submitContactForm(formData) {
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mykrnpza'

  const res = await fetch(FORMSPREE_ENDPOINT, {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: formData
  })

  if (!res.ok) {
    throw new Error('Failed to send message')
  }

  return res.json()
}