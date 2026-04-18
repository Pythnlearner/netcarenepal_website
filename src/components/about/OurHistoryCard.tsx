import React from 'react'
import { Award } from 'lucide-react'

export interface OurHistoryCardProps {
  years?: string
  title?: string
  description?: string
}

export default function OurHistoryCard({
  years = "10 Years",
  title = "Our Legacy",
  description = "For the past 10 years, Netcare Nepal has been the most reliable name in transport tech. From high-speed Wi-Fi to mobile CCTV, we provide the infrastructure that keeps Nepal moving, safely and connected. Safe Travel, Continuous Connectivity! \uD83D\uDE4F"
}: OurHistoryCardProps) {
  return (
    <section className="container mx-auto px-6 max-w-7xl">
      <div className="bg-aero-surface rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/5 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-netcare-red/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="shrink-0 relative z-10 flex flex-col items-center justify-center p-6 bg-midnight-deep/50 rounded-full border border-white/10 w-32 h-32 md:w-40 md:h-40">
           <Award className="text-netcare-red mb-2" size={40} />
           <span className="text-xl md:text-2xl font-bold text-mist-white">{years}</span>
        </div>
        <div className="space-y-4 relative z-10 text-center md:text-left flex-1">
           <p className="text-sm font-bold tracking-[0.2em] text-netcare-red uppercase">{title}</p>
           <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-mist-white leading-relaxed lg:leading-[1.4]">
             {description}
           </h2>
        </div>
      </div>
    </section>
  )
}
