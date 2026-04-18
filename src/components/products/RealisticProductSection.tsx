'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Bus, Send, CheckCircle2, User, Mail, Loader2, AlertCircle } from 'lucide-react'
import { submitLead } from '@/app/actions/submitLead'

export interface RealisticProductSectionProps {
  theme?: 'navy' | 'redish' | 'grey'
  imageSide?: 'left' | 'right'
  headlineEn: string
  subheadlineEn?: string
  featuresEn?: { feature: string }[]
  headlineNp?: string
  subheadlineNp?: string
  featuresNp?: { feature: string }[]
  image: any
  showForm?: boolean
  formTitle?: string
  serviceType?: 'wifi_only' | 'wifi_camera' | 'wifi_camera_gps'
}

export default function RealisticProductSection({
  theme = 'navy',
  imageSide = 'right',
  headlineEn,
  subheadlineEn,
  featuresEn,
  headlineNp,
  subheadlineNp,
  featuresNp,
  image,
  showForm = true,
  formTitle = 'Get Instant Pricing',
  serviceType = 'wifi_only'
}: RealisticProductSectionProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  
  const themeClasses = {
    navy: 'bg-netcare-navy text-white',
    redish: 'bg-gradient-to-br from-netcare-red/20 via-netcare-navy to-netcare-navy text-white',
    grey: 'bg-aero-surface text-mist-white'
  }

  const imageUrl = typeof image === 'string' ? image : image?.url

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    const formData = new FormData(e.currentTarget)
    
    try {
      const result = await submitLead(formData)
      if (result.success) {
        setStatus('success')
      } else {
        setErrorMessage(result.error || 'Something went wrong.')
        setStatus('error')
      }
    } catch (err) {
      setErrorMessage('Network error. Please try again.')
      setStatus('error')
    }
  }

  return (
    <section className={`py-24 relative overflow-hidden ${themeClasses[theme]}`}>
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
         <div className={`absolute top-1/4 ${imageSide === 'right' ? 'left-0' : 'right-0'} w-96 h-96 bg-netcare-red/20 blur-[150px] rounded-full`} />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className={`flex flex-col lg:flex-row gap-16 items-center ${imageSide === 'left' ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* Content Side */}
          <div className="w-full lg:w-1/2 space-y-10">
            {/* Header with Dual Language */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                  {headlineEn}
                </h2>
                {headlineNp && (
                  <h3 className="text-2xl md:text-3xl font-bold text-netcare-red/80 font-noto">
                    {headlineNp}
                  </h3>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="space-y-4"
              >
                <p className="text-lg text-white/70 leading-relaxed font-medium">
                  {subheadlineEn}
                </p>
                {subheadlineNp && (
                  <p className="text-base text-white/50 leading-relaxed italic border-l-2 border-netcare-red/30 pl-4 font-noto">
                    {subheadlineNp}
                  </p>
                )}
              </motion.div>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(featuresEn || []).map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx }}
                  className="flex items-start gap-3 group"
                >
                  <div className="mt-1 w-5 h-5 rounded-full bg-netcare-red/20 flex items-center justify-center shrink-0 group-hover:bg-netcare-red transition-colors duration-300">
                    <CheckCircle2 size={12} className="text-netcare-red group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white tracking-wide">{item.feature}</p>
                    {featuresNp && featuresNp[idx] && (
                      <p className="text-[11px] text-white/40 font-noto mt-0.5">{featuresNp[idx].feature}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Form Box */}
            {showForm && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-netcare-red/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-netcare-red/20 transition-all duration-700" />
                
                <h4 className="text-xl font-bold mb-8 flex items-center gap-3">
                  <Send size={20} className="text-netcare-red" />
                  {formTitle}
                </h4>

                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-10 space-y-4"
                    >
                      <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 size={32} />
                      </div>
                      <h5 className="text-2xl font-bold">Request Sent</h5>
                      <p className="text-white/60">Thank you! Our technical team will reach out to you within 24 hours.</p>
                      <button 
                        onClick={() => setStatus('idle')}
                        className="text-netcare-red font-bold uppercase tracking-widest text-[10px] mt-4 hover:underline"
                      >
                        Send Another Request
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6" 
                      onSubmit={handleSubmit}
                    >
                      <input type="hidden" name="formType" value={`Product: ${headlineEn}`} />
                      <input type="hidden" name="requiredService" value={serviceType} />
                      <input type="hidden" name="vehicleType" value="BUS" />

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-4">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                            <input 
                              name="name"
                              type="text" 
                              required
                              maxLength={50}
                              pattern="^[A-Za-z\s]{3,50}$"
                              title="Please enter a valid name (letters only, min 3 chars)"
                              placeholder="Manish Sharma" 
                              onKeyDown={(e) => {
                                if (/[0-9]/.test(e.key)) e.preventDefault()
                              }}
                              className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-white/10 focus:outline-none focus:border-netcare-red/50 focus:bg-black/40 transition-all"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-4">Email Address</label>
                          <div className="relative">
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                            <input 
                              name="email"
                              type="email" 
                              required
                              maxLength={60}
                              placeholder="manish@example.com" 
                              className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-white/10 focus:outline-none focus:border-netcare-red/50 focus:bg-black/40 transition-all"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-4">Phone Number</label>
                          <div className="relative">
                            <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                            <input 
                              name="phone"
                              type="tel" 
                              required
                              pattern="[0-9]{10}"
                              maxLength={10}
                              title="Please enter exactly 10 digits"
                              placeholder="98XXXXXXXX" 
                              onKeyDown={(e) => {
                                if (!/[0-9]|Backspace|Tab|ArrowLeft|ArrowRight|Delete/.test(e.key)) e.preventDefault()
                              }}
                              className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-white/10 focus:outline-none focus:border-netcare-red/50 focus:bg-black/40 transition-all"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-4">Bus / Vehicle No.</label>
                          <div className="relative">
                            <Bus className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                            <input 
                              name="vehicleNumber"
                              type="text" 
                              required
                              minLength={4}
                              maxLength={20}
                              placeholder="BA 1 PA 1234" 
                              className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-white/10 focus:outline-none focus:border-netcare-red/50 focus:bg-black/40 transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      {status === 'error' && (
                        <div className="flex items-center gap-2 text-netcare-red text-xs font-bold bg-netcare-red/10 p-4 rounded-xl">
                          <AlertCircle size={16} />
                          {errorMessage}
                        </div>
                      )}

                      <button 
                        disabled={status === 'loading'}
                        className="w-full bg-netcare-red text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-white hover:text-netcare-red transition-all duration-500 shadow-xl hover:shadow-netcare-red/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                      >
                        {status === 'loading' ? (
                          <>Processing Request <Loader2 className="animate-spin" size={16} /></>
                        ) : (
                          <>Submit Requirement</>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>

          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: imageSide === 'right' ? 5 : -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="relative aspect-square md:aspect-video lg:aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 group bg-aero-surface"
            >
              <Image 
                src={imageUrl || '/placeholder.png'} 
                alt={headlineEn} 
                fill 
                className="object-cover transition-transform duration-[3s] group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-10 left-10 p-4 border-l-2 border-netcare-red backdrop-blur-md bg-black/20 rounded-r-2xl">
                 <p className="text-white font-black italic text-lg leading-tight uppercase tracking-tight">Enterprise <br /> Certified <br /> Excellence</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
