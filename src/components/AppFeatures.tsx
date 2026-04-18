'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, Cloud, Shield, Lock, RotateCcw } from 'lucide-react'

const fallbackFeatures = [
  {
    title: "Live GPS Tracking",
    icon: <Cloud size={18} className="text-netcare-red" />,
    description: "Monitor the exact location, speed, and status of your entire fleet in real-time."
  },
  {
    title: "CCTV & Video Feeds",
    icon: <Shield size={18} className="text-netcare-red" />,
    description: "Stream live footage from any vehicle directly to your dashboard for total security compliance."
  },
  {
    title: "Ticketing & Sales",
    icon: <RotateCcw size={18} className="text-netcare-red" />,
    description: "View live passenger counts, digital bookings, and cross-platform multi-tenant bus ticketing."
  },
  {
    title: "Network Maintenance",
    icon: <Lock size={18} className="text-netcare-red" />,
    description: "Check the uptime and health of onboard Wi-Fi systems with automated troubleshooting alerts."
  }
]

export interface AppFeatureItem {
  title: string
  description: string
  icon?: string
}

interface AppFeaturesProps {
  headline?: string
  description?: string
  buttonText?: string
  features?: AppFeatureItem[]
}

const AppFeatures: React.FC<AppFeaturesProps> = ({
  headline = "Complete Fleet Control, In Your Pocket.",
  description = "Managing a transport network shouldn't require you to be chained to a desk. The Netcare dashboard puts full control of your operations into a secure management portal.",
  buttonText = "Schedule a Demo",
  features = fallbackFeatures as any
}) => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="py-20 bg-netcare-navy text-netcare-warm-gray px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        <div className="space-y-10">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold leading-snug text-white">{headline}</h2>
            <p className="text-sm md:text-base text-netcare-warm-gray/60 leading-relaxed max-w-lg">
              {description}
            </p>
          </div>

          <div className="space-y-3">
            {features.map((feature, i) => (
              <div
                key={i}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${activeIndex === i ? 'border-netcare-red/30 bg-white/5 shadow-xl' : 'border-white/5 hover:border-white/10'}`}
              >
                <button
                  onClick={() => setActiveIndex(i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${activeIndex === i ? 'bg-netcare-red text-white shadow-lg shadow-netcare-red/20' : 'bg-white/5 text-netcare-warm-gray/40'}`}>
                      {typeof feature.icon === 'string' ? (
                        feature.icon === 'Cloud' ? <Cloud size={18} /> :
                          feature.icon === 'RotateCcw' ? <RotateCcw size={18} /> :
                            feature.icon === 'Lock' ? <Lock size={18} /> :
                              <Shield size={18} />
                      ) : (feature.icon || <Cloud size={18} />)}
                    </div>
                    <span className="text-lg md:text-xl font-semibold leading-normal tracking-wide">{feature.title}</span>
                  </div>
                  <ChevronDown className={`transition-transform duration-300 ${activeIndex === i ? 'rotate-180 text-netcare-red' : 'text-white/20'}`} size={18} />
                </button>
                <div className={`px-5 overflow-hidden transition-all duration-300 ${activeIndex === i ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-xs md:text-sm leading-relaxed text-netcare-warm-gray/50 pl-14">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button className="bg-netcare-red text-white hover:bg-red-800 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-xl hover:shadow-netcare-red/20">
            {buttonText}
          </button>
        </div>

        <div className="relative group">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-netcare-red/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-white/10">
            <Image
              src="https://images.unsplash.com/photo-1512428559083-a4c446bb32b9?auto=format&fit=crop&q=80&w=1200"
              alt="Mobile Dashboard"
              width={800}
              height={1000}
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AppFeatures
