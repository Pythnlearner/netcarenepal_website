'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Category {
  name: string
  image?: string | { url?: string }
}

interface TabbedProductsProps {
  badge?: string
  headline?: string
  description?: string
  categories?: Category[]
}

const fallbackCategories = [
  { name: 'Poe Ip Cameras & Nvrs' },
  { name: 'Wifi Security Cameras' },
  { name: 'DualLens Security Cameras' },
  { name: 'Battery Cameras' },
  { name: 'Video Doorbells' },
  { name: '4G Battery Camera' },
  { name: 'Security Camera Systems' }
]

const TabbedProducts: React.FC<TabbedProductsProps> = ({
  badge = "KEY FEATURES",
  headline = "Discover Which Security Cameras\nWork Best For Your Home",
  description = "Our refined selection of smart cameras offers unparalleled clarity and reliability, ensuring your assets are protected around the clock.",
  categories = fallbackCategories
}) => {
  const [activeTab, setActiveTab] = useState(categories[0]?.name || "Featured")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const activeCategory = categories.find(c => c.name === activeTab) || categories[0]
  const imageUrl = typeof activeCategory?.image === 'object' ? activeCategory.image?.url : activeCategory?.image
  const finalImage = imageUrl || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2000'

  return (
    <section className="py-16 bg-netcare-navy text-mist-white px-4 md:px-8 overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-netcare-red animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/80">{badge}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-snug whitespace-pre-line">
            {headline}
          </h2>
        </div>

        {/* Main Interface Card */}
        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-3 md:p-6 shadow-[0_30px_80px_rgba(0,0,0,0.5)] relative border border-white/5">

          {/* Tabs Container */}
          <div className="relative mb-6">
            <div className="flex items-center overflow-x-auto no-scrollbar gap-2 md:gap-3 pb-2 px-1">
              <button className="hidden md:flex shrink-0 w-8 h-8 items-center justify-center rounded-full border border-gray-100 text-gray-300 hover:bg-gray-50 transition-colors">
                <ChevronLeft size={16} />
              </button>

              <div className="flex items-center gap-2">
                {categories.map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(cat.name)}
                    className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-[10px] sm:text-xs font-bold tracking-wide transition-all duration-500 border ${activeTab === cat.name
                        ? 'bg-[#007AB8] border-[#007AB8] text-white shadow-md'
                        : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200 hover:text-gray-600'
                      }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              <button className="hidden md:flex shrink-0 w-8 h-8 items-center justify-center rounded-full border border-gray-100 text-gray-300 hover:bg-gray-50 transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Visual Showcase */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden group bg-white shadow-inner border border-gray-50">
            <Image
              src={finalImage}
              alt={activeTab}
              fill
              className="object-contain transition-transform duration-1000 group-hover:scale-[1.02] p-4"
              priority
            />

            {/* Field of View Overlay (Animated SVG) */}
            <div className="absolute inset-0 pointer-events-none z-10">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full opacity-20">
                <defs>
                  <radialGradient id="fovGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <path
                  d="M 50 50 L 20 100 L 80 100 Z"
                  fill="url(#fovGradient)"
                  className="origin-center transition-all duration-700 ease-in-out"
                  style={{
                    transform: `rotate(${categories.findIndex(c => c.name === activeTab) * 5}deg) scale(2)`
                  }}
                />
              </svg>
            </div>

            {/* Subtle Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />

            {/* Corner UI Elements - Matching the "Smart" aesthetic */}
            <div className="absolute top-6 left-6 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
              <span className="text-[9px] font-bold text-white uppercase tracking-widest backdrop-blur-md bg-black/20 px-2.5 py-0.5 rounded-full border border-white/10">Live POV</span>
            </div>

            <div className="absolute bottom-6 right-6 text-right hidden md:block">
              <p className="text-[9px] font-bold tracking-[0.2em] text-white/60 mb-0.5 uppercase">Recommended Zone</p>
              <h4 className="text-base md:text-lg font-bold leading-tight text-white">{activeTab}</h4>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default TabbedProducts
