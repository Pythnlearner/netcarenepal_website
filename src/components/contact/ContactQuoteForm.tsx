'use client'

import React from 'react'
import { submitLead } from '@/app/actions/submitLead'
import { Send, Truck, Camera, Wifi, PhoneCall, Mail } from 'lucide-react'

export interface ContactQuoteFormProps {
  title?: string
}

export default function ContactQuoteForm({
  title = "Request A Quote"
}: ContactQuoteFormProps) {
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
    
    // Captcha Check
    const userAnswer = parseInt(formData.get('captcha') as string)
    if (userAnswer !== (captcha.num1 + captcha.num2)) {
      alert('Incorrect Captcha answer. Please try again.')
      generateCaptcha()
      return
    }

    // Word Count Check
    const message = formData.get('message') as string
    const wordCount = message.trim().split(/\s+/).filter(Boolean).length
    if (wordCount > 50) {
      alert('Message must be maximum 50 words.')
      return
    }

    const result = await submitLead(formData)
    if (result.success) {
      alert('Thank you! Your request has been submitted successfully.')
      e.currentTarget.reset()
      generateCaptcha()
    } else {
      alert(result.error || 'Something went wrong.')
    }
  }

  return (
    <section className="container mx-auto px-6 max-w-5xl py-12">
      <div className="bg-netcare-navy/80 rounded-[3rem] p-8 md:p-16 shadow-2xl border border-white/10 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-netcare-red/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="mb-12 relative z-10 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Enterprise Fleet Inquiry</h2>
          <p className="text-netcare-lilac/60 text-lg max-w-2xl mx-auto">Complete the technical specifications below for an expedited service quote.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10 max-w-4xl mx-auto">
          <input type="hidden" name="formType" value="Contact Page Inquiry" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Customer Information */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-netcare-lilac/40 uppercase tracking-widest ml-1">Full Name (Max 50 chars)</label>
              <input 
                name="name" 
                type="text" 
                placeholder="e.g. Manish Sharma" 
                required 
                maxLength={50} 
                minLength={3}
                pattern="^[A-Za-z\s]{3,50}$"
                onKeyDown={(e) => {
                  if (/[0-9]/.test(e.key)) e.preventDefault()
                }}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white placeholder-white/20 focus:outline-none focus:border-netcare-red transition-all shadow-inner" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-netcare-lilac/40 uppercase tracking-widest ml-1">Contact Email</label>
              <input name="email" type="email" placeholder="test@gmail.com" required maxLength={60} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white placeholder-white/20 focus:outline-none focus:border-netcare-red transition-all shadow-inner" />
            </div>

            {/* Vehicle Information */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-netcare-lilac/40 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Truck size={12} className="text-netcare-red" /> Vehicle Type
              </label>
              <div className="relative">
                <select name="vehicleType" required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-netcare-red transition-all appearance-none cursor-pointer">
                  <option value="BUS" className="bg-netcare-navy">BUS</option>
                  <option value="VAN" className="bg-netcare-navy">VAN</option>
                  <option value="CAR" className="bg-netcare-navy">CAR</option>
                  <option value="HIACE" className="bg-netcare-navy">HIACE</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-white/30 text-xs">▼</div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-netcare-lilac/40 uppercase tracking-widest ml-1">Vehicle Number</label>
              <input name="vehicleNumber" type="text" placeholder="e.g. BA 2 PA 1234" required minLength={4} maxLength={20} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white placeholder-white/20 focus:outline-none focus:border-netcare-red transition-all shadow-inner" />
            </div>

            {/* Service Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-netcare-lilac/40 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Wifi size={12} className="text-netcare-red" /> Required Service
              </label>
              <div className="relative">
                <select 
                  name="requiredService" 
                  required 
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-netcare-red transition-all appearance-none cursor-pointer"
                >
                  <option value="wifi_only" className="bg-netcare-navy">WIFI ONLY</option>
                  <option value="wifi_camera" className="bg-netcare-navy">WIFI + CAMERA</option>
                  <option value="wifi_camera_gps" className="bg-netcare-navy">WIFI + CAMERA + GPS</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-white/30 text-xs">▼</div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-netcare-lilac/40 uppercase tracking-widest ml-1">Mobile Contact (10 Digits)</label>
              <input 
                name="phone" 
                type="tel" 
                pattern="[0-9]{10}" 
                maxLength={10}
                onKeyDown={(e) => {
                  if (!/[0-9]|Backspace|Tab|ArrowLeft|ArrowRight|Delete/.test(e.key)) e.preventDefault()
                }}
                title="Please enter exactly 10 digits" 
                placeholder="98XXXXXXXX" 
                required 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white placeholder-white/20 focus:outline-none focus:border-netcare-red transition-all shadow-inner" 
              />
            </div>

            {/* Conditional Camera Count */}
            {['wifi_camera', 'wifi_camera_gps'].includes(selectedService) && (
              <div className="space-y-2 col-span-1 md:col-span-2 animate-in zoom-in-95 duration-300">
                <label className="text-xs font-bold text-netcare-lilac/40 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Camera size={12} className="text-netcare-red" /> Number of Cameras Needed
                </label>
                <div className="relative">
                  <select name="numberOfCameras" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-netcare-red transition-all appearance-none cursor-pointer">
                    <option value="1" className="bg-netcare-navy">1 Camera</option>
                    <option value="2" className="bg-netcare-navy">2 Cameras</option>
                    <option value="4" className="bg-netcare-navy">4 Cameras</option>
                    <option value="8" className="bg-netcare-navy">8 Cameras</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-white/30 text-xs">▼</div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-netcare-lilac/40 uppercase tracking-widest ml-1">Additional Requirements (Max 50 Words)</label>
            <textarea name="message" placeholder="Details about your fleet layout or installation timelines..." rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white placeholder-white/20 focus:outline-none focus:border-netcare-red transition-all resize-none shadow-inner" />
          </div>

          {/* Verification Captcha */}
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4 flex flex-col items-center md:items-start max-w-sm">
            <label className="text-[10px] font-bold text-netcare-red uppercase tracking-[0.2em] block">Security Verification</label>
            <div className="flex items-center gap-6">
              <span className="text-xl text-white font-mono bg-white/10 px-5 py-2 rounded-xl border border-white/10 select-none shadow-xl">
                {captcha.num1} + {captcha.num2} = ?
              </span>
              <input 
                name="captcha" 
                type="number" 
                required 
                placeholder="Result"
                className="w-28 px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white outline-none focus:border-netcare-red transition-all text-base text-center shadow-inner" 
              />
            </div>
          </div>

          <div className="pt-8 border-t border-white/10">
            <button type="submit" className="w-full md:w-auto bg-netcare-red hover:bg-red-800 text-white font-bold py-5 px-16 rounded-2xl transition-all shadow-2xl hover:shadow-netcare-red/20 active:scale-[0.98] flex items-center justify-center gap-4 text-xs tracking-widest uppercase">
              Submit Global Inquiry <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
