import Link from 'next/link'

export default function Hero() {
  return (
    <section className="pt-44 pb-24 bg-gradient-to-r from-primary to-secondary text-white text-center">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-extrabold mb-6 leading-tight">
          Transform Your Dealership with Intelligent AI
        </h1>
        <p className="text-xl opacity-90 max-w-3xl mx-auto mb-10">
          Outperforma.ai delivers cutting-edge voice AI and workflow agents designed specifically for automotive dealerships. Boost appointments, streamline operations, and enhance customer experience at every touchpoint.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link 
            href="#contact" 
