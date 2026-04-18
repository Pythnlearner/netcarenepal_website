import React from 'react'
import Image from 'next/image'
import { Package } from 'lucide-react'

const products = [
  {
    name: "Bullet Pro I",
    category: "Outdoor Security",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=400",
    price: "NRs. 45000"
  },
  {
    name: "Dome Smart 360",
    category: "Indoor Monitoring",
    image: "https://images.unsplash.com/photo-1557344234-a169bba3586d?auto=format&fit=crop&q=80&w=400",
    price: "NRs. 28000"
  },
  {
    name: "PTZ Enterprise",
    category: "Active Tracking",
    image: "https://images.unsplash.com/photo-1557597774-1bb627670993?auto=format&fit=crop&q=80&w=400",
    price: "NRs. 62000"
  },
  {
    name: "Netcare Gateway",
    category: "Connectivity Hub",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=400",
    price: "NRs. 15000"
  }
]

const ProductShowcase = () => {
  return (
    <section className="py-20 bg-netcare-navy text-netcare-warm-gray px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold leading-snug text-white">Advanced Hardware <br /> For A Safer Nepal</h2>
            <p className="text-sm md:text-base leading-relaxed text-netcare-warm-gray/60 max-w-lg">
              Interconnected hardware designed to work as a unified security and data ecosystem across our network.
            </p>
          </div>
          <button className="text-[10px] font-bold uppercase tracking-widest border-b border-netcare-red pb-1 text-netcare-red hover:text-white hover:border-white transition-all">
            View All Hardware
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, i) => (
            <div key={i} className="group cursor-pointer space-y-4">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-white/5 border border-white/5 shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:border-white/10">
                <Image 
                  src={product.image} 
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 bg-netcare-red text-white px-3 py-1.5 rounded-full text-[10px] font-black shadow-lg">
                  {product.price}
                </div>
              </div>
              <div className="px-1">
                <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-netcare-lilac mb-1 block">{product.category}</span>
                <h3 className="text-base md:text-lg font-bold text-white group-hover:text-netcare-ochre transition-colors">{product.name}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-6 md:p-10 rounded-[2.5rem] bg-gradient-to-r from-red-900/40 via-netcare-navy to-netcare-navy text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-white/5 shadow-2xl relative overflow-hidden">
           {/* Palette Accent */}
          <div className="absolute top-0 right-0 w-32 h-full bg-netcare-ochre/5 blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-6 text-center md:text-left relative z-10">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
               <Package className="text-netcare-red" size={24} />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold">Volume Licensing & Bundles</h3>
              <p className="text-xs md:text-sm text-netcare-warm-gray/50">Enterprise deals available for operators with more than 5 vehicles.</p>
            </div>
          </div>
          <button className="whitespace-nowrap bg-netcare-red text-white hover:bg-red-800 px-8 py-3.5 rounded-full font-bold text-[10px] uppercase tracking-widest transition-all shadow-xl hover:shadow-netcare-red/20 relative z-10">
            Discuss Enterprise Pricing
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductShowcase
