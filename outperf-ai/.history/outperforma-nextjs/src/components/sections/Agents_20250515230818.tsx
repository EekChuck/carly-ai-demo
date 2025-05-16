'use client'

interface AgentCardProps {
  title: string
  description: string
}

function AgentCard({ title, description }: AgentCardProps) {
  return (
    <div className="card" style={{ padding: '1.5rem' }}>
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: 600,
        color: '#1f2937',
        marginBottom: '0.75rem'
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: '0.875rem',
        color: '#4b5563'
      }}>
        {description}
      </p>
    </div>
  )
}

export default function Agents() {
  const agents = [
    { title: 'Exec Inbox Assistant', description: 'Sorts & summarizes 500+ daily emails' },
    { title: 'Deal Desk Assistant', description: 'Compiles credit/trade info & lender flags' },
    { title: 'Sales Funnel Assistant', description: 'Alerts stalled leads & VIP opportunities' },
    { title: 'Social Campaign Manager', description: 'Auto-writes & routes content' },
    { title: 'After-Hours Agent', description: 'Captures web/text leads 24/7' },
    { title: 'Call Intercept Agent', description: 'Answers and routes live inbound calls' },
    { title: 'Email Triage Agent', description: 'Smart reply drafting/routing' },
    { title: 'SMS Outreach Agent', description: 'Reengagement, reminders' },
    { title: 'Video Agent', description: 'Sends vehicle walkarounds' },
    { title: 'Sales Assistant Agent', description: 'Educates on credit/trade' },
    { title: 'BDC Support Agent', description: 'Monitors workflow gaps' },
    { title: 'Unified Agent Stack', description: 'Consolidates tools into 1 flow' },
    { title: 'Sentiment Agent', description: 'Detects tone & SOP gaps' }
  ]

  return (
    <section id="agents" style={{ backgroundColor: '#f9fafb' }}>
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
            AI Workflow Agents
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#4b5563',
            maxWidth: '48rem',
            margin: '0 auto'
          }}>
            Supporting intelligence that works behind the scenes to optimize every aspect of your dealership operations
          </p>
        </div>
        <div className="grid grid-cols-1" style={{ gap: '1.5rem' }}>
          {agents.map((agent, index) => (
            <AgentCard key={index} {...agent} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 640px) {
          .grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 1024px) {
          .grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (min-width: 1280px) {
          .grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </section>
  )
}