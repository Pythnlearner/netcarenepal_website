'use client'

import React, { useState } from 'react'
import { Mail, Lock, AlertCircle } from 'lucide-react'

export const CustomLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (res.ok) {
        window.location.href = '/admin'
      } else {
        const data = await res.json()
        setError(data.errors?.[0]?.message || 'Invalid credentials provided.')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 font-sans selection:bg-blue-100">
      
      {/* Ultra-Premium SaaS Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex justify-center items-center">
        {/* Subtle Designer Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.25]" />
        
        {/* Soft Ambient Glows */}
        <div className="absolute -top-40 w-full max-w-[1000px] h-[600px] bg-gradient-to-b from-blue-100/60 via-sky-50/20 to-transparent blur-[120px]" />
        <div className="absolute right-[-10%] top-[20%] w-[600px] h-[600px] bg-indigo-100/30 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-[440px] px-6">
        
        {/* Sleek Header Section */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-28 h-28 bg-white/80 backdrop-blur-sm rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-200/80 p-5 mb-8 flex items-center justify-center">
             <img src="/logo.png" alt="Netcare CMS" className="object-contain w-full h-full grayscale-[0.1]" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
            Welcome back
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Sign in to your Netcare Workspace
          </p>
        </div>

        {/* Clean Enterprise Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {error && (
              <div className="bg-red-50/50 border border-red-100 rounded-xl p-4 flex gap-3 animate-in fade-in zoom-in slide-in-from-top-2 duration-300">
                <AlertCircle className="text-red-500 w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-red-800 text-sm font-medium">{error}</p>
              </div>
            )}

            <div className="space-y-5">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 block ml-1">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full bg-slate-50 text-slate-900 rounded-xl py-3.5 pl-12 pr-4 outline-none border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all placeholder:text-slate-400 text-[15px]"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center ml-1 pr-1">
                   <label className="text-sm font-semibold text-slate-700">Password</label>
                   <button type="button" className="text-[13px] font-medium text-blue-600 hover:text-blue-700 transition-colors">Forgot password?</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-slate-50 text-slate-900 rounded-xl py-3.5 pl-12 pr-4 outline-none border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all placeholder:text-slate-400 text-[15px]"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0a1128] hover:bg-[#1a233a] active:bg-[#050914] text-white font-semibold py-3.5 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-[15px] shadow-sm mt-8"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </div>

        {/* Minimal Footer */}
        <div className="mt-8 text-center">
          <p className="text-slate-400 text-[13px] font-medium">
            &copy; {new Date().getFullYear()} Netcare Nepal. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

