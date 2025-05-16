interface ServiceCardProps {
  title: string
  purpose: string
  values: string[]
}

function ServiceCard({ title, purpose, values }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">{title}</h3>
      <p className="text-base md:text-lg text-gray-600 mb-6">{purpose}</p>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-primary font-semibold mb-3">Value Delivered:</h4>
        <ul className="space-y-2">
          {values.map((value, index) => (
            <li key={index} className="flex items-start text-gray-600">
              <span className="mr-2 text-primary">•</span>
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
