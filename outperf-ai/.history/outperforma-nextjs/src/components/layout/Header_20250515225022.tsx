import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-6 flex justify-between items-center h-20">
        <Link href="/" className="text-2xl font-bold text-primary">
          outperforma<span className="text-accent">.ai</span>
        </Link>
        <nav>
          <ul className="flex gap-8">
            <li><Link href="#services" className="text-gray-600 hover:text-primary font-medium transition-colors">Solutions</Link></li>
            <li><Link href="#agents" className="text-gray-600 hover:text-primary font-medium transition-colors">AI Agents</Link></li>
            <li><Link href="#about" className="text-gray-600 hover:text-primary font-medium transition-colors">About</Link></li>
            <li><Link href="#contact" className="text-gray-600 hover:text-primary font-medium transition-colors">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}