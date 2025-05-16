'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Form submitted:', formData)
  }

  return (
    <section id="contact" style={{ padding: '2rem 0', backgroundColor: '#f9fafb' }}>
      <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', textAlign: 'center' }}>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} />
          </div>
          <button type="submit" style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1f2937', color: 'white', border: 'none', cursor: 'pointer' }}>Submit</button>
        </form>
      </div>
    </section>
  )
} 