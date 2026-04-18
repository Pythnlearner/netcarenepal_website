import React from 'react'
import Image from 'next/image'

interface ProductFeature {
  feature: string
  id?: string
}

interface Product {
  name: string
  tagline?: string
  description: any // lexical rich text
  features?: ProductFeature[]
  image: {
    url: string
    alt?: string
  }
}

const fallbackProducts = [
  {
    name: 'Smart Bus Wi-Fi',
    tagline: 'Enterprise-grade 4G/5G mobile routers',
    description: 'Provide 5Mbps or 10Mbps dedicated bandwidth for uninterrupted passenger connectivity. Designed for rigorous transit environments with seamless bandwidth management and minimal latency.',
    image: { url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800' },
    features: [{ feature: 'Captive portal login' }, { feature: 'Bandwidth management' }]
  },
  {
    name: 'Mobile CCTV Systems',
    tagline: 'Vibration-proof, high-definition transit dome cameras',
    description: '24/7 remote monitoring and local encrypted storage designed specifically for public transport safety and driver accountability under all conditions.',
    image: { url: 'https://images.unsplash.com/photo-1557062611-ba62420cedfb?auto=format&fit=crop&q=80&w=800' },
    features: [{ feature: 'Night vision' }, { feature: 'Tamper alerts' }]
  },
  {
    name: 'GPS Fleet Tracking',
    tagline: 'Real-time location and fuel monitoring',
    description: 'Gain actionable insights to optimize fuel consumption, assign driver tasks dynamically, and ensure on-time performance with comprehensive route playback.',
    image: { url: 'https://images.unsplash.com/photo-1517596009848-0d19d67b8417?auto=format&fit=crop&q=80&w=800' },
    features: [{ feature: 'Real-time positioning' }, { feature: 'Route history' }]
  },
  {
    name: 'Netcare Ticketing SaaS',
    tagline: 'Upcoming multi-tenant booking platform',
    description: 'Built for bus operators with comprehensive dynamic seat management, automated vendor onboarding, and seamless integration with multiple payment gateways like eSewa.',
    image: { url: 'https://images.unsplash.com/photo-1556740714-a8395b3bf30f?auto=format&fit=crop&q=80&w=800' },
    tag: 'Coming Soon',
    features: [{ feature: 'Dynamic seat mapping' }, { feature: 'eSewa integration' }]
  },
  {
    name: 'Pocket Wi-Fi Rental',
    tagline: 'Internet Anywhere. Anytime.',
    description: 'High-speed 4G connectivity for travelers and remote professionals. Perfect for cities, trails, and group travel with support for multiple devices. Stay connected across Nepal without signal drops.',
    image: { url: '/media/connection.jpeg' },
    features: [
      { feature: '4G High-Speed Internet' },
      { feature: 'Works in Cities & Trails' },
      { feature: 'Connect Multiple Devices' }
    ]
  },
]

export interface TechShowcaseProps {
  overline?: string
  title?: string
  products?: any[]
}

export default function TechShowcase({ 
  title = "Hardware & Software Infrastructure", 
  overline = "Standalone Technologies",
  products 
}: TechShowcaseProps) {
  const displayProducts = products || fallbackProducts

  return (
    <section className="container mx-auto px-6 max-w-7xl space-y-24">
      <div className="text-center space-y-4">
        <p className="text-sm font-bold tracking-[0.2em] text-[#94a3b8] uppercase flex items-center justify-center gap-3">
            <span className="w-6 h-[2px] bg-netcare-red inline-block"></span>
            {overline}
            <span className="w-6 h-[2px] bg-netcare-red inline-block"></span>
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-mist-white leading-[1.1]">
          {title}
        </h2>
      </div>

      <div className="space-y-24 lg:space-y-32">
        {displayProducts.map((product, idx) => {
          const isEven = idx % 2 === 0
          
          // Handle both CMS data structure and fallback
          const title = product.name || product.title
          const tagline = product.tagline || ''
          const image = product.image?.url || product.image
          
          let description = ''
          if (typeof product.description === 'string') {
            description = product.description
          } else if (product.description?.root?.children) {
            // Very basic Lexical text extraction
            description = product.description.root.children
              .map((node: any) => node.children?.map((c: any) => c.text).join(' '))
              .join(' ')
          }

          if (!description || description.length < 5) {
            description = 'Advanced infrastructure solutions designed for the unique challenges of the Himalayan transport sector.'
          }

          return (
            <div key={idx} className={`flex flex-col gap-10 lg:gap-16 items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
              <div className="w-full lg:w-1/2 relative group">
                <div className="relative aspect-[4/3] sm:aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl p-2 bg-aero-surface border border-white/5 transition-transform duration-500 hover:scale-[1.02]">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden">
                    <Image src={image} alt={title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-midnight-deep/20 mix-blend-multiply pointer-events-none"></div>
                  </div>
                  {(product.tag || product.isComingSoon) && (
                    <div className="absolute top-6 left-6 z-10 bg-netcare-red text-mist-white px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg border border-red-500/50">
                      {product.tag || 'Coming Soon'}
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="space-y-2">
                  <span className="text-netcare-red text-xs font-bold uppercase tracking-widest mb-2 block">{tagline}</span>
                  <h3 className="text-3xl lg:text-4xl font-bold text-mist-white leading-tight">{title}</h3>
                </div>
                
                <p className="text-lg text-[#94a3b8] leading-relaxed max-w-lg">
                  {description}
                </p>

                {product.features && (
                   <ul className="grid grid-cols-2 gap-4 pt-2">
                     {product.features.map((f: any, fIdx: number) => (
                       <li key={fIdx} className="flex items-center gap-2 text-sm text-mist-white/70">
                         <span className="w-1.5 h-1.5 rounded-full bg-netcare-red"></span>
                         {f.feature}
                       </li>
                     ))}
                   </ul>
                )}

                <div className="pt-4">
                  <button className="text-netcare-red hover:text-red-400 font-bold tracking-widest uppercase transition-colors flex items-center gap-2 group">
                    Learn More 
                    <span className="group-hover:translate-x-2 transition-transform text-xl leading-none">&rarr;</span>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
