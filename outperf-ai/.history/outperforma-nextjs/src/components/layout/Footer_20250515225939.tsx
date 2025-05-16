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
    <div>
      <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
      <ul className="space-y-4">
        {links.map((link, index) => (
          <li key={index}>
            <Link 
              href={link.href} 
              className="text-gray-300 hover:text-white transition-colors duration-200"
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
    <footer id="about" className="bg-gray-900 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <FooterColumn {...footerData.solutions} />
          <FooterColumn {...footerData.agents} />
          <FooterColumn {...footerData.company} />
          <FooterColumn {...footerData.resources} />
        </div>
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Outperforma.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}