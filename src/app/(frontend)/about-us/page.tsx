import React from 'react'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { motion } from 'framer-motion'
import Counter from '@/components/about/Counter'
import AboutMarquee from '@/components/about/AboutMarquee'
import dynamic from 'next/dynamic'
import Leadership from '@/components/about/Leadership'

// Lazy load heavy components
const SlicedImageSlider = dynamic(() => import('@/components/about/SlicedImageSlider'), {
  ssr: true,
  loading: () => <div className="w-full aspect-video bg-white/5 animate-pulse rounded-[2.5rem]" />
})

export const metadata = {
  title: 'About Us | Netcare Nepal',
  description: 'Driving Nepal’s Digital Transit Future with a decade of high-fidelity innovations in connectivity and security.',
}

export default async function AboutUsPage() {
  const payload = await getPayload({ config })
  
  const aboutData = await payload.findGlobal({
    slug: 'about-us-global',
  })

  return (
    <main className="bg-midnight-deep min-h-screen text-white overflow-hidden pb-12">
      {/* Section 1: The Welcome Hero */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-netcare-red/5 blur-[120px] rounded-full -mr-64 -mt-32 pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-netcare-red font-black text-[10px] uppercase tracking-[0.2em]">
                 Established 2014 • Lead System
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter">
                {aboutData.welcomeTitle}
              </h1>
              <p className="text-lg md:text-xl text-white/60 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
                {aboutData.welcomeMessage}
              </p>
            </div>

            {/* Right Media */}
            <div className="w-full lg:w-1/2 relative group">
              <div className="absolute inset-0 bg-netcare-red rounded-[3rem] rotate-3 opacity-20 blur-2xl group-hover:rotate-6 transition-transform duration-700" />
              <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-aero-surface">
                <Image 
                  src={(aboutData.heroImage as any)?.url || '/placeholder.png'} 
                  alt="Netcare Nepal Innovation" 
                  fill
                  className="object-cover transition-transform duration-[4s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-deep/80 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Animated Statistics */}
      <section className="py-16 bg-white/[0.02] border-y border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
            <Counter 
              value={aboutData.stats.wifiInstalled as number} 
              label="Wi-Fi Systems Deployed" 
            />
            <Counter 
              value={aboutData.stats.cctvInstalled as number} 
              label="CCTV Cameras Active" 
            />
            <Counter 
              value={aboutData.stats.gpsInstalled as number} 
              label="GPS Integrated Fleets" 
            />
            <Counter 
              value={aboutData.stats.softwareProjects as number} 
              label="Software & App Projects" 
            />
          </div>
        </div>
      </section>

      {/* Section 3: Infinite Horizontal Scrolling Services */}
      <section className="pt-16 lg:pt-20 pb-4">
        <div className="container mx-auto px-6 max-w-7xl mb-12 text-center">
           <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">Our Core Foundations</h2>
           <p className="text-white/40 text-sm font-medium uppercase tracking-[0.4em]">Propelling Progress Every Mile</p>
        </div>
        
        <AboutMarquee />
      </section>

      {/* Section 4: Success Gallery Slider */}
      {aboutData.gallery && aboutData.gallery.length > 0 && (
        <section className="pt-8 pb-16 md:pb-24">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">Voices of Success</h2>
              <p className="text-white/40 text-sm font-medium uppercase tracking-[0.4em]">Our Trusted Partners & Clients</p>
            </div>
            
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5">
              <SlicedImageSlider items={aboutData.gallery.map((item: any) => ({
                name: item.name,
                company: item.company,
                image: item.image?.url || item.image
              }))} />
            </div>
          </div>
        </section>
      )}

      {/* Section 5: Founders & Leadership */}
      <Leadership members={aboutData.leaders?.map((leader: any) => ({
        name: leader.name,
        role: leader.role,
        bio: leader.bio,
        image: leader.image?.url || leader.image
      }))} />
    </main>
  )
}
