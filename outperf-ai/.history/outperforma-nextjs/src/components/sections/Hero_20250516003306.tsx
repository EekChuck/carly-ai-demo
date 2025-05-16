'use client'

import Link from 'next/link'
import Image from 'next/image'

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
        zIndex: 0
      }}>
        <Image
          src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=2000&q=80"
          alt="Car dealership with customers"
          fill
          style={{
            objectFit: 'cover',
            opacity: 0.6
          }}
          priority
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(to right, rgba(var(--primary-rgb), 0.8), rgba(var(--secondary-rgb), 0.8))`
        }}/>
      </div>
      
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

      {/* Image attribution */}
      <div style={{
        position: 'absolute',
        bottom: '0.5rem',
        right: '0.5rem',
        fontSize: '0.75rem',
        opacity: 0.7,
        color: 'white',
        zIndex: 1
      }}>
        Photo by <a
          href="https://unsplash.com/@evgenit"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'white', textDecoration: 'underline' }}
        >
          Evgeni Tcherkasski
        </a> on <a
          href="https://unsplash.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'white', textDecoration: 'underline' }}
        >
          Unsplash
        </a>
      </div>
    </section>
  )
}