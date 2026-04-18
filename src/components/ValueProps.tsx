import React from 'react'
import * as LucideIcons from 'lucide-react'
import { ShieldCheck, MapPin, Ticket } from 'lucide-react'

export interface ValuePropsCard {
  icon: string
  title: string
  description: string
}

export interface ValuePropsProps {
  headline?: string
  subheadline?: string
  cards?: ValuePropsCard[]
}

const fallbackCards: ValuePropsCard[] = [
  {
    icon: 'ShieldCheck',
    title: "CCTV र हाई-स्पीड Wi-Fi",
    description: "यात्रुहरूका लागि निरन्तर इन्टरनेट सुविधा र बसधनीहरूका लागि जुनसुकै ठाउँबाट बस भित्रको प्रत्यक्ष २४/७ निगरानी।",
  },
  {
    icon: 'MapPin',
    title: "GPS फ्लीट ट्र्याकिङ (आउँदैछ)",
    description: "गाडीको लाइभ लोकेसन, गति, इन्धनको अवस्था र रुटको सम्पूर्ण जानकारी मोबाइलमै हेर्न सकिने आधुनिक प्रणाली।",
  },
  {
    icon: 'Ticket',
    title: "स्मार्ट टिकट बुकिङ (आउँदैछ)",
    description: "ई-सेवा र अन्य डिजिटल पेमेन्टसँग जोडिएको अत्याधुनिक बहु-प्रणाली टिकटिङ सफ्टवेयर, जसले तपाईंको व्यापारलाई डिजिटल बनाउँछ।",
  },
  {
    icon: 'ShieldCheck',
    title: "Enterprise Technology",
    description: "Himalayan transport operations requires robust hardware that survives the extreme weather and terrain.",
  }
]

const DynamicIcon = ({ name, colorClass }: { name: string; colorClass: string }) => {
  const IconComponent = (LucideIcons as any)[name] || ShieldCheck
  return <IconComponent className={colorClass} size={22} />
}

const ValueProps: React.FC<ValuePropsProps> = ({ 
  headline = "एक मिनेटको ढिलाइ वा असावधानीले लाखौंको नोक्सान हुन सक्छ।",
  subheadline = "यात्रुलाई हाई-स्पीड इन्टरनेट र बसधनीलाई पूर्ण नियन्त्रण। नेटकेयर नेपाल तपाईको भरपर्दो साझेदार।",
  cards = fallbackCards
}) => {
  return (
    <section className="py-20 bg-netcare-navy text-netcare-warm-gray px-4 md:px-8 relative overflow-hidden">
      {/* Balanced background elements using the palette */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-netcare-ochre/5 blur-[100px] rounded-full -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-netcare-red/5 blur-[100px] rounded-full -ml-48 -mb-48" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 space-y-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tighter max-w-5xl mx-auto text-white">
            {headline.split(/(सुरक्षित र स्मार्ट यात्रा|नोक्सान|SEAMLESS CONNECTIVITY|STRONGER JOURNEYS)/gi).map((part, i) => (
              <span key={i} className={['सुरक्षित र स्मार्ट यात्रा', 'नोक्सान', 'SEAMLESS CONNECTIVITY'].includes(part.toUpperCase()) ? 'text-netcare-red' : ''}>
                {part}
              </span>
            ))}
          </h2>
          <p className="text-netcare-warm-gray/60 max-w-3xl mx-auto text-sm md:text-lg leading-relaxed font-medium">
            {subheadline.split(/(नेटकेयर नेपाल|NETCARE NEPAL)/gi).map((part, i) => (
              <span key={i} className={part.toUpperCase() === 'नेटकेयर नेपाल' || part.toUpperCase() === 'NETCARE NEPAL' ? 'text-netcare-red font-bold underline underline-offset-8 decoration-white/10' : ''}>
                {part}
              </span>
            ))}
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((prop, i) => (
            <div 
              key={i} 
              className="group p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-netcare-red/30 hover:bg-white/[0.07] transition-all duration-500 backdrop-blur-xl"
            >
              <div className="relative z-10 space-y-6">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:scale-105 group-hover:bg-white/10 transition-transform duration-500">
                  <DynamicIcon 
                    name={prop.icon} 
                    colorClass={i % 2 === 0 ? 'text-netcare-red' : 'text-netcare-ochre'} 
                  />
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white tracking-wide">{prop.title}</h3>
                  <p className="text-netcare-warm-gray/50 text-xs md:text-sm leading-relaxed font-medium">
                    {prop.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ValueProps
