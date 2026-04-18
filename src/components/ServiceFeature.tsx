import React from 'react'
import Image from 'next/image'
import { CheckCircle2, Award } from 'lucide-react'

const fallbackBenefits = [
  "Seamless 4G/5G Connectivity Across Remote Routes",
  "Centralized Dashboard for Live Fleet Monitoring",
  "Locally Hosted Servers for High-Speed Ticketing",
  "24/7 Remote Technical Support & Field Service",
]

interface ServiceFeatureProps {
  headline?: string
  subheadline?: string
  benefits?: string[]
  buttonText?: string
  image?: any // Support Media object or string
}

const renderBoldText = (text: string) => {
  if (!text) return text
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-white font-black">{part.slice(2, -2)}</strong>
    }
    return part
  })
}

const ServiceFeature: React.FC<ServiceFeatureProps> = ({
  headline = "Empowering Transport Operators With Smart Technology.",
  subheadline = "Netcare Nepal goes beyond basic hardware. We build a unified ecosystem for transport operators, integrating high-speed Wi-Fi, live CCTV surveillance, and automated ticketing.",
  benefits = fallbackBenefits,
  buttonText = "Explore Fleet Solutions",
  image
}) => {
  const imageUrl = typeof image === 'string' 
    ? image 
    : image?.url || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200"

  return (
    <section className="py-16 bg-netcare-navy text-netcare-warm-gray px-4 md:px-8 overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-netcare-red/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto bg-gradient-to-br from-blue-600/10 via-[#0D121F] to-black rounded-[2.5rem] border border-white/5 backdrop-blur-3xl relative shadow-2xl overflow-hidden">
        <div className="grid lg:grid-cols-2 items-stretch min-h-[500px]">
          
          {/* Image Column - Balanced Perspective */}
          <div className="relative group min-h-[400px] lg:min-h-full">
            <Image 
              src={imageUrl} 
              alt={headline}
              fill
              className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-netcare-navy/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-netcare-navy/10" />
            
            {/* Experience Badge - Scaled Down */}
            <div className="absolute bottom-6 left-6 bg-[#0D0F14]/80 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-xl flex items-center gap-4 z-10">
              <div className="w-12 h-12 bg-netcare-red/20 rounded-xl flex items-center justify-center border border-netcare-red/30">
                <Award className="text-netcare-red" size={24} />
              </div>
              <div>
                <span className="block text-2xl font-black text-white leading-none">12+</span>
                <span className="text-[9px] uppercase font-bold tracking-widest text-white/40">Years Experience</span>
              </div>
            </div>
          </div>

          {/* Text Column - More Professional Scale */}
          <div className="p-8 md:p-10 lg:p-14 flex flex-col justify-center space-y-6 relative">
            <div className="space-y-4">
              <div className="space-y-2">
                <span className="text-netcare-red font-black tracking-[0.3em] text-[9px] uppercase">Smart Fleet Solutions</span>
                <h2 className="text-2xl md:text-3xl font-bold leading-snug tracking-tight text-white m-0 p-0">
                  {headline}
                </h2>
              </div>
              <p className="text-white/50 text-sm md:text-base leading-relaxed font-medium max-w-md">
                {renderBoldText(subheadline)}
              </p>
            </div>

            <ul className="grid sm:grid-cols-1 gap-4">
              {benefits.map((benefit, i) => {
                const [title, ...descParts] = benefit.split(':')
                const description = descParts.join(':').trim()

                return (
                  <li key={i} className="flex items-start gap-5 group">
                    <div className="bg-netcare-red/10 p-2 rounded-xl group-hover:bg-netcare-red transition-all duration-500 mt-0.5 shadow-lg shadow-netcare-red/5">
                      <CheckCircle2 className="text-netcare-red group-hover:text-white" size={16} />
                    </div>
                    <div className="space-y-1">
                      {description ? (
                        <>
                          <span className="block font-semibold text-white text-lg md:text-xl leading-normal tracking-wide group-hover:text-netcare-red transition-colors duration-300">
                            {title}
                          </span>
                          <span className="block text-xs leading-normal text-white/40 font-medium">
                            {description}
                          </span>
                        </>
                      ) : (
                        <span className="font-bold text-white text-base tracking-wide">
                          {benefit}
                        </span>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="pt-4">
              <button className="bg-netcare-red text-white hover:bg-red-800 px-10 py-5 rounded-full font-bold text-sm tracking-widest uppercase transition-colors shadow-2xl active:scale-95">
                {buttonText}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ServiceFeature
