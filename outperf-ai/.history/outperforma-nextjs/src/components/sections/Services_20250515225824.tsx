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
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">ADVco ConnectPro Series</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our comprehensive suite of AI solutions designed to maximize every opportunity in your dealership&apos;s customer journey
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}