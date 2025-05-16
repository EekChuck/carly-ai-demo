'use client'

import Link from 'next/link'

export default function CTA() {
  return (
    <section id="contact" style={{
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `linear-gradient(to right, rgb(var(--secondary)), rgb(var(--accent)))`
      }}/>
      
      <div className="container" style={{
        position: 'relative',
        textAlign: 'center',
        color: 'white',
        padding: '5rem 0'
      }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 2.5rem)',
          fontWeight: 700,
          marginBottom: '1.5rem'
        }}>
          Ready to Outperform Your Competition?
        </h2>
        <p style={{
          fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
          opacity: 0.9,
          maxWidth: '48rem',
          margin: '0 auto 2.5rem'
        }}>
          Schedule a personalized demo to see how our AI solutions can transform your dealership operations and drive measurable results.
        </p>
        <Link 
          href="#"
          className="btn btn-outline"
          style={{
            padding: '1rem 2rem',
            fontSize: '1.125rem'
          }}
        >
          Request Demo
        </Link>
      </div>
    </section>
  )
}