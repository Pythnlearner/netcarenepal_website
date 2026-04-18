import React from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'

const VideoBanner = () => {
  return (
    <section className="relative py-32 bg-midnight-deep overflow-hidden">
      {/* Massive Background Text Branding */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
        <h2 className="text-[20vw] font-black uppercase tracking-tighter text-white">
          NETCARE
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="relative group cursor-pointer max-w-5xl mx-auto">
          {/* Main Cinematic Image with Play Button Overlay */}
          <div className="relative aspect-[16/9] rounded-[3rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)] border border-white/10">
            <Image 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000" 
              alt="Netcare Security Center"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-midnight-deep/40 transition-opacity group-hover:opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-netcare-red rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110">
                <Play className="text-white fill-white ml-1" size={32} />
              </div>
            </div>
            {/* Corner Decorative Text */}
            <div className="absolute bottom-8 left-8 flex items-center gap-4">
              <div className="w-1.5 h-12 bg-netcare-red rounded-full" />
              <div>
                <span className="block text-xs uppercase font-bold tracking-widest text-mist-white/60">Live Feed</span>
                <span className="text-lg font-bold text-mist-white">Command Center v2.0</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center max-w-2xl mx-auto space-y-4">
          <p className="text-base md:text-lg leading-relaxed font-medium italic text-steel-blue-gray">
            "Everything we do is designed to give you peace of mind while you grow your business."
          </p>
          <div className="w-12 h-1 bg-netcare-red mx-auto" />
        </div>
      </div>
    </section>
  )
}

export default VideoBanner
