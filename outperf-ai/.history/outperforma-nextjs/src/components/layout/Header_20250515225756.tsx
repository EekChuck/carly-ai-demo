import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center h-20 px-6">
        <Link 
          href="/" 
          className="inline-flex items-center text-2xl font-bold"
        >
          <span className="text-primary">outperforma</span>
          <span className="text-accent">.ai</span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            <li>
              <Link 
                href="#services" 
                className="text-gray-600 hover:text-primary font-medium transition-colors"
              >
                Solutions
              </Link>
            </li>
            <li>
              <Link 
                href="#agents" 
                className="text-gray-600 hover:text-primary font-medium transition-colors"
              >
                AI Agents
              </Link>
            </li>
            <li>
              <Link 
                href="#about" 
                className="text-gray-600 hover:text-primary font-medium transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                href="#contact" 
                className="text-gray-600 hover:text-primary font-medium transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <button className="md:hidden">
          <span className="sr-only">Open menu</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  )
}