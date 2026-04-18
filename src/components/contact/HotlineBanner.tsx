import React from 'react'
import { Phone } from 'lucide-react'

export interface HotlineBannerProps {
  phone?: string
  email?: string
}

export default function HotlineBanner({
  phone = "+977 9802900818"
}: HotlineBannerProps) {
  return (
    <section className="container mx-auto px-6 max-w-7xl">
      <div className="bg-gradient-to-br from-[#1b2a4e] to-[#121e33] border border-netcare-red/30 p-12 lg:p-24 rounded-[3rem] text-center space-y-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-netcare-red/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-netcare-red/10 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="relative z-10 space-y-5 max-w-3xl mx-auto flex flex-col items-center">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 ring-1 ring-white/10">
             <Phone size={28} className="text-mist-white" fill="currentColor" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-mist-white leading-[1.2]">
            Need Immediate Assistance?
          </h2>
          <p className="text-[#94a3b8] text-lg lg:text-xl">
            Our priority hotline is always open for critical support and urgent enterprise inquiries.
          </p>
        </div>
        
        <div className="relative z-10 pt-6 flex justify-center">
          <a 
            href={`tel:${phone.replace(/\s+/g, '')}`} 
            className="group relative inline-flex items-center justify-center gap-4 bg-netcare-red text-white py-5 px-8 md:py-6 md:px-12 rounded-full text-3xl md:text-4xl font-black tracking-widest shadow-[0_0_40px_rgba(217,59,59,0.4)] hover:shadow-[0_0_60px_rgba(217,59,59,0.7)] hover:scale-105 transition-all duration-300"
          >
            {phone}
          </a>
        </div>
      </div>
    </section>
  )
}
