'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      zIndex: 50
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '5rem'
      }}>
        <Link 
          href="/" 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            fontSize: '1.5rem',
            fontWeight: 700,
            textDecoration: 'none'
          }}
        >
          <span style={{ color: `rgb(var(--primary))` }}>outperforma</span>
          <span style={{ color: `rgb(var(--accent))` }}>.ai</span>
        </Link>

        <nav style={{ display: 'none' }} className="desktop-nav">
          <ul style={{
            display: 'flex',
            gap: '2rem',
            listStyle: 'none',
            margin: 0,
            padding: 0
          }}>
            <li>
              <Link 
                href="#services" 
                style={{
                  color: '#4b5563',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
              >
                Solutions
              </Link>
            </li>
            <li>
              <Link 
                href="#agents" 
                style={{
                  color: '#4b5563',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
              >
                AI Agents
              </Link>
            </li>
            <li>
              <Link 
                href="#about" 
                style={{
                  color: '#4b5563',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                href="#contact" 
                style={{
                  color: '#4b5563',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <button 
          className="mobile-menu"
          style={{
            display: 'flex',
            padding: '0.5rem',
            border: 'none',
            background: 'none',
            cursor: 'pointer'
          }}
        >
          <span style={{ display: 'none' }}>Open menu</span>
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: block !important;
          }
          .mobile-menu {
            display: none !important;
          }
        }
        
        .desktop-nav a:hover {
          color: rgb(var(--primary));
        }
      `}</style>
    </header>
  )
}