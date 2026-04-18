import React from 'react'
import Image from 'next/image'
import { PhoneCall } from 'lucide-react'

export interface AboutHeroBannerProps {
  badge?: string
  headline?: string
  description?: string
  image?: string | { url?: string }
}

export default function AboutHeroBanner({
  badge = "OUR JOURNEY",
  headline = "10+ Years of Excellence in Transport Technology",
  description = "A warm welcome to the official page of Netcare Nepal! Safe Travel, Continuous Connectivity! \uD83D\uDE4F",
  image
}: AboutHeroBannerProps) {
  const imageUrl = typeof image === 'object' ? image?.url : image;
  const finalImage = imageUrl || 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200';
  return (
    <section className="container mx-auto px-6 max-w-7xl">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[500px] lg:min-h-[600px] flex items-center">
        <Image
          src={finalImage}
          alt="Engineer installing CCTV"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight-deep via-midnight-deep/80 to-transparent"></div>
        
        <div className="relative z-10 p-8 lg:p-16 max-w-3xl space-y-6">
          <p className="text-sm font-bold tracking-[0.2em] text-[#94a3b8] uppercase flex items-center gap-3">
             <span className="w-8 h-[2px] bg-netcare-red inline-block"></span>
             {badge}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-mist-white leading-[1.1]">
            {headline}
          </h1>
          <p className="text-lg md:text-xl text-mist-white/80 max-w-xl">
            {description}
          </p>
        </div>

        {/* Floating Badge */}
        <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 bg-aero-surface backdrop-blur-xl border border-white/10 p-4 lg:p-5 rounded-2xl flex items-center gap-4 shadow-2xl transition-transform hover:-translate-y-1">
          <div className="w-12 h-12 rounded-full bg-netcare-red flex items-center justify-center shrink-0">
             <PhoneCall size={20} className="text-mist-white" fill="currentColor" />
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest text-[#94a3b8] uppercase mb-1">Call Now:</p>
            <p className="text-sm lg:text-base font-bold text-mist-white whitespace-nowrap">+977 9802900818 | +977 9802900819</p>
          </div>
        </div>
      </div>
    </section>
  )
}
