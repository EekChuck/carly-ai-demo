'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Agents from '@/components/sections/Agents'
import CTA from '@/components/sections/CTA'

export default function Home() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Hero />
        <Services />
        <Agents />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
