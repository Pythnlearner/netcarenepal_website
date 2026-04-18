'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface SliderItem {
  name: string
  company: string
  image: string
}

interface SlicedImageSliderProps {
  items?: SliderItem[]
}

const DEFAULT_ITEMS: SliderItem[] = [
  {
    name: "Fleet Monitoring",
    company: "Netcare Pro",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Safe Reliable Transit",
    company: "Lumbini Express",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop"
  },
  {
    name: "Smart Wi-Fi Setup",
    company: "Sajha Yatayat",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Expert CCTV Support",
    company: "Logistics Hub",
    image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=2070&auto=format&fit=crop"
  }
]

export default function SlicedImageSlider({ items = DEFAULT_ITEMS }: SlicedImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const sliceCount = 10

  // We show 2 items at a time
  const itemsPerView = 2
  const totalSlides = Math.ceil(items.length / itemsPerView)
  const currentSlideItems = items.slice(currentIndex * itemsPerView, (currentIndex * itemsPerView) + itemsPerView)

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <section className="relative w-full aspect-[9/8] md:aspect-[3/2] lg:aspect-[18/11] bg-[#0A1128] overflow-hidden group">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          className="absolute inset-0 flex"
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {Array.from({ length: sliceCount }).map((_, i) => {
            // Determine which of the two images this slice belongs to
            const isSecondImage = i >= sliceCount / 2
            const imageIndex = isSecondImage ? 1 : 0
            const item = currentSlideItems[imageIndex] || currentSlideItems[0]
            
            // Local slice index (0-4 for first half, 0-4 for second half)
            const localSliceCount = sliceCount / 2
            const localI = isSecondImage ? i - localSliceCount : i

            return (
              <motion.div
                key={i}
                className="relative overflow-hidden"
                custom={i}
                variants={{
                  initial: (i: number) => ({
                    y: direction > 0 ? '100.5%' : '-100.5%',
                    opacity: 0,
                    rotateX: 30,
                  }),
                  animate: (i: number) => ({
                      y: 0,
                      opacity: 1,
                      rotateX: 0,
                      transition: {
                          duration: 0.9,
                          delay: i * 0.07,
                          ease: [0.21, 0.45, 0.32, 0.9],
                      }
                  }),
                  exit: (i: number) => ({
                    y: direction > 0 ? '-100.5%' : '100.5%',
                    opacity: 0,
                    rotateX: -30,
                    transition: {
                      duration: 0.7,
                      delay: (sliceCount - i) * 0.04,
                      ease: [0.21, 0.45, 0.32, 0.9],
                    }
                  })
                }}
                style={{
                  width: `${100 / sliceCount}%`,
                  height: '100%',
                }}
              >
                  <div 
                      className="absolute inset-0"
                      style={{
                          left: `-${localI * 100}%`,
                          width: `${localSliceCount * 100}%`,
                          height: '100%',
                      }}
                  >
                        <Image 
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                        />
                  </div>
                  {/* Divider for the middle */}
                  {i === (sliceCount / 2) - 1 && (
                      <div className="absolute top-0 right-0 w-[2px] h-full bg-[#0A1128] z-30" />
                  )}
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-transparent to-transparent opacity-80" />
                  
                  {/* Name Overlay for each image */}
                  <div className={`absolute bottom-6 left-4 z-20 pointer-events-none transition-opacity duration-500 ${isSecondImage ? 'opacity-100' : 'opacity-100'}`}>
                       {i === 0 && (
                            <div className="w-[300px]">
                                <p className="text-[#A32020] text-[10px] font-bold uppercase tracking-widest">{currentSlideItems[0].company}</p>
                                <h4 className="text-white text-sm font-black uppercase">{currentSlideItems[0].name}</h4>
                            </div>
                       )}
                       {i === sliceCount / 2 && currentSlideItems[1] && (
                            <div className="w-[300px]">
                                <p className="text-[#A32020] text-[10px] font-bold uppercase tracking-widest">{currentSlideItems[1].company}</p>
                                <h4 className="text-white text-sm font-black uppercase">{currentSlideItems[1].name}</h4>
                            </div>
                       )}
                  </div>
              </motion.div>
            )
          })}
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-40 flex justify-between px-4 pointer-events-none">
        <button
          onClick={prevSlide}
          className="w-10 h-10 rounded-full bg-midnight-deep/50 border border-white/10 text-white flex items-center justify-center transition-all hover:bg-[#A32020] pointer-events-auto backdrop-blur-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="w-10 h-10 rounded-full bg-midnight-deep/50 border border-white/10 text-white flex items-center justify-center transition-all hover:bg-[#A32020] pointer-events-auto backdrop-blur-sm"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  )
}
