'use client'

import Link from 'next/link'

export default function Hero() {
  return (
    <section style={{
      position: 'relative',
      paddingTop: '8rem',
      paddingBottom: '6rem',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(to right, rgb(var(--primary-rgb)), rgb(var(--secondary-rgb)))`
      }}/>
      
      <div className="container" style={{
        position: 'relative',
        textAlign: 'center',
        color: 'white',
        zIndex: 1
      }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
          fontWeight: 800,
          marginBottom: '1.5rem',
          lineHeight: 1.2
        }}>
          Transform Your Dealership with Intelligent AI
        </h1>
        
        <p style={{
          fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
          opacity: 0.9,
          maxWidth: '48rem',
          margin: '0 auto 2.5rem'
        }}>
          Outperforma.ai delivers cutting-edge voice AI and workflow agents designed specifically for automotive dealerships. Boost appointments, streamline operations, and enhance customer experience at every touchpoint.
        </p>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Link 
            href="#contact" 
            className="btn btn-outline"
            style={{
              width: '100%',
              maxWidth: '20rem'
            }}
          >
            Schedule a Demo
          </Link>
          <Link 
            href="#services" 
            className="btn btn-primary"
            style={{
              width: '100%',
              maxWidth: '20rem'
            }}
          >
            Explore Solutions
          </Link>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 640px) {
          div {
            flex-direction: row !important;
          }
          .btn {
            width: auto !important;
          }
        }
      `}</style>
    </section>
  )
}