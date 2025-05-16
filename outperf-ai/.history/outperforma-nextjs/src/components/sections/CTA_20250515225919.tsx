import Link from 'next/link'

export default function CTA() {
  return (
    <section id="contact" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent"/>
      
      <div className="relative container mx-auto px-6 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Outperform Your Competition?
        </h2>
        <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto mb-10">
          Schedule a personalized demo to see how our AI solutions can transform your dealership operations and drive measurable results.
        </p>
        <Link 
          href="#"
          className="inline-block px-8 py-4 text-lg font-semibold rounded-md border-2 border-white text-white hover:bg-white hover:text-secondary transition-all duration-300"
        >
          Request Demo
        </Link>
      </div>
    </section>
  )
}