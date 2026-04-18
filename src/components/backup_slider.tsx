'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

// Device Row - matching the pill-shaped bar in the screenshot
const DeviceRow = () => {
  const devices = [
    { name: 'Dome', url: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=200' },
    { name: 'Bullet', url: 'https://images.unsplash.com/photo-1621210199321-df56d108253a?w=200' },
    { name: 'Router', url: 'https://images.unsplash.com/photo-1558444479-c8f0103a1d39?w=200' },
  ]

  return (
    <div className="relative inline-flex items-center bg-white/5 backdrop-blur-md rounded-full px-6 py-2 border border-white/10 shadow-2xl">
      <div className="flex items-center gap-3">
        {devices.map((device, i) => (
          <div key={i} className="relative w-12 h-12 translate-y-[-10%] hover:scale-110 transition-transform">
            <Image 
              src={device.url} 
              alt={device.name} 
              width={48} 
              height={48} 
              className="object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.8)]"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export interface HeroProps {
  overline?: string
  headline?: string
  buttonText?: string
  carousel?: Array<{
    image: any
    label: string
  }>
}

const defaultCarousel = [
  { label: 'Airport', image: { url: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=1200' } },
  { label: 'Education', image: { url: 'https://images.unsplash.com/photo-1523050335192-ce1de9073bd1?q=80&w=1200' } },
  { label: 'Commercial', image: { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200' } },
  { label: 'Residential', image: { url: '/media/connection.jpeg' } },
  { label: 'Energy', image: { url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1200' } },
]

const BackupSlider: React.FC<HeroProps> = ({
  overline = 'Accurate, Secure, Efficient',
  headline = 'Netcare Smart Solutions',
  buttonText = 'Get Quotes Now!',
  carousel: propCarousel
}) => {
  const items = propCarousel && propCarousel.length > 0 ? propCarousel : defaultCarousel
  const [index, setIndex] = useState(0)

  const handleNext = () => setIndex((prev) => (prev + 1) % items.length)
  const handlePrev = () => setIndex((prev) => (prev - 1 + items.length) % items.length)

  const getVisibleItems = () => {
    return [
      { item: items[(index) % items.length], pos: 0 },
      { item: items[(index + 1) % items.length], pos: 1 },
      { item: items[(index + 2) % items.length], pos: 2 },
    ]
  }

  return (
    <section className="relative min-h-screen bg-netcare-navy overflow-hidden flex items-center pt-20">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-tr from-netcare-navy via-transparent to-black/40" />
      <div className="absolute top-1/2 left-[-10%] w-96 h-96 bg-netcare-red/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Content area (approx 40% width) */}
          <div className="lg:col-span-5 space-y-8 pr-4 z-50">
            <div className="space-y-4">
              <span className="inline-block text-netcare-red font-black tracking-[0.4em] text-[10px] uppercase">
                 {overline}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
                {headline.replace('Smart Solutions', 'Smart Solutions').split(/(Smart|Solutions)/g).map((part, i) => (
                  <span key={i} className={part === 'Smart' || part === 'Solutions' ? 'text-netcare-red' : ''}>
                    {part}
                  </span>
                ))}
              </h1>
            </div>

            <div className="flex">
              <Link
                href="/solutions"
                className="inline-flex bg-netcare-red text-white hover:opacity-90 px-8 py-4 rounded-full font-bold text-xs tracking-widest uppercase transition-all shadow-xl items-center gap-3"
              >
                {buttonText}
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="pt-2">
              <DeviceRow />
            </div>
          </div>

          {/* Right Side: Exact Screenshot Layout Slider (approx 60% width) */}
          <div className="lg:col-span-7 relative h-[600px] flex items-center">
            
            <div className="relative w-full h-full flex items-center">
              <AnimatePresence initial={false} mode='popLayout'>
                {getVisibleItems().map(({ item, pos }, i) => {
                  const isActive = pos === 0
                  
                  // Position mapping to match screenshot "1, 2, 3"
                  // 1 (Active) -> 350w x 480h
                  // 2 -> x: 380px (30px gap), 0.85 scale
                  // 3 -> x: 680px, 0.70 scale
                  const layout = {
                    0: { x: 0, scale: 1, zIndex: 40, opacity: 1, w: 350, h: 480 },
                    1: { x: 380, scale: 0.82, zIndex: 30, opacity: 0.8, w: 350, h: 480 },
                    2: { x: 680, scale: 0.65, zIndex: 20, opacity: 0.5, w: 350, h: 480 }
                  }

                  const s = layout[pos as keyof typeof layout]

                  return (
                    <motion.div
                      key={`${item.label}-${index + pos}`}
                      layout
                      initial={{ opacity: 0, x: 800 }}
                      animate={{ 
                         x: s.x, 
                         scale: s.scale, 
                         zIndex: s.zIndex, 
                         opacity: s.opacity 
                      }}
                      exit={{ 
                         x: -1200, // Slide all the way left "behind text"
                         opacity: 0, 
                         transition: { duration: 0.8 } 
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      style={{ 
                         width: s.w, 
                         height: s.h,
                         position: 'absolute',
                         left: 0
                      }}
                      className="rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)] border border-white/10 glassmorphism-overlay"
                    >
                       <Image
                         src={item.image.url}
                         alt={item.label}
                         fill
                         className="object-cover"
                         priority={isActive}
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-12 flex flex-col justify-end">
                         <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-wide">
                            {item.label}
                         </h3>
                       </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>

            {/* Navigation Arrows positioned below active slide */}
            <div className="absolute bottom-[-20px] left-0 flex gap-4 z-[100]">
              <button
                onClick={handlePrev}
                className="w-14 h-14 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-neutral-800 transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                className="w-14 h-14 rounded-full bg-black/40 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-netcare-red transition-all"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            
          </div>

        </div>
      </div>
    </section>
  )
}

export default BackupSlider
