'use client'

import React, { useMemo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

interface Customer {
  title: string
  image: string | { url: string }
}

interface CustomerMasonryProps {
  headline?: string
  subheadline?: string
  gallery?: Customer[]
}

const CustomerMasonry: React.FC<CustomerMasonryProps> = ({ 
  headline = "Trusted By 50+ Modern Bus Fleets", 
  subheadline = "Partnering with Nepal's leading transport companies to deliver superior connectivity and security.",
  gallery = []
}) => {
  // Staggered height simulation for the masonry look if not using a library
  const masonryColumns = useMemo(() => {
    const cols: Customer[][] = [[], [], [], []]
    
    // If gallery is empty, we don't render much, but typically we'd have fallbacks
    // For this build, I'll expect the CMS to be populated or show a placeholder message
    gallery.forEach((item, index) => {
      cols[index % 4].push(item)
    })
    return cols
  }, [gallery])

  if (!gallery || gallery.length === 0) {
    return (
      <section className="py-24 bg-netcare-navy text-center">
        <p className="text-white/40 italic">Gallery currently under maintenance. Please populate via CMS.</p>
      </section>
    )
  }

  return (
    <section className="py-24 bg-netcare-navy relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-netcare-red/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Top Link */}
        <div className="flex justify-center mb-16">
          <button className="flex items-center gap-2 text-xs font-bold text-netcare-warm-gray/60 hover:text-white transition-colors group">
            Collaborate with Us for Better Performance, Don&apos;t Hesitate 
            <span className="text-white group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              Contact Us <span className="text-lg leading-none">&rarr;</span>
            </span>
          </button>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 mb-20">
          {gallery.map((item, index) => {
            const imageUrl = typeof item.image === 'string' ? item.image : item.image?.url
            if (!imageUrl) return null

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className={`group relative rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:border-netcare-red/30
                  ${index % 5 === 0 ? 'lg:h-64' : ''}
                  ${index % 5 === 1 ? 'lg:h-96 lg:-mt-12' : ''}
                  ${index % 5 === 2 ? 'lg:h-80 lg:mt-4' : ''}
                  ${index % 5 === 3 ? 'lg:h-[28rem] lg:-mt-24' : ''}
                  ${index % 5 === 4 ? 'lg:h-72 lg:mt-8' : ''}
                  h-64 md:h-80
                `}
              >
                <Image
                  src={imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-netcare-navy/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <p className="text-white font-black text-sm tracking-tighter uppercase italic">{item.title}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Footer Content */}
        <div className="text-center space-y-8 max-w-2xl mx-auto">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1">
               <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1 shadow-lg">
                  <div className="w-full h-full bg-netcare-navy rounded-md flex items-center justify-center">
                    <span className="text-white text-[10px] font-black">C</span>
                  </div>
               </div>
               <div className="flex flex-col items-start px-2">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-orange-400 text-orange-400" />)}
                  </div>
                  <span className="text-[10px] font-bold text-netcare-warm-gray/40 tracking-widest uppercase mt-0.5">500+ REVIEWS</span>
               </div>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tighter">
            {headline.split(' ').map((word, i) => (
              <span key={i} className={word.toLowerCase() === 'trusted' ? 'text-netcare-red' : ''}>
                {word}{' '}
              </span>
            ))}
          </h2>
          <p className="text-netcare-warm-gray/60 text-base leading-relaxed">
            {subheadline}
          </p>
        </div>

      </div>
    </section>
  )
}

export default CustomerMasonry
