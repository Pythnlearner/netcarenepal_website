import React from 'react'
import Image from 'next/image'

export interface ValueItem {
  title: string
  desc: string
}

export interface OurValuesSplitProps {
  values?: ValueItem[]
  image?: string | { url?: string }
}

const fallbackValues = [
  { 
    title: 'Technological Leadership', 
    desc: 'For over 10 years, we have set the benchmark in Nepal’s transit technology sector. By integrating high-speed 5G-ready mobile infrastructure and vibration-proof security hardware, we lead the way in enterprise fleet digital transformation.' 
  },
  { 
    title: 'User-Centric Innovation', 
    desc: 'Our innovation is driven by the specific challenges of Himalayan transport. Every router, camera, and GPS unit we deploy is stress-tested to ensure safe travel and continuous connectivity for both operators and passengers.' 
  },
  { 
    title: 'Trusted Partner', 
    desc: 'Beyond hardware, we are a strategic ally. We provide 24/7 command center monitoring and rapid field response, earning the trust of the nation’s largest private and public transport networks.' 
  },
]

export default function OurValuesSplit({
  values = fallbackValues,
  image
}: OurValuesSplitProps) {
  const imageUrl = typeof image === 'object' ? image?.url : image;
  const finalImage = imageUrl || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000';

  return (
    <section className="container mx-auto px-6 max-w-7xl">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div className="space-y-10">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-mist-white">Our Values</h2>
            <p className="text-lg text-mist-white/70">A warm welcome to the official page of Netcare Nepal! 🙏</p>
          </div>
          
          <div className="space-y-8">
            {values.map((v, i) => (
              <div key={i} className="flex gap-5 group">
                <div className="mt-1.5 flex-shrink-0">
                   <div className="w-5 h-5 rounded-full border-2 border-netcare-red flex items-center justify-center relative shadow-[0_0_10px_rgba(217,59,59,0.5)]">
                      <div className="w-2 h-2 rounded-full bg-netcare-red group-hover:scale-[1.7] transition-transform duration-300"></div>
                   </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-mist-white">{v.title}</h4>
                  <p className="text-sm text-[#94a3b8] leading-relaxed max-w-md">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6">
            <button className="bg-netcare-red hover:bg-red-600 text-mist-white font-semibold py-4 px-10 rounded-full transition-colors flex items-center gap-2 shadow-lg hover:shadow-netcare-red/25">
              How Do I Start? <span className="text-xl leading-none">&rarr;</span>
            </button>
          </div>
        </div>

        <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square rounded-[3rem] overflow-hidden shadow-2xl ring-1 ring-white/10">
          <Image
             src={finalImage}
             alt="Our Values and Team"
             fill
             className="object-cover"
          />
          <div className="absolute inset-0 bg-midnight-deep/10 mix-blend-multiply pointer-events-none"></div>
        </div>
      </div>
    </section>
  )
}
