import React from 'react'

export interface OfficeItem {
  name: string
  city: string
  isHead?: boolean
}

export interface OfficesListProps {
  offices?: OfficeItem[]
}

const defaultOffices = [
  { name: 'Head Office', city: 'Tokha, Kathmandu', isHead: true },
  { name: 'Support Office', city: 'Birgunj Branch Office', isHead: false },
  { name: 'Branch Office', city: 'Pokhara Branch Office', isHead: false },
]

export default function OfficesList({
  offices = defaultOffices as any
}: OfficesListProps) {

  return (
    <section className="container mx-auto px-6 max-w-4xl pt-8">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-mist-white">
          Netcare Offices
        </h2>
      </div>

      <div className="space-y-0 divide-y divide-white/10 border-y border-white/10">
        {offices.map((office, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between py-8 gap-4 hover:bg-white/5 transition-colors sm:px-6 rounded-xl group cursor-default">
            <div className="flex items-center gap-4">
               {office.isHead && (
                 <span className="bg-netcare-red/20 text-netcare-red text-[10px] font-bold uppercase tracking-widest py-1.5 px-3 rounded-full">HQ</span>
               )}
               <h3 className="text-xl font-bold text-mist-white">{office.city}</h3>
            </div>
            
            <div className="flex flex-col sm:items-end space-y-2">
              <p className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide">{office.name}</p>
              <button className="text-sm font-bold text-mist-white group-hover:text-netcare-red flex items-center gap-2 transition-colors">
                 Get direction <span className="text-lg leading-none">&rarr;</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
