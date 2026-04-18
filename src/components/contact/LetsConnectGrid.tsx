import React from 'react'
import { Headphones, LifeBuoy, Wrench, Megaphone } from 'lucide-react'

export interface LetsConnectGridProps {
  title?: string
}

export default function LetsConnectGrid({
  title = "Let's Connect"
}: LetsConnectGridProps) {
  const contacts = [
    {
      title: 'General Support',
      desc: 'Questions, bugs, feedback - we\'re here to help.',
      email: 'netcarenepal@gmail.com',
      icon: LifeBuoy,
      action: 'Go to support'
    },
    {
      title: 'Sales',
      desc: 'Whether to try or buy - reach out and we can help.',
      email: 'netcarenepal@gmail.com',
      icon: Headphones,
      action: 'Contact sales'
    },
    {
      title: 'Technical Support',
      desc: 'Technical assistance and troubleshooting inquiries.',
      email: 'netcarenepal@gmail.com',
      icon: Wrench,
      action: 'Get assistance'
    },
    {
      title: 'Press',
      desc: 'For media inquiries, reach out to our press team.',
      email: 'netcarenepal@gmail.com',
      icon: Megaphone,
      action: 'Visit newsroom'
    }
  ]

  return (
    <section className="container mx-auto px-6 max-w-7xl">
      <div className="text-center space-y-4 mb-16">
        <p className="text-sm font-bold tracking-[0.2em] text-[#94a3b8] uppercase flex items-center justify-center gap-3">
            <span className="w-6 h-[2px] bg-netcare-red inline-block"></span>
            Contact Us
            <span className="w-6 h-[2px] bg-netcare-red inline-block"></span>
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-mist-white">
          {title}
        </h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
        {contacts.map((item, idx) => (
          <div key={idx} className="bg-aero-surface p-8 lg:p-10 rounded-3xl border border-white/5 shadow-xl hover:-translate-y-1 transition-transform flex flex-col sm:flex-row gap-6">
             <div className="shrink-0 mt-1">
                <item.icon size={32} className="text-[#94a3b8]" />
             </div>
             <div className="space-y-4">
                <h3 className="text-xl font-bold text-mist-white">{item.title}</h3>
                <p className="text-[15px] text-[#94a3b8] leading-relaxed">{item.desc}</p>
                <p className="text-sm text-netcare-red font-semibold hover:underline cursor-pointer">{item.email}</p>
                <div className="pt-2">
                   <button className="text-sm font-bold text-mist-white hover:text-netcare-red transition-colors flex items-center gap-2 group">
                      {item.action} 
                      <span className="group-hover:translate-x-1 transition-transform text-lg leading-none">&rarr;</span>
                   </button>
                </div>
             </div>
          </div>
        ))}
      </div>
    </section>
  )
}
