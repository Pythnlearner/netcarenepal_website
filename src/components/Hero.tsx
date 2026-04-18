'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Phone } from 'lucide-react'

// Device Row - matching the pill-shaped bar in the screenshot
const ContactPill = () => {
  return (
    <a
      href="tel:+9779802900818"
      className="flex items-center gap-3 bg-white/5 backdrop-blur-xl rounded-2xl px-6 py-5 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group transition-all hover:bg-white/10"
    >
      <div className="w-8 h-8 bg-netcare-red/20 rounded-full flex items-center justify-center group-hover:bg-netcare-red transition-all duration-300">
        <Phone size={14} className="text-netcare-red group-hover:text-white transition-colors animate-pulse" fill="currentColor" />
      </div>
      <span className="text-sm md:text-base font-black text-white group-hover:text-netcare-red transition-colors tracking-widest leading-none">9802900818</span>
    </a>
  )
}

export interface HeroProps {
  overline?: string
  headline?: string
  buttonText?: string
  carousel?: Array<{
    image: any
    label: string
    overline?: string
    headline?: string
  }>
}

interface Slide {
  overline: string
  headline: string
  label: string
  image: { url: string }
}

const defaultSlides: Slide[] = [
  {
    overline: 'NETCARE NEPAL',
    headline: 'Nepal\'s Smartest Fleet Solutions',
    label: 'Smart Transit',
    image: { url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2000' }
  },
  {
    overline: 'NETCARE NEPAL',
    headline: 'Advanced CCTV & Security Systems',
    label: 'Enterprise Security',
    image: { url: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2000' }
  },
  {
    overline: 'NETCARE NEPAL',
    headline: 'High-Speed Connectivity Everywhere',
    label: 'Managed Wi-Fi',
    image: { url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000' }
  },
  {
    overline: 'NETCARE NEPAL',
    headline: 'Smart Solutions for Modern Schools',
    label: 'Education Tech',
    image: { url: 'https://images.unsplash.com/photo-1523050335192-ce1de9073bd1?q=80&w=2000' }
  }
]

const Hero: React.FC<HeroProps> = ({ carousel: propCarousel }) => {
  const items = propCarousel && propCarousel.length > 0 ? propCarousel : defaultSlides
  const [index, setIndex] = useState(0)

  const handleNext = () => setIndex((prev) => (prev + 1) % items.length)
  const handlePrev = () => setIndex((prev) => (prev - 1 + items.length) % items.length)

  const activeSlide = items[index] as any

  const getVisibleItems = () => {
    // Return 5 items to create a true coverflow effect
    return [
      { item: items[(index - 2 + items.length) % items.length], pos: -2 },
      { item: items[(index - 1 + items.length) % items.length], pos: -1 },
      { item: items[(index) % items.length], pos: 0 },
      { item: items[(index + 1) % items.length], pos: 1 },
      { item: items[(index + 2) % items.length], pos: 2 },
    ]
  }

  useEffect(() => {
    const timer = setInterval(handleNext, 10000)
    return () => clearInterval(timer)
  }, [items.length])

  return (
    <section className="relative min-h-screen bg-netcare-navy overflow-hidden flex items-center pt-20">

      {/* 1. Cinematic Background Layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.15, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={activeSlide.image?.url || ""}
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* 2. Global Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-netcare-navy via-netcare-navy/80 to-transparent z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(235,51,51,0.05)_0%,transparent_50%)] z-[1]" />

      <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">

          {/* Left Side: Dynamic Text Content */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-8 z-50">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.6, ease: "circOut" }}
                className="space-y-4"
              >
                <div className="flex">
                  <span className="inline-block text-netcare-red font-black tracking-[0.6em] text-sm md:text-base uppercase bg-netcare-red/10 px-6 py-2 rounded-full border border-netcare-red/20 shadow-[0_0_30px_rgba(235,51,51,0.1)]">
                    NETCARE NEPAL
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.95] text-white">
                  {(activeSlide.headline || activeSlide.label).split(' ').map((word: string, i: number) => (
                    <span key={i} className={word === 'Smart' || word === 'Solutions' || word === 'Smartest' || word === 'Connectivity' || word === 'Customer' ? 'text-netcare-red' : ''}>
                      {word}{' '}
                    </span>
                  ))}
                </h1>
                <p className="text-netcare-warm-gray/60 text-sm md:text-base max-w-sm leading-relaxed">
                  Leading the digital transformation of Nepal's critical infrastructure through enterprise-grade connectivity and intelligence.
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <Link
                href="/solutions"
                className="w-full sm:w-auto px-10 py-5 bg-netcare-red text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl hover:bg-white hover:text-netcare-red transition-all duration-500 shadow-[0_20px_40px_-10px_rgba(235,51,51,0.5)] flex items-center justify-center gap-3 overflow-hidden group"
              >
                <span>Discover Solutions</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <ContactPill />
            </div>
          </div>

          {/* Right Side: Interactive 3D Coverflow Preview */}
          <div className="hidden lg:block lg:col-span-12 xl:col-span-7 relative pt-20 lg:pt-0">
            <div className="relative h-[600px] flex items-center justify-center perspective-[1500px]">
              <AnimatePresence initial={false}>
                {getVisibleItems().map(({ item, pos }) => (
                  <motion.div
                    key={`${index}-${(item as any).label}-${pos}`}
                    initial={{ opacity: 0, x: pos > 0 ? 300 : -300, scale: 0.5, rotateY: pos > 0 ? -45 : 45 }}
                    animate={{
                      opacity: Math.abs(pos) === 2 ? 0.3 : Math.abs(pos) === 1 ? 0.6 : 1,
                      x: pos === 0 ? 0 : pos === -1 ? -180 : pos === 1 ? 180 : pos === -2 ? -320 : 320,
                      y: Math.abs(pos) === 0 ? 0 : 20,
                      scale: Math.abs(pos) === 2 ? 0.6 : Math.abs(pos) === 1 ? 0.8 : 1.1,
                      zIndex: 50 - Math.abs(pos) * 10,
                      rotateY: pos === 0 ? 0 : pos < 0 ? 45 : -45,
                      filter: pos === 0 ? 'blur(0px)' : 'blur(2px)',
                    }}
                    exit={{ opacity: 0, scale: 0.3, x: pos > 0 ? -400 : 400 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 25,
                    }}
                    className="absolute w-[300px] md:w-[350px] h-[450px] rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] group cursor-pointer border border-white/5 bg-netcare-navy"
                    onClick={() => {
                      if (pos !== 0) setIndex((prev) => (prev + pos + items.length) % items.length)
                    }}
                  >
                    <Image src={(item as any).image?.url || ""} alt={(item as any).label} fill className="object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-netcare-navy/90 via-transparent to-transparent opacity-80" />

                    <div className="absolute bottom-10 left-8 right-8 space-y-3">
                      <p className={`text-[9px] font-black uppercase tracking-[0.4em] ${pos === 0 ? 'text-netcare-red' : 'text-white/40'}`}>
                        {pos === 0 ? 'Featured Solution' : 'Explore Portfolio'}
                      </p>
                      <h3 className={`font-black text-white tracking-tighter leading-none transition-all ${pos === 0 ? 'text-3xl' : 'text-xl'}`}>
                        {(item as any).label}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Discrete Navigation */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-10 z-50">
              <button onClick={handlePrev} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-netcare-navy transition-all group backdrop-blur-md bg-white/5">
                <ChevronLeft size={24} className="group-active:scale-90 transition-transform" />
              </button>
              <div className="flex gap-2">
                {items.map((_, i) => (
                  <div key={i} className={`h-1 rounded-full transition-all duration-700 ${i === index ? 'w-10 bg-netcare-red' : 'w-2 bg-white/20'}`} />
                ))}
              </div>
              <button onClick={handleNext} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-netcare-navy transition-all group backdrop-blur-md bg-white/5">
                <ChevronRight size={24} className="group-active:scale-90 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero
