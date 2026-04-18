'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Plus, Minus } from 'lucide-react'

interface FAQProps {
  headline?: string
  subheadline?: string
  questions?: Array<{
    question: string
    answer: string
    image?: any
  }>
}

const fallbackQuestions = [
  {
    question: "How long does a typical installation take?",
    answer: "Installation time varies by fleet size, but usually, we can equip a single bus or small office within 4-6 hours.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200"
  },
  {
    question: "Do you provide off-site monitoring services?",
    answer: "Yes, we offer 24/7 managed monitoring packages where our dedicated team watches your feeds for suspicious activity.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"
  },
  {
    question: "Is the hardware weather-resistant?",
    answer: "Absolutely. All our outdoor hardware is IP67 rated, designed to withstand Nepal's monsoon rains and dust.",
    image: "https://images.unsplash.com/photo-1549416805-4cd903cb6828?auto=format&fit=crop&q=80&w=1200"
  },
  {
    question: "Can I access my feeds from abroad?",
    answer: "Yes, our cloud infrastructure allows you to securely view your cameras from anywhere in the world via our app.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200"
  }
]

const FAQ: React.FC<FAQProps> = ({ 
  headline = "Frequently Asked Questions", 
  subheadline = "Providing clarity and technical transparency about our core services.", 
  questions: propQuestions 
}) => {
  const [openIndex, setOpenIndex] = useState(0)
  const questions = propQuestions && propQuestions.length > 0 ? propQuestions : fallbackQuestions

  // Safely get active image
  const getActiveImage = () => {
    const activeItem = questions[openIndex === -1 ? 0 : openIndex]
    if (!activeItem) return fallbackQuestions[0].image
    
    if (typeof activeItem.image === 'string') return activeItem.image
    if (activeItem.image?.url) return activeItem.image.url
    
    // Fallback based on index to original static images if CMS image is missing
    return fallbackQuestions[openIndex === -1 ? 0 : (openIndex % fallbackQuestions.length)].image
  }

  const activeImage = getActiveImage()

  return (
    <section className="py-12 bg-gradient-to-br from-netcare-navy via-[#061C3E] to-netcare-navy text-netcare-warm-gray px-6 md:px-12 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-netcare-lilac/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-10 items-stretch relative z-10">
        
        {/* Support Card - Set to h-full to match content height */}
        <div className="relative group rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 h-full min-h-[350px]">
          <Image 
            src={activeImage} 
            alt="Customer Support"
            fill
            className="object-cover transition-all duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-netcare-navy/95 via-netcare-navy/20 to-transparent" />
          
          <div className="absolute bottom-5 left-5 right-5 p-5 rounded-xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl space-y-2 transform transition-transform duration-500 group-hover:-translate-y-1">
             <h3 className="text-base md:text-lg font-bold leading-normal text-white">System Insight</h3>
             <p className="text-netcare-warm-gray/70 text-[10px] leading-relaxed max-w-[180px]">Leveraging state-of-the-art surveillance and network protocols.</p>
             <button className="pt-1 text-netcare-red font-bold text-[9px] uppercase tracking-[0.2em] flex items-center gap-1.5 hover:gap-2.5 transition-all">
                Tech Support <span>&rarr;</span>
             </button>
          </div>
        </div>

        <div className="space-y-6 flex flex-col justify-center">
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight leading-tight text-white">
               {headline.split(/(Questions|सजिलै)/gi).map((part, i) => (
                 <span key={i} className={part.toLowerCase() === 'questions' || part === 'सजिलै' ? 'text-netcare-red' : ''}>
                   {part}
                 </span>
               ))}
            </h2>
            <p className="text-xs md:text-sm leading-relaxed text-netcare-warm-gray/60 max-w-lg font-medium">
               {subheadline}
            </p>
          </div>

          <div className="space-y-2">
             {questions.map((item, i) => (
               <div 
                 key={i} 
                 className={`group rounded-xl border transition-all duration-700 overflow-hidden ${
                   openIndex === i 
                   ? 'bg-white/10 border-white/20 shadow-[0_12px_30px_rgba(0,0,0,0.5)]' 
                   : 'bg-white/5 border-white/5 hover:border-white/15 hover:bg-white/[0.08]'
                 }`}
               >
                 <button 
                   onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                   className="w-full flex items-center justify-between p-4 text-left"
                 >
                   <span className={`text-sm md:text-base font-bold tracking-tight transition-colors duration-500 ${openIndex === i ? 'text-white' : 'text-netcare-warm-gray/90'}`}>
                     {item.question}
                   </span>
                   <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-700 ${
                     openIndex === i 
                     ? 'bg-netcare-red text-white rotate-180 shadow-lg shadow-netcare-red/40' 
                     : 'bg-white/10 text-netcare-warm-gray group-hover:bg-white/20'
                   }`}>
                     {openIndex === i ? <Minus size={12} /> : <Plus size={12} />}
                   </div>
                 </button>
                 <div className={`transition-all duration-700 cubic-bezier(0.23, 1, 0.32, 1) overflow-hidden ${openIndex === i ? 'max-h-52 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="px-4 pb-5 text-[10px] md:text-xs leading-relaxed text-netcare-warm-gray/60 font-semibold border-t border-white/5 pt-3 mx-4">
                      {item.answer}
                    </p>
                 </div>
               </div>
             ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default FAQ
