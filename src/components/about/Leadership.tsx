'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const leaders = [
  {
    name: "Balram Mandal Dhanuk",
    role: "CEO",
    bio: "Dedicated to bringing robust networking and security infrastructure to the heart of Nepal's transport industry.",
    image: "/balram.png" // Fallback, will check CMS
  },
  {
    name: "Subash Gautam",
    role: "CO-FOUNDER AND CCO",
    bio: "Dedicated to bringing robust customer care support and Client support and client satisfaction.",
    image: "/subash.png"
  },
  {
    name: "Shekhar Bahadur Singh",
    role: "CO-FOUNDER AND COO",
    bio: "Dedicated to revolutionizing Nepal's business operations through digital innovation. Focused on delivering tailored CRM, web, and software solutions across all industries.",
    image: "/shekhar.png"
  }
]

interface LeaderMember {
  name: string
  role: string
  bio: string
  image: string
}

interface LeadershipProps {
  members?: LeaderMember[]
}

export default function Leadership({ members }: LeadershipProps) {
  const displayLeaders = members && members.length > 0 ? members : leaders

  return (
    <section className="py-20 bg-midnight-deep container mx-auto px-6 max-w-7xl">
      <div className="flex items-center gap-6 mb-16 px-2">
        <div className="h-px flex-1 bg-white/10" />
        <p className="text-[14px] md:text-[16px] uppercase font-black tracking-[0.6em] text-white/40">
           Founders <span className="text-netcare-red">&</span> Leadership
        </p>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {displayLeaders.map((leader, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.8, ease: "easeOut" }}
            className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] overflow-hidden group hover:bg-white/10 transition-all duration-700 flex flex-col items-center p-12 text-center shadow-2xl space-y-8"
          >
            <div className="relative w-44 h-44 rounded-3xl overflow-hidden border-2 border-netcare-red group-hover:scale-105 transition-all duration-500 shadow-2xl">
              <Image 
                src={leader.image} 
                alt={leader.name} 
                fill 
                className="object-cover" 
                onError={(e: any) => {
                  e.currentTarget.src = "/placeholder.png"
                }}
              />
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-white tracking-tighter uppercase mb-3 leading-tight">{leader.name}</h3>
                <div className="inline-block bg-netcare-red px-6 py-2 rounded-xl shadow-[0_0_20px_rgba(238,31,59,0.3)]">
                  <p className="text-white text-[10px] font-black uppercase tracking-[0.4em]">
                    {leader.role}
                  </p>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-[280px] mx-auto font-medium">
                {leader.bio}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
