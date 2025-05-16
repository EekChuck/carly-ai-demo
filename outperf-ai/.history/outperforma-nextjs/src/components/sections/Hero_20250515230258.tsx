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
        backgroundImage: `linear-gradient(to right, rgb(var(--primary)), rgb(var(--secondary)))`
      }}/>
      
      <div className="container" style={{
        position: 'relative',
        textAlign: 'center',
        color: 'white'
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
