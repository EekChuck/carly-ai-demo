'use client'

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
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: 600,
        color: 'white',
        marginBottom: '1.5rem'
      }}>
        {title}
      </h3>
      <ul style={{
        listStyle: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        {links.map((link, index) => (
          <li key={index}>
            <Link 
              href={link.href} 
              style={{
                color: '#d1d5db',
                textDecoration: 'none',
                transition: 'color 0.2s ease'
              }}
              className="footer-link"
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
    <footer id="about" style={{ backgroundColor: '#111827', paddingTop: '5rem', paddingBottom: '2.5rem' }}>
      <div className="container">
        <div className="grid grid-cols-1">
          <FooterColumn {...footerData.solutions} />
          <FooterColumn {...footerData.agents} />
          <FooterColumn {...footerData.company} />
          <FooterColumn {...footerData.resources} />
        </div>
        <div style={{
          borderTop: '1px solid #374151',
          marginTop: '3rem',
          paddingTop: '2rem',
          textAlign: 'center',
          color: '#9ca3af',
          fontSize: '0.875rem'
        }}>
          <p>&copy; {new Date().getFullYear()} Outperforma.ai. All rights reserved.</p>
        </div>
      </div>

      <style jsx>{`
        .footer-link:hover {
          color: white;
        }
        
        @media (min-width: 768px) {
          .grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 3rem;
          }
        }
        
        @media (min-width: 1024px) {
          .grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </footer>
  )
}