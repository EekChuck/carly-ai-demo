import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary"/>
      
      <div className="relative container mx-auto px-6 text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
          Transform Your Dealership with Intelligent AI
        </h1>
        
        <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto mb-10">
          Outperforma.ai delivers cutting-edge voice AI and workflow agents designed specifically for automotive dealerships. Boost appointments, streamline operations, and enhance customer experience at every touchpoint.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="#contact" 
            className="w-full sm:w-auto btn btn-outline"
          >
            Schedule a Demo
          </Link>
          <Link 
            href="#services" 
            className="w-full sm:w-auto btn btn-primary"
          >
            Explore Solutions
          </Link>
        </div>
      </div>
    </section>
  )
}