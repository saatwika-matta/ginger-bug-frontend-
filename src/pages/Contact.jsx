import { useState } from 'react'
import { submitContactForm } from '../lib/api.js'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  async function handleSubmit(e) {
     e.preventDefault()
    setStatus('sending')
    const formData = new FormData(e.target)

    try {
      await submitContactForm(formData)
      setStatus('success')
      e.target.reset()
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <div className="contact-page">
      <span className="eyebrow">Get in touch</span>
      <h1>Questions, wholesale, or just say hi</h1>
      <p>We read every message ourselves — no ticketing system, no auto-replies.</p>

      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" required />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div className="form-field">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="5" required />
        </div>

        <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>

        {status === 'success' && (
          <p className="form-status success">Sent. We'll get back to you soon.</p>
        )}
        {status === 'error' && (
          <p className="form-status error">Something went wrong — try again, or email us directly.</p>
        )}
      </form>
    </div>
  )
}
