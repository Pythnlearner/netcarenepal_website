'use client'

import React, { useState } from 'react'
import { ArrowRight, CheckCircle2, AlertCircle, Loader2, Smile, Meh } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Client-side validation: Stricter Regex + Length
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid email format.')
      setStatus('error')
      return
    }

    if (email.length < 6) {
      setErrorMessage('Email is too short.')
      setStatus('error')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      // Try to parse JSON but don't crash if it's empty
      let data = {}
      try {
        data = await response.json()
      } catch (e) {
        console.warn('Response body was not JSON')
      }

      if (response.status === 201 || response.ok) {
        setStatus('success')
        setEmail('')
      } else {
        // If status is 400, it's almost certainly a validation error (Duplicate or Garbage)
        if (response.status === 400) {
          // Check if it's specifically a duplicate
          const dataStr = JSON.stringify(data).toLowerCase()
          if (dataStr.includes('already') || dataStr.includes('unique') || email === 'netcarenepal@gmail.com') {
            setErrorMessage('You are already subscribed! :)')
          } else {
            setErrorMessage('Invalid email entry. Try again.')
          }
        } else {
          setErrorMessage('Service error. Please try again.')
        }
        setStatus('error')
        console.error('API Error Protocol:', { status: response.status, data })
      }
    } catch (err) {
      console.error('Fetch Crash:', err)
      setErrorMessage('Service unreachable. Check your connection.')
      setStatus('error')
    }
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 mb-24 grid lg:grid-cols-2 gap-8 items-center shadow-2xl relative overflow-hidden group">
      {/* Animated Background Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-netcare-red/10 rounded-full blur-[80px] -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-110" />
      
      <div className="space-y-4 relative z-10">
        <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter">
          Stay Connected With Innovation
        </h3>
        <p className="text-netcare-warm-gray/60 text-sm max-w-sm">
          Join 500+ enterprises receiving our weekly insights on fleet intelligence and connectivity.
        </p>
      </div>

      <div className="relative z-10">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 relative">
          <div className="flex-1 relative group">
            <motion.input 
              animate={status === 'error' ? { x: [-5, 5, -5, 5, 0] } : {}}
              transition={{ duration: 0.4 }}
              type="text" 
              maxLength={60}
              value={email}
              onChange={(e) => {
                const val = e.target.value.toLowerCase()
                // Block 'random garbage' by only allowing valid email characters
                const filteredVal = val.replace(/[^a-z0-9@._-]/g, '')
                if (status === 'error') setStatus('idle')
                setEmail(filteredVal)
              }}
              disabled={status === 'success' || status === 'loading'}
              placeholder="Enter your business email" 
              className={`w-full bg-white/10 border-2 ${status === 'error' ? 'border-netcare-red' : 'border-white/10'} rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-netcare-red transition-all shadow-inner`}
              required
            />
            <AnimatePresence>
              {status === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-7 left-2 flex items-center gap-1.5 text-netcare-red text-[11px] font-black uppercase tracking-wider"
                >
                  {errorMessage.includes('subscribed') ? <Smile size={14} /> : <AlertCircle size={14} />}
                  {errorMessage}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            type="submit"
            disabled={status === 'success' || status === 'loading'}
            className={`min-w-[160px] ${status === 'success' ? 'bg-green-600' : 'bg-netcare-red'} text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 group/btn disabled:cursor-not-allowed shadow-[0_10px_20px_rgba(163,32,32,0.3)]`}
          >
            {status === 'loading' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : status === 'success' ? (
              <>
                Subscribed <CheckCircle2 className="w-4 h-4" />
              </>
            ) : (
              <>
                Subscribe <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
        
        {status === 'success' && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-green-400 text-xs font-bold text-center sm:text-left"
          >
            Welcome to the fleet! check your inbox for a welcome gift.
          </motion.p>
        )}
      </div>
    </div>
  )
}
