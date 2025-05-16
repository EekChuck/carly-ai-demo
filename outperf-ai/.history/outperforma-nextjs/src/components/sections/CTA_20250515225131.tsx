import Link from 'next/link'

export default function CTA() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-r from-secondary to-accent text-white text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-6">Ready to Outperform Your Competition?</h2>
        <p className="text-xl opacity-90 max-w-3xl mx-auto mb-10">
          Schedule a personalized demo to see how our AI solutions can transform your dealership operations and drive measurable results.
        </p>
        <Link 
          href="#"
          className="inline-block px-6 py-3 rounded-md border-2 border-white text-white font-semibold hover:bg-white hover:text-secondary transition-colors"
        >
          Request Demo
        </Link>
      </div>
    </section>
  )
}