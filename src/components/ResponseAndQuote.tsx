'use client'

import React from 'react'
import Image from 'next/image'
import { Send, PhoneCall, Mail, Truck, Camera, Wifi, Navigation } from 'lucide-react'
import { submitLead } from '@/app/actions/submitLead'

const ResponseAndQuote = () => {
  const [selectedService, setSelectedService] = React.useState('wifi_only')
  const [captcha, setCaptcha] = React.useState({ num1: 0, num2: 0, answer: '' })

  React.useEffect(() => {
    generateCaptcha()
  }, [])

  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 10) + 1
    const n2 = Math.floor(Math.random() * 10) + 1
    setCaptcha({ num1: n1, num2: n2, answer: '' })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const userAnswer = parseInt(formData.get('captcha') as string)

    if (userAnswer !== (captcha.num1 + captcha.num2)) {
      alert('Incorrect Captcha answer. Please try again.')
      generateCaptcha()
      return
    }

    const message = formData.get('message') as string
    const wordCount = message.trim().split(/\s+/).filter(Boolean).length
    if (wordCount > 50) {
      alert('Message must be maximum 50 words.')
      return
    }

    const result = await submitLead(formData)
    if (result.success) {
      alert('Thank you! Your inquiry has been submitted successfully.')
      e.currentTarget.reset()
      generateCaptcha()
    } else {
      alert(result.error || 'Something went wrong.')
    }
  }

  return (
    <section className="py-20 bg-netcare-navy text-netcare-warm-gray px-4 md:px-8">
      {/* ... (keep previous header content) ... */}
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Threat Response Side-by-Side (existing) */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 animate-in slide-in-from-left duration-1000">
             <div className="space-y-3">
               <h2 className="text-2xl md:text-3xl font-bold leading-snug text-white">Respond To Threats In Real Time</h2>
               <p className="text-sm md:text-base leading-relaxed text-netcare-lilac/60 max-w-lg">
                 Instant alerts and high-definition live feeds directly to your device ensure that you are never out of the loop.
               </p>
             </div>
             <ul className="space-y-3">
                {["Cloud Instance Syncing", "Multi-tenant Management", "Automated AI Triage"].map((text, i) => (
                  <li key={i} className="flex items-center gap-3 font-bold text-xs tracking-wide">
                    <div className="w-5 h-5 rounded-full bg-netcare-red/10 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-netcare-red" />
                    </div>
                    {text}
                  </li>
                ))}
             </ul>
             <button className="bg-white hover:bg-netcare-red text-netcare-navy hover:text-white px-8 py-3.5 rounded-full font-bold text-[10px] tracking-widest uppercase transition-all shadow-xl">Explore Dashboards</button>
          </div>

          <div className="flex gap-4 h-[350px] lg:h-[450px]">
             <div className="flex-1 relative rounded-3xl overflow-hidden shadow-2xl translate-y-6 border border-white/10">
               <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" alt="Tech Dashboard" fill className="object-cover" />
             </div>
             <div className="flex-1 relative rounded-3xl overflow-hidden shadow-2xl -translate-y-6 border border-white/10">
               <Image src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" alt="Mobile App" fill className="object-cover" />
             </div>
          </div>
        </div>

        {/* Request A Quote Form Section */}
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 bg-white/5 p-8 md:p-12 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-netcare-red/5 rounded-full blur-[100px]" />
          
          <div className="space-y-8 relative z-10">
            <div className="space-y-4">
               <h2 className="text-2xl md:text-3xl font-bold leading-snug text-white">Full Service Inquiry</h2>
               <p className="text-sm md:text-base leading-relaxed text-netcare-lilac/60 max-w-md">Provide your fleet details below and our team will prepare a customized security proposal for you.</p>
            </div>

            <div className="space-y-6">
               <div className="flex items-center gap-5 group">
                 <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-netcare-red group-hover:border-netcare-red/50 text-white transition-all shadow-sm">
                   <PhoneCall size={20} />
                 </div>
                 <div>
                   <span className="block text-[9px] uppercase font-bold tracking-widest text-netcare-lilac/40">Call Us Directly</span>
                   <span className="text-base font-bold text-white">+977 9802900818</span>
                 </div>
               </div>
               <div className="flex items-center gap-5 group">
                 <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-netcare-ochre group-hover:border-netcare-ochre/50 text-white transition-all shadow-sm">
                   <Mail size={20} />
                 </div>
                 <div>
                   <span className="block text-[9px] uppercase font-bold tracking-widest text-netcare-lilac/40">Email Our Team</span>
                   <span className="text-base font-bold text-white">netcarenepal@gmail.com</span>
                 </div>
               </div>
            </div>

            {/* Enlarged Contextual Image Circle */}
            <div className="pt-10 hidden lg:block">
              <div className="w-72 h-72 rounded-full border-4 border-white/5 overflow-hidden shadow-[0_0_50px_rgba(211,47,47,0.1)] relative group-hover:scale-105 transition-transform duration-700">
                <Image 
                  src="/fleet_management_visual.png" 
                  alt="Fleet Connectivity Visual" 
                  fill 
                  className="object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-netcare-navy/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-netcare-navy/80 px-6 py-8 md:p-10 rounded-3xl shadow-xl space-y-6 border border-white/10 backdrop-blur-xl">
            <input type="hidden" name="formType" value="Detailed Fleet Inquiry" />
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Customer Information */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-netcare-lilac/40 uppercase tracking-widest ml-1">Full Name (Max 50 chars)</label>
                <input name="name" type="text" placeholder="e.g. Manish Sharma" required maxLength={50} className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/10 focus:border-netcare-red focus:bg-white/10 outline-none transition-all text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-netcare-lilac/40 uppercase tracking-widest ml-1">Contact Email</label>
                <input name="email" type="email" placeholder="test@gmail.com" required className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/10 focus:border-netcare-red focus:bg-white/10 outline-none transition-all text-sm" />
              </div>

              {/* Vehicle Information */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-netcare-lilac/40 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Truck size={12} className="text-netcare-red" /> Vehicle Type
                </label>
                <select name="vehicleType" required className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-netcare-red focus:bg-white/10 outline-none transition-all text-sm appearance-none cursor-pointer">
                  <option value="BUS" className="bg-netcare-navy text-white">BUS</option>
                  <option value="VAN" className="bg-netcare-navy text-white">VAN</option>
                  <option value="CAR" className="bg-netcare-navy text-white">CAR</option>
                  <option value="HIACE" className="bg-netcare-navy text-white">HIACE</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-netcare-lilac/40 uppercase tracking-widest ml-1">Vehicle Number</label>
                <input name="vehicleNumber" type="text" placeholder="e.g. BA 1 PA 1234" required className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/10 focus:border-netcare-red focus:bg-white/10 outline-none transition-all text-sm" />
              </div>

              {/* Service Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-netcare-lilac/40 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Wifi size={12} className="text-netcare-red" /> Required Service
                </label>
                <select 
                  name="requiredService" 
                  required 
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-netcare-red focus:bg-white/10 outline-none transition-all text-sm appearance-none cursor-pointer"
                >
                  <option value="wifi_only" className="bg-netcare-navy text-white">WIFI ONLY</option>
                  <option value="wifi_camera" className="bg-netcare-navy text-white">WIFI + CAMERA</option>
                  <option value="wifi_camera_gps" className="bg-netcare-navy text-white">WIFI + CAMERA + GPS</option>
                </select>
              </div>

              {/* Conditional Camera Count */}
              {['wifi_camera', 'wifi_camera_gps'].includes(selectedService) && (
                <div className="space-y-2 animate-in zoom-in-95 duration-300">
                  <label className="text-xs font-bold text-netcare-lilac/40 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Camera size={12} className="text-netcare-red" /> Number of Cameras
                  </label>
                  <select name="numberOfCameras" className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-netcare-red focus:bg-white/10 outline-none transition-all text-sm appearance-none cursor-pointer">
                    <option value="1" className="bg-netcare-navy text-white">1 Camera</option>
                    <option value="2" className="bg-netcare-navy text-white">2 Cameras</option>
                    <option value="4" className="bg-netcare-navy text-white">4 Cameras</option>
                    <option value="8" className="bg-netcare-navy text-white">8 Cameras</option>
                  </select>
                </div>
              )}
              
              <div className={`space-y-2 ${['wifi_camera', 'wifi_camera_gps'].includes(selectedService) ? '' : 'md:col-span-1'}`}>
                <label className="text-xs font-bold text-netcare-lilac/40 uppercase tracking-widest ml-1">Mobile Contact (10 Digits)</label>
                <input name="phone" type="tel" pattern="[0-9]{10}" title="Please enter exactly 10 digits" placeholder="98XXXXXXXX" required className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/10 focus:border-netcare-red focus:bg-white/10 outline-none transition-all text-sm" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-netcare-lilac/40 uppercase tracking-widest ml-1">Additional Requirements (Max 50 Words)</label>
              <textarea name="message" placeholder="Tell us more about your installation site or specific needs..." rows={2} className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/10 focus:border-netcare-red focus:bg-white/10 outline-none transition-all resize-none text-sm"></textarea>
            </div>

            {/* Verification Captcha */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
              <label className="text-[10px] font-bold text-netcare-red uppercase tracking-[0.2em] block">Human Verification</label>
              <div className="flex items-center gap-4">
                <span className="text-white font-mono bg-white/10 px-3 py-1 rounded-lg border border-white/10 select-none">
                  {captcha.num1} + {captcha.num2} = ?
                </span>
                <input 
                  name="captcha" 
                  type="number" 
                  required 
                  placeholder="Answer"
                  className="w-24 px-4 py-1.5 rounded-lg bg-white/10 border border-white/10 text-white outline-none focus:border-netcare-red transition-all text-sm text-center" 
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-netcare-red text-white hover:bg-red-800 py-4 rounded-xl font-bold flex items-center justify-center gap-3 tracking-widest uppercase transition-all shadow-xl hover:shadow-netcare-red/20 group text-[10px]">
              Send Inquiry <Send className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={14} />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ResponseAndQuote
