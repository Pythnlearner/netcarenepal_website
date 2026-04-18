'use client'

import React from 'react'
import Image from 'next/image'
import { Quote } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface SocialProofProps {
  title?: string
  visionText?: string
  establishedDate?: string
  partners?: string[]
  testimonials?: Array<{
    quote: string
    authorName: string
    authorRole: string
    authorAvatar: any
  }>
  founders?: Array<{
    name: string
    role: string
    bio?: string
    image: any
  }>
}

const defaultTestimonials = [
  {
    quote: "Netcare Nepal solved our connectivity problems during high-altitude routes. Our passengers are happier, and our fleet tracking is finally seamless.",
    authorName: "Rajesh Shrestha",
    authorRole: "CEO, Himalayan Bus Lines",
    authorAvatar: { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" }
  },
  {
    quote: "Implementation was incredibly smooth. High-speed internet is now a key USP for our premium tourist bus fleet. Their support is unparalleled in Nepal.",
    authorName: "Sarita KC",
    authorRole: "Director, Everest Travels",
    authorAvatar: { url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" }
  },
  {
    quote: "Their CCTV system provides unmatched security for our night-shift drivers. The live feed quality is excellent even on scattered highway networks.",
    authorName: "Anupama Bhatta",
    authorRole: "Manager, Metro Wings",
    authorAvatar: { url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" }
  }
]

const defaultPartners = ["Everest Fleet", "Himalayan Bus Line", "Nepal Telecom", "SafeCity Initiative", "Global Link", "Yatayat Plus"]

const defaultFounders = [
  { name: "Suman Thapa", role: "Co-Founder / CTO", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800" },
  { name: "Anish Gurung", role: "Co-Founder / COO", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800" }
]

const SocialProof: React.FC<SocialProofProps> = ({ 
  title, 
  visionText,
  establishedDate,
  partners: propPartners, 
  testimonials: propTestimonials, 
  founders: propFounders 
}) => {
  const [activeTestimonial, setActiveTestimonial] = React.useState(0)
  const items = propTestimonials && propTestimonials.length > 0 ? propTestimonials : defaultTestimonials
  const partners = propPartners && propPartners.length > 0 ? propPartners : defaultPartners
  const leaders = propFounders && propFounders.length > 0 ? propFounders : defaultFounders

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % items.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [items.length])

  return (
    <section id="social-proof" className="py-12 bg-gradient-to-br from-netcare-navy via-[#061B3A] to-netcare-navy text-netcare-warm-gray px-4 md:px-8 overflow-hidden relative border-t border-white/5">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: flex; width: max-content; animation: marquee 60s linear infinite; }
        .marquee-item { flex-shrink: 0; padding: 0 60px; white-space: nowrap; }
        .marquee-fade-v3::before, .marquee-fade-v3::after { content: ""; position: absolute; top: 0; width: 100px; height: 100%; z-index: 10; pointer-events: none; }
        .marquee-fade-v3::before { left: 0; background: linear-gradient(to right, #0a1128 5%, transparent 100%); }
        .marquee-fade-v3::after { right: 0; background: linear-gradient(to left, #0a1128 5%, transparent 100%); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* Dynamic Glow Accents */}
      <div className="absolute top-0 left-1/4 w-[250px] h-[250px] bg-netcare-red/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-netcare-lilac/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 md:space-y-20 relative z-10">

        {/* 1. Partner Logos */}
        <div className="text-center space-y-4 relative max-w-5xl mx-auto overflow-hidden">
          <p className="text-[8px] uppercase font-bold tracking-[0.4em] text-netcare-warm-gray/30">
            {title || "Industry Pioneers"}
          </p>
          <div className="marquee-fade-v3 relative flex overflow-hidden py-2 opacity-50 grayscale group hover:grayscale-0 transition-all duration-700">
            <div className="animate-marquee">
              {[...partners, ...partners].map((partner, i) => (
                <span key={i} className="marquee-item text-[10px] md:text-sm font-bold text-netcare-warm-gray/60 tracking-[0.1em] hover:text-netcare-red transition-all duration-300 cursor-default select-none">
                  {partner.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Testimonial Slider */}
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute -top-6 -left-6 text-netcare-red/5 select-none pointer-events-none">
            <Quote size={120} />
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTestimonial}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 md:p-12 relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-netcare-red/10 rounded-full blur-[80px] -mr-24 -mt-24" />
              
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
                <div className="flex-1 space-y-6 text-center md:text-left">
                   <h2 className="text-base md:text-lg font-bold leading-relaxed text-white italic">
                     {items[activeTestimonial].quote}
                   </h2>
                   <div className="flex flex-col md:flex-row items-center gap-4">
                      <div className="w-10 h-10 rounded-xl overflow-hidden border border-netcare-red shadow-lg transform -rotate-3 relative">
                         <Image
                           src={typeof items[activeTestimonial].authorAvatar === 'object' ? (items[activeTestimonial].authorAvatar?.url || "/placeholder.png") : (items[activeTestimonial].authorAvatar || "/placeholder.png")}
                           alt={items[activeTestimonial].authorName}
                           fill className="object-cover"
                         />
                      </div>
                      <div>
                        <p className="font-bold text-white text-xs tracking-tight">{items[activeTestimonial].authorName}</p>
                        <p className="text-netcare-red text-[8px] font-black uppercase tracking-[0.3em]">{items[activeTestimonial].authorRole}</p>
                      </div>
                   </div>
                </div>
                <div className="w-px h-20 bg-white/10 hidden md:block" />
                <div className="text-center md:text-right shrink-0">
                  <p className="text-3xl font-black text-white/30 mb-1 font-mono tracking-tighter">99.9%</p>
                  <p className="text-[8px] uppercase font-bold tracking-[0.3em] text-netcare-warm-gray/40">Uptime Stability</p>
                </div>
              </div>

              {/* Slider Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {items.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveTestimonial(i)}
                    className={`w-1 h-1 rounded-full transition-all ${i === activeTestimonial ? 'bg-netcare-red w-4' : 'bg-white/10'}`} 
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3. Vision & Leadership */}
        <div className="space-y-12">
           {/* Vision Card - Centered & Bold */}
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1.2, ease: "easeOut" }}
             className="bg-netcare-red p-10 md:p-16 rounded-[3rem] text-white flex flex-col items-center text-center gap-8 relative overflow-hidden shadow-2xl group"
           >
              <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
                <Image src="/innovation_bg.png" alt="Innovation Background" fill className="object-cover scale-150 group-hover:scale-110 transition-transform duration-[40s]" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-netcare-red/20 to-netcare-red/40 opacity-60" />
              
              <div className="relative z-10 space-y-6 max-w-4xl">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-none italic uppercase">Our Vision.</h2>
                <div className="h-1 w-20 bg-white/30 mx-auto rounded-full" />
                <p className="text-white text-base md:text-xl lg:text-2xl leading-tight font-bold tracking-tight">
                  {visionText || "To be Nepal's ultimate engine of digital progress. From securing and connecting public transit with advanced Wi-Fi and CCTV, to transforming businesses through custom software, CRM, and web development—we turn innovative ideas into connected realities."}
                </p>
              </div>
              <div className="relative z-10">
                 <span className="text-[12px] md:text-[14px] font-black uppercase tracking-widest bg-black/30 backdrop-blur-xl px-10 py-4 rounded-2xl border border-white/30 inline-block font-mono shadow-2xl">
                   ESTABLISHED {establishedDate || "2014"}
                 </span>
              </div>
           </motion.div>

           {/* Founder Cards - Now highly noticeable */}
           <div className="space-y-12">
              <div className="flex items-center gap-6 px-2">
                 <div className="h-px flex-1 bg-white/10" />
                 <p className="text-[14px] md:text-[16px] uppercase font-black tracking-[0.6em] text-white/40 group-hover:text-netcare-red transition-colors duration-500">
                    Founders <span className="text-netcare-red">&</span> Leadership
                 </p>
                 <div className="h-px flex-1 bg-white/10" />
              </div>

              <div className="flex flex-nowrap overflow-x-auto md:justify-center pb-8 gap-8 scrollbar-hide snap-x px-4">
                 {leaders.map((founder, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 40 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.2, duration: 0.8, ease: "easeOut" }}
                     className="min-w-[320px] md:min-w-[380px] bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] overflow-hidden group hover:bg-white/10 transition-all duration-700 flex flex-col items-center p-12 text-center shadow-2xl space-y-8 snap-center"
                   >
                      <div className="relative w-40 h-40 rounded-3xl overflow-hidden border-2 border-netcare-red group-hover:scale-105 transition-all duration-500 shadow-2xl">
                        <Image 
                          src={typeof founder.image === 'object' ? (founder.image?.url || "/placeholder.png") : (founder.image || "/placeholder.png")} 
                          alt={founder.name} 
                          fill className="object-cover" 
                        />
                      </div>
                      <div className="space-y-5">
                         <div>
                           <h3 className="text-2xl font-black text-white tracking-tighter uppercase mb-3">{founder.name}</h3>
                           <div className="inline-block bg-netcare-red px-6 py-2 rounded-xl shadow-[0_0_20px_rgba(238,31,59,0.3)]">
                             <p className="text-white text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">
                               {founder.role}
                             </p>
                           </div>
                         </div>
                         <p className="text-netcare-warm-gray/60 text-sm leading-relaxed max-w-[260px] mx-auto font-medium">
                           {founder.bio || "Leading Netcare's strategy for decentralized infrastructure and national-scale connectivity."}
                         </p>
                      </div>
                   </motion.div>
                 ))}
              </div>
           </div>
        </div>

      </div>
    </section>
  )
}

export default SocialProof
