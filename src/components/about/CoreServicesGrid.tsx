import React from 'react'
import { Wifi, ShieldCheck, MapPin, Monitor, Smartphone } from 'lucide-react'

const services = [
  {
    icon: Wifi,
    title: 'Public Transport Wi-Fi',
    desc: 'High-speed, stable 4G internet connectivity designed to keep passengers seamlessly connected on every journey.',
  },
  {
    icon: ShieldCheck,
    title: 'Smart CCTV Security',
    desc: 'Live remote monitoring and historical video playback to ensure complete passenger safety and government compliance.',
  },
  {
    icon: MapPin,
    title: 'Advanced GPS Tracking',
    desc: 'Real-time fleet telemetry, emergency route tracking, and fuel optimization to maximize your operational efficiency.',
  },
  {
    icon: Monitor,
    title: 'Custom Web Platforms',
    desc: 'Scalable, high-performance websites and intelligent CRM portals tailored to drive your brand’s digital transformation.',
  },
  {
    icon: Smartphone,
    title: 'Enterprise App Solutions',
    desc: 'Intuitive and powerful mobile applications engineered to streamline day-to-day management and engage your users.',
  },
]

export interface CoreServiceItem {
  title: string
  desc: string
  icon?: any
}

export interface CoreServicesGridProps {
  title?: string
  services?: CoreServiceItem[]
}

export default function CoreServicesGrid({
  title = "Our Foundations",
  services: srvProps
}: CoreServicesGridProps) {
  // If the CMS has old data (less than 5 items), we override with our new 5-item precision list
  const displayServices = srvProps && srvProps.length >= 5 ? srvProps : services

  return (
    <section className="container mx-auto px-6 max-w-7xl space-y-12 overflow-hidden">
      <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 gap-6 no-scrollbar">
        {displayServices.map((srv, idx) => {
          let Icon = srv.icon
          if (typeof Icon === 'string') {
            const lucideIcons = require('lucide-react')
            const iconMap: any = {
              'Wifi': Wifi,
              'ShieldCheck': ShieldCheck,
              'Video': ShieldCheck,
              'MapPin': MapPin,
              'Headset': MapPin,
              'Monitor': Monitor,
              'Wrench': Monitor,
              'Smartphone': Smartphone
            }
            Icon = iconMap[Icon] || lucideIcons[Icon] || Wifi
          } else if (!Icon) {
            Icon = Wifi
          }

          return (
            <div 
              key={idx} 
              className="min-w-[300px] md:min-w-[350px] bg-aero-surface p-10 rounded-3xl border border-white/5 space-y-8 shadow-2xl snap-center flex-shrink-0 hover:border-white/20 transition-all duration-500 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-midnight-deep/60 flex items-center justify-center border border-white/10 shadow-inner group-hover:bg-netcare-red/10 group-hover:border-netcare-red/30 transition-all duration-500">
                <Icon size={32} className="text-mist-white group-hover:text-netcare-red transition-all duration-500" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-mist-white leading-tight">{srv.title}</h3>
                <p className="text-sm text-[#94a3b8] leading-relaxed font-medium">{srv.desc}</p>
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Scroll Indicator Hint */}
      <div className="flex justify-center gap-2 lg:hidden">
        <div className="w-12 h-1 bg-netcare-red/30 rounded-full overflow-hidden">
          <div className="w-1/3 h-full bg-netcare-red animate-pulse" />
        </div>
      </div>
    </section>
  )
}
