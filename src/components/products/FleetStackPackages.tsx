import React from 'react'

const packages = [
  {
    title: 'GPS Only',
    desc: 'Essential tracking for monitoring vehicle location and speed.',
    features: ['Real-time location map', 'Route history storage', 'Idle time alerts'],
    highlighted: false,
  },
  {
    title: 'Wi-Fi Only',
    desc: 'Transform passenger experience with high-speed internet.',
    features: ['Captive portal login', 'Bandwidth management', 'Remote device config'],
    highlighted: false,
  },
  {
    title: 'Wi-Fi + GPS',
    desc: 'Dual connectivity and tracking for streamlined logistics.',
    features: ['All GPS & Wi-Fi features', 'Integrated dashboards', 'Data usage analytics'],
    highlighted: false,
  },
  {
    title: 'Wi-Fi + CCTV',
    desc: 'Keep passengers connected and your assets fully secured.',
    features: ['Live camera feeds', 'Tamper alerts', 'Local video storage'],
    highlighted: false,
  },
  {
    title: 'The Ultimate Fleet',
    desc: 'Wi-Fi + GPS + CCTV. Total control and premium transport experience over your entire fleet operation combining hardware tracking and connectivity.',
    features: ['Unified management panel', 'Full vehicle telematics', 'Long-term cloud storage', 'Priority technical support'],
    badge: 'Most Popular',
    highlighted: true,
  },
]

export interface FleetPackageItem {
  title: string
  desc: string
  features: any[] // we will map correctly if it comes from CMS as an array of strings or objects {feature: string}
  badge?: string
  highlighted?: boolean
}

export interface FleetStackPackagesProps {
  overline?: string
  title?: string
  packages?: any[]
}

const fallbackPackages = [ ...packages ]

export default function FleetStackPackages({
  title = "Build Your Fleet Stack",
  overline = "Matrix",
  packages: propsPackages
}: FleetStackPackagesProps) {
  const displayPackages = propsPackages || fallbackPackages

  const formatFeatures = (p: any) => {
    if (!p.features) return []
    // Support both string array and object array {feature: string}
    return p.features.map((f: any) => typeof f === 'string' ? f : (f.feature || f.name || JSON.stringify(f)))
  }
  return (
    <section className="container mx-auto px-6 max-w-7xl space-y-16">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-6">
        {displayPackages.map((pkg, idx) => (
          <div 
            key={idx} 
            className={`relative rounded-3xl p-8 lg:p-10 flex flex-col items-start transition-transform duration-300 hover:-translate-y-2 shadow-2xl overflow-hidden ${
              pkg.highlighted 
                ? 'bg-gradient-to-br from-[#1b2a4e] to-[#121e33] border border-netcare-red ring-1 ring-netcare-red shadow-netcare-red/20 lg:col-span-2' 
                : 'bg-aero-surface border border-white/5'
            }`}
          >
            {pkg.badge && (
              <div className="absolute top-0 right-0 bg-netcare-red text-mist-white px-5 py-2 rounded-bl-3xl text-xs font-bold tracking-widest uppercase shadow-lg">
                {pkg.badge}
              </div>
            )}
            
            <div className="space-y-4 w-full flex-1">
              <h3 className={`text-2xl lg:text-3xl font-bold ${pkg.highlighted ? 'text-white' : 'text-mist-white'}`}>{pkg.title}</h3>
              <p className={`${pkg.highlighted ? 'text-white/80' : 'text-[#94a3b8]'} text-[15px] leading-relaxed max-w-md ${pkg.highlighted ? 'min-h-0' : 'min-h-[45px]'}`}>
                {pkg.desc}
              </p>
              
              <ul className="space-y-3 pt-6 pb-8 border-t border-white/10 w-full mt-4">
                {formatFeatures(pkg).map((feature: string, fIdx: number) => (
                  <li key={fIdx} className="flex items-start text-sm text-mist-white/80">
                    <span className={`mr-3 mt-0.5 ${pkg.highlighted ? 'text-netcare-red' : 'text-[#94a3b8]'}`}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <button className={`w-full font-bold py-4 px-6 rounded-full transition-colors whitespace-nowrap border-2 tracking-wide ${
                pkg.highlighted 
                  ? 'bg-netcare-red hover:bg-red-600 text-mist-white border-transparent' 
                  : 'bg-transparent border-white/20 hover:border-white/50 text-mist-white'
              }`}>
              Request Custom Quote
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
