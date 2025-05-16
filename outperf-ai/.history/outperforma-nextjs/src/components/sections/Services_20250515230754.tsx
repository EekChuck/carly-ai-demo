'use client'

interface ServiceCardProps {
  title: string
  purpose: string
  values: string[]
}

function ServiceCard({ title, purpose, values }: ServiceCardProps) {
  return (
    <div className="card" style={{ padding: '2rem' }}>
      <h3 style={{
        fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
        fontWeight: 700,
        color: '#1f2937',
        marginBottom: '1rem'
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: '1.125rem',
        color: '#4b5563',
        marginBottom: '1.5rem'
      }}>
        {purpose}
      </p>
      <div style={{
        backgroundColor: '#f9fafb',
        padding: '1rem',
        borderRadius: '0.5rem'
      }}>
        <h4 style={{
          color: `rgb(var(--primary-rgb))`,
          fontWeight: 600,
          marginBottom: '0.75rem'
        }}>
          Value Delivered:
        </h4>
        <ul style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          {values.map((value, index) => (
            <li key={index} style={{
              display: 'flex',
              alignItems: 'start',
              color: '#4b5563',
              gap: '0.5rem'
            }}>
              <span style={{ color: `rgb(var(--primary-rgb))` }}>•</span>
              <span>{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Services() {
  const services = [
    {
      title: 'RecallConnect Pro',
      purpose: 'Book service appointments for safety recalls and manufacturer campaigns',
      values: [
        'Increase recall completion rates',
        'Enhance customer safety compliance',
        'Reduce regulatory risk'
      ]
    },
    {
      title: 'LeadConnect Pro',
      purpose: 'Book appointments for new sales leads within the first 24 hours',
      values: [
        'Improve lead response time',
        'Increase appointment show rates',
        'Maximize new opportunity conversion'
      ]
    },
    {
      title: 'ReConnect Pro',
      purpose: 'Re-engage and book appointments for aged leads (30+ days old)',
      values: [
        'Resurrect "dead" opportunities',
        'Convert long-term prospects',
        'Maximize lead database ROI'
      ]
    },
    {
      title: 'ServiceConnect Pro',
      purpose: 'Book routine maintenance appointments and service reminders',
      values: [
        'Increase service department utilization',
        'Improve customer retention',
        'Boost fixed operations revenue'
      ]
    },
    {
      title: 'ReceiveConnect Pro',
      purpose: 'Handle inbound inquiries and route calls intelligently across departments',
      values: [
        'Eliminate missed calls',
        'Reduce hold times',
        'Capture after-hours opportunities',
        'Improve customer first contact experience'
      ]
    },
    {
      title: 'DeliverConnect Pro',
      purpose: 'Coordinate vehicle delivery appointments and purchase completion',
      values: [
        'Streamline delivery process',
        'Reduce bottlenecks',
        'Improve customer satisfaction at delivery'
      ]
    }
  ]

  return (
    <section id="services" style={{ backgroundColor: 'white' }}>
      <div className="container">
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
            fontWeight: 700,
            color: '#1f2937',
            marginBottom: '1rem'
          }}>
            ADVco ConnectPro Series
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#4b5563',
            maxWidth: '48rem',
            margin: '0 auto'
          }}>
            Our comprehensive suite of AI solutions designed to maximize every opportunity in your dealership&apos;s customer journey
          </p>
        </div>
        <div className="grid grid-cols-1" style={{ gap: '2rem' }}>
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 1024px) {
          .grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </section>
  )
}