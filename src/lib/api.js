// src/lib/api.js
//
// PHASE 1: reads from local JSON files. No backend exists yet.
// PHASE 2+: replace the body of each function below with a fetch() call
// to VITE_API_URL, e.g.:
//
//   export async function getProducts() {
//     const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`)
//     return res.json()
//   }
//
// Pages never import products.json or config.json directly — they only
// ever call these functions. That means when Phase 2 arrives, this is
// the ONLY file that changes. Every page and component stays untouched.

import products from '../data/products.json'
import config from '../data/config.json'

export async function getProducts() {
  // Simulated async so the calling code already handles loading states
  // correctly, and doesn't need to change shape when this becomes a
  // real network call.
  return Promise.resolve(products)
}

export async function getConfig() {
  return Promise.resolve(config)
}

export async function submitContactForm(formData) {
  // Phase 1 fallback per the design doc: Formspree handles this with
  // no backend at all. Replace YOUR_FORM_ID with the ID Formspree
  // gives you after creating a free form at formspree.io.
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
