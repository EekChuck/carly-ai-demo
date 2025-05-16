interface AgentCardProps {
  title: string
  description: string
}

function AgentCard({ title, description }: AgentCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300 ease-in-out">
      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
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
    <section id="agents" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            AI Workflow Agents
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Supporting intelligence that works behind the scenes to optimize every aspect of your dealership operations
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {agents.map((agent, index) => (
            <AgentCard key={index} {...agent} />
          ))}
        </div>
      </div>
    </section>
  )
}