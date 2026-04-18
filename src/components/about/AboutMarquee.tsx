'use client'

import React from 'react'
import { Wifi, ShieldCheck, MapPin, Globe, Smartphone } from 'lucide-react'

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
    icon: Globe,
    title: 'Custom Web Platforms',
    desc: 'Scalable, high-performance websites and intelligent CRM portals tailored to drive your brand’s digital transformation.',
  },
  {
    icon: Smartphone,
    title: 'Enterprise App Solutions',
    desc: 'Intuitive and powerful mobile applications engineered to streamline day-to-day management and engage your users.',
  },
]

export default function AboutMarquee() {
  return (
    <div className="w-full overflow-hidden bg-midnight-deep py-8 md:py-12 relative group">
       {/* Fade Overlays */}
       <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-midnight-deep to-transparent z-10" />
       <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-midnight-deep to-transparent z-10" />

       <div className="flex animate-marquee group-hover:pause-marquee whitespace-nowrap gap-6">
         {[...services, ...services].map((srv, idx) => {
           // Array of premium colors for icons
           const iconColors = ['text-blue-400', 'text-red-500', 'text-amber-400', 'text-emerald-400', 'text-purple-400'];
           const colorClass = iconColors[idx % iconColors.length];

           return (
            <div 
              key={idx} 
              className="inline-block min-w-[320px] max-w-[320px] min-h-[340px] bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[3rem] shadow-2xl transition-all duration-500 hover:border-netcare-red/30 hover:bg-white/[0.07] whitespace-normal text-center flex flex-col items-center justify-center space-y-8"
            >
              <div className="w-20 h-20 rounded-2xl bg-midnight-deep/60 flex items-center justify-center border border-white/10 shadow-inner">
                <srv.icon size={40} className={`${colorClass} transition-transform duration-500 group-hover:scale-110`} />
              </div>
              <div className="space-y-4">
                <h4 className="text-2xl font-black text-white leading-tight tracking-tight uppercase">{srv.title}</h4>
                <p className="text-sm text-white/50 font-medium leading-relaxed px-2">{srv.desc}</p>
              </div>
            </div>
           );
         })}
       </div>
    </div>
  )
}
