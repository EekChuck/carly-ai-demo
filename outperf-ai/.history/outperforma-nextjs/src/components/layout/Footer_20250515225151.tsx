import Link from 'next/link'

interface FooterColumnProps {
  title: string
  links: Array<{
    text: string
    href: string
  }>
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="footer-column">
      <h3 className="text-xl font-semibold text-white mb-6">{title}</h3>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index}>
            <Link 
              href={link.href} 
              className="text-gray-300 hover:text-white transition-colors"
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  const footerData = {
    solutions: {
      title: 'Solutions',
      links: [
        { text: 'RecallConnect Pro', href: '#' },
        { text: 'LeadConnect Pro', href: '#' },
        { text: 'ReConnect Pro', href: '#' },
        { text: 'ServiceConnect Pro', href: '#' },
        { text: 'ReceiveConnect Pro', href: '#' },
        { text: 'DeliverConnect Pro', href: '#' }
      ]
    },
    agents: {
      title: 'Workflow Agents',
      links: [
        { text: 'Exec Inbox Assistant', href: '#' },
        { text: 'Deal Desk Assistant', href: '#' },
        { text: 'Sales Funnel Assistant', href: '#' },
        { text: 'After-Hours Agent', href: '#' },
        { text: 'All Agents', href: '#' }
      ]
    },
    company: {
      title: 'Company',
      links: [
        { text: 'About Us', href: '#' },
        { text: 'Leadership', href: '#' },
        { text: 'Careers', href: '#' },
        { text: 'Press', href: '#' },
        { text: 'Contact', href: '#' }
      ]
    },
    resources: {
      title: 'Resources',
      links: [
        { text: 'Blog', href: '#' },
        { text: 'Case Studies', href: '#' },
        { text: 'Knowledge Base', href: '#' },
        { text: 'Privacy Policy', href: '#' },
        { text: 'Terms of Service', href: '#' }
      ]
    }
  }

  return (
    <footer id="about" className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <FooterColumn {...footerData.solutions} />
          <FooterColumn {...footerData.agents} />
          <FooterColumn {...footerData.company} />
          <FooterColumn {...footerData.resources} />
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Outperforma.ai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}