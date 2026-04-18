'use client'

import React, { useState } from 'react'
import { Plus, Minus, Wifi, ShieldCheck, CheckCircle2, ArrowRight, Smartphone, HardDrive } from 'lucide-react'

// Strict Pricing Dictionary
const PRICING_MATRIX = {
  new: {
    basic: { '1': 7000, '6': 10000, '12': 18000 },
    premium: { '1': 8000, '6': 15000, '12': 25000 }
  },
  renewal: {
    basic: { '1': 2000, '6': 10000, '12': 18000 },
    premium: { '1': 3000, '6': 15000, '12': 25000 }
  },
  rental: {
    '7': 800,
    '15': 1200,
    '30': 1500
  }
}

const RENTAL_DEPOSIT = 3500
const CCTV_UNIT_PRICE = 6000

type ProductMode = 'fleet' | 'pocket'

export interface SolutionsCalculatorProps {
  headline?: string
  description?: string
  fleetModeLabel?: string
  pocketModeLabel?: string
  buttonText?: string
  cctvUnitPrice?: number
  newInstallation?: {
    basic1?: number
    basic6?: number
    basic12?: number
    premium1?: number
    premium6?: number
    premium12?: number
  }
  renewal?: {
    basic1?: number
    basic6?: number
    basic12?: number
    premium1?: number
    premium6?: number
    premium12?: number
  }
  pocketDeposit?: number
  price7?: number
  price15?: number
  price30?: number
}

export default function SolutionsCalculator({
  headline = "Solutions & Live Calculator",
  description = "Configure your fleet's connectivity and security needs in real-time. Our transparent pricing ensures you get the best value for your logistics operations.",
  fleetModeLabel = "Fleet Connectivity",
  pocketModeLabel = "Pocket Wi-Fi Rental",
  buttonText = "Request Formal Proposal",
  cctvUnitPrice = 6000,
  newInstallation = {
    basic1: 7000,
    basic6: 10000,
    basic12: 18000,
    premium1: 8000,
    premium6: 15000,
    premium12: 25000
  },
  renewal = {
    basic1: 2000,
    basic6: 10000,
    basic12: 18000,
    premium1: 3000,
    premium6: 15000,
    premium12: 25000
  },
  pocketDeposit = 3500,
  price7 = 800,
  price15 = 1200,
  price30 = 1500
}: SolutionsCalculatorProps) {
  const [productMode, setProductMode] = useState<ProductMode>('fleet')
  
  // Fleet States
  const [customerType, setCustomerType] = useState<'new' | 'renewal'>('new')
  const [serviceTier, setServiceTier] = useState<'basic' | 'premium'>('basic')
  const [fleetDuration, setFleetDuration] = useState<'1' | '6' | '12'>('1')
  const [cctvCount, setCctvCount] = useState<number>(0)

  // Pocket States
  const [pocketDuration, setPocketDuration] = useState<'7' | '15' | '30'>('7')
  const [pocketQuantity, setPocketQuantity] = useState<number>(1)

  // Calculations
  const isFleet = productMode === 'fleet'
  
  let baseCost = 0
  let addOnCost = 0
  let depositCost = 0

  if (isFleet) {
    const pricingSource = customerType === 'new' ? newInstallation : renewal
    const key = `${serviceTier}${fleetDuration}` as keyof typeof pricingSource
    baseCost = pricingSource[key] || 0
    addOnCost = cctvCount * (cctvUnitPrice || 0)
  } else {
    const pocketPricing: Record<string, number> = {
      '7': price7 || 0,
      '15': price15 || 0,
      '30': price30 || 0
    }
    baseCost = (pocketPricing[pocketDuration] || 0) * pocketQuantity
    depositCost = (pocketDeposit || 0) * pocketQuantity
    addOnCost = 0 
  }

  const totalCost = baseCost + addOnCost + depositCost

  const durationLabels = {
    '1': '1 Month',
    '6': '6 Months',
    '12': '1 Year',
    '7': '7 Days',
    '15': '15 Days',
    '30': '30 Days'
  }

  const tierLabels = {
    basic: 'Basic (Standard Speed)',
    premium: 'Premium (Enhanced Bandwidth)'
  }

  const typeLabels = {
    new: 'New Installation',
    renewal: 'Renewal',
    rental: pocketModeLabel
  }

  return (
    <div className="bg-midnight-deep text-mist-white min-h-[calc(100vh-80px)] flex flex-col justify-center">
      <main className="py-8">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{headline}</h1>
            <p className="text-steel-blue-gray text-base max-w-2xl">
              {description}
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex justify-start md:justify-center mb-8">
            <div className="bg-white/5 p-1 rounded-2xl border border-white/5 flex gap-1">
              <button
                onClick={() => setProductMode('fleet')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  productMode === 'fleet' 
                    ? 'bg-netcare-red text-white shadow-md' 
                    : 'text-steel-blue-gray hover:text-white hover:bg-white/5'
                }`}
              >
                <HardDrive className="w-4 h-4" />
                {fleetModeLabel}
              </button>
              <button
                onClick={() => setProductMode('pocket')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  productMode === 'pocket' 
                    ? 'bg-netcare-red text-white shadow-md' 
                    : 'text-steel-blue-gray hover:text-white hover:bg-white/5'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                {pocketModeLabel}
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Configurator */}
            <div className="lg:col-span-7">
              <div className="bg-aero-surface p-6 rounded-[24px] border border-white/5 space-y-6">
                
                {isFleet ? (
                  <>
                    {/* 1. Customer Type */}
                    <div className="space-y-3">
                      <label className="text-sm font-bold uppercase tracking-widest text-steel-blue-gray block">
                        1. Customer Type
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        {(['new', 'renewal'] as const).map((type) => (
                          <button
                            key={type}
                            onClick={() => setCustomerType(type)}
                            className={`py-3 px-4 rounded-xl border transition-all flex items-center justify-center sm:justify-start gap-2 sm:gap-3 ${
                              customerType === type 
                                ? 'border-netcare-red bg-netcare-red/10 text-white shadow-[0_0_15px_rgba(217,59,59,0.1)]' 
                                : 'border-white/5 bg-white/5 text-mist-white/60 hover:border-white/20'
                            }`}
                          >
                            <CheckCircle2 className={`w-4 h-4 hidden sm:block ${customerType === type ? 'text-netcare-red' : 'text-transparent border border-white/20 rounded-full'}`} />
                            <span className="font-bold whitespace-nowrap text-sm sm:text-base">{typeLabels[type]}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 2. Service Tier */}
                    <div className="space-y-3">
                      <label className="text-sm font-bold uppercase tracking-widest text-steel-blue-gray block">
                        2. Service Tier
                      </label>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {(['basic', 'premium'] as const).map((tier) => (
                          <button
                            key={tier}
                            onClick={() => setServiceTier(tier)}
                            className={`p-4 rounded-xl border transition-all text-left space-y-2 ${
                              serviceTier === tier 
                                ? 'border-netcare-red bg-netcare-red/10 shadow-[0_0_15px_rgba(217,59,59,0.1)]' 
                                : 'border-white/5 bg-white/5 hover:border-white/20'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <Wifi className={`w-5 h-5 ${serviceTier === tier ? 'text-netcare-red' : 'text-steel-blue-gray'}`} />
                              {serviceTier === tier && <div className="w-1.5 h-1.5 rounded-full bg-netcare-red" />}
                            </div>
                            <div>
                              <h3 className={`font-bold text-lg ${serviceTier === tier ? 'text-white' : 'text-mist-white'}`}>
                                {tierLabels[tier].split(' ')[0]}
                              </h3>
                              <p className="text-xs text-steel-blue-gray mt-1 italic">
                                {tier === 'basic' ? 'Standard Speed' : 'Enhanced Bandwidth'}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 3. Duration */}
                    <div className="space-y-3">
                      <label className="text-sm font-bold uppercase tracking-widest text-steel-blue-gray block">
                        3. Duration
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {(['1', '6', '12'] as const).map((dur) => (
                          <button
                            key={dur}
                            onClick={() => setFleetDuration(dur)}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${
                              fleetDuration === dur 
                                ? 'bg-netcare-red border-netcare-red text-white shadow-sm' 
                                : 'bg-white/5 border-white/5 text-mist-white hover:bg-white/10'
                            }`}
                          >
                            {durationLabels[dur]}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 4. CCTV Cameras */}
                    <div className="space-y-3 pt-4 border-t border-white/5">
                      <div className="flex justify-between items-end">
                        <label className="text-sm font-bold uppercase tracking-widest text-steel-blue-gray block">
                          4. CCTV Cameras
                        </label>
                        <span className="text-netcare-red text-xs font-bold bg-netcare-red/10 px-3 py-1 rounded-full border border-netcare-red/20 uppercase">
                          Rs. {cctvUnitPrice?.toLocaleString()} per camera
                        </span>
                      </div>
                      
                      <div className="bg-midnight-deep/40 border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-netcare-red/10 rounded-lg border border-netcare-red/20 hidden sm:block">
                            <ShieldCheck className="w-6 h-6 text-netcare-red" />
                          </div>
                          <div className="text-center sm:text-left">
                            <h4 className="font-bold text-base">Mobile NVR Add-on</h4>
                            <p className="text-xs text-steel-blue-gray">Up to 10 cameras</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6 bg-midnight-deep p-2 rounded-xl border border-white/10 shadow-inner">
                          <button
                            onClick={() => setCctvCount(Math.max(0, cctvCount - 1))}
                            disabled={cctvCount === 0}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                              cctvCount > 0 ? 'bg-white/5 hover:bg-white/10 text-white' : 'text-white/10 cursor-not-allowed'
                            }`}
                          >
                            <Minus className="w-5 h-5" />
                          </button>
                          <span className="text-2xl font-black w-8 text-center">{cctvCount}</span>
                          <button
                            onClick={() => setCctvCount(Math.min(10, cctvCount + 1))}
                            disabled={cctvCount === 10}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                              cctvCount < 10 ? 'bg-netcare-red text-white hover:bg-red-600 shadow-[0_0_10px_rgba(217,59,59,0.2)]' : 'text-white/10 cursor-not-allowed'
                            }`}
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* 1. Rental Duration */}
                    <div className="space-y-3">
                      <label className="text-sm font-bold uppercase tracking-widest text-steel-blue-gray block">
                        1. Rental Duration
                      </label>
                      <div className="flex flex-wrap gap-2 text-sm">
                        {(['7', '15', '30'] as const).map((dur) => (
                          <button
                            key={dur}
                            onClick={() => setPocketDuration(dur)}
                            className={`px-6 py-3 rounded-xl font-bold transition-all border ${
                              pocketDuration === dur 
                                ? 'bg-netcare-red/10 border-netcare-red text-white shadow-sm' 
                                : 'bg-white/5 border-white/5 text-mist-white hover:bg-white/10'
                            }`}
                          >
                            {durationLabels[dur]}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 2. Device Quantity */}
                    <div className="space-y-3 pt-4 border-t border-white/5">
                      <div className="flex justify-between items-end">
                        <label className="text-sm font-bold uppercase tracking-widest text-steel-blue-gray block">
                          2. Unit Quantity
                        </label>
                        <span className="text-netcare-red text-xs font-bold bg-netcare-red/10 px-3 py-1 rounded-full border border-netcare-red/20 uppercase">
                          Pocket devices
                        </span>
                      </div>
                      
                      <div className="bg-midnight-deep/40 border border-white/5 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-5">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-netcare-red/10 rounded-xl border border-netcare-red/20 shadow-sm hidden sm:block">
                            <Smartphone className="w-6 h-6 text-netcare-red" />
                          </div>
                          <div className="text-center sm:text-left">
                            <h4 className="font-bold text-lg">Pocket Wi-Fi Units</h4>
                            <p className="text-xs text-steel-blue-gray">Select total devices</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-8 bg-midnight-deep p-3 rounded-2xl border border-white/10 shadow-inner">
                          <button
                            onClick={() => setPocketQuantity(Math.max(1, pocketQuantity - 1))}
                            disabled={pocketQuantity === 1}
                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                              pocketQuantity > 1 ? 'bg-white/5 hover:bg-white/10 text-white' : 'text-white/10 cursor-not-allowed'
                            }`}
                          >
                            <Minus className="w-6 h-6" />
                          </button>
                          <span className="text-3xl font-black w-10 text-center">{pocketQuantity}</span>
                          <button
                            onClick={() => setPocketQuantity(Math.min(20, pocketQuantity + 1))}
                            disabled={pocketQuantity === 20}
                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                              pocketQuantity < 20 ? 'bg-netcare-red text-white hover:bg-red-600 shadow-xl' : 'text-white/10 cursor-not-allowed'
                            }`}
                          >
                            <Plus className="w-6 h-6" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Column: Live Quotation Sticky Card */}
            <div className="lg:col-span-5 relative">
              <div className="bg-aero-surface p-6 sm:p-8 rounded-[24px] border border-netcare-red/20 lg:sticky lg:top-8 shadow-xl">
                <header className="mb-6">
                  <h2 className="text-xl font-bold border-b border-white/10 pb-3">
                    {isFleet ? 'Your Fleet Solution' : 'Your Rental Solution'}
                  </h2>
                </header>

                <div className="space-y-5 mb-8">
                  <div className="flex justify-between items-start">
                    <div className="space-y-0.5">
                      <p className="font-bold text-mist-white text-sm">
                        {isFleet ? tierLabels[serviceTier] : `Pocket Wi-Fi Rental x${pocketQuantity}`}
                      </p>
                      <p className="text-xs text-steel-blue-gray">
                        {isFleet ? `Fleet Connectivity - ${durationLabels[fleetDuration]}` : `Duration - ${durationLabels[pocketDuration]}`}
                      </p>
                    </div>
                    <span className="font-bold text-base text-white">Rs. {baseCost.toLocaleString()}</span>
                  </div>

                  {!isFleet && (
                    <div className="flex justify-between items-start animate-in slide-in-from-top-2 duration-300">
                      <div className="space-y-0.5">
                        <p className="font-bold text-mist-white text-sm">Refundable Deposit</p>
                        <p className="text-xs text-steel-blue-gray">Returned after hand-over</p>
                      </div>
                      <span className="font-bold text-base text-white">Rs. {depositCost.toLocaleString()}</span>
                    </div>
                  )}

                  {isFleet && cctvCount > 0 && (
                    <div className="flex justify-between items-start animate-in slide-in-from-top-2 duration-300">
                      <div className="space-y-0.5">
                        <p className="font-bold text-mist-white text-sm">{cctvCount}x CCTV Units</p>
                        <p className="text-xs text-steel-blue-gray">Incl. installation</p>
                      </div>
                      <span className="font-bold text-base text-white">Rs. {addOnCost.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-white/10 space-y-5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-netcare-red">Grand Total (Estimated)</label>
                    <div className="text-4xl sm:text-5xl font-black tracking-tighter text-white flex items-baseline gap-1.5">
                      <span className="text-xl font-bold text-netcare-red">Rs.</span>
                      {totalCost.toLocaleString()}
                    </div>
                  </div>

                  <p className="text-xs text-steel-blue-gray italic leading-relaxed">
                    * Prices include taxes. Final quotation may vary based on terminal location.
                  </p>

                  <button className="group w-full bg-netcare-red hover:bg-red-600 text-white font-black py-4 px-6 rounded-xl transition-all text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                    {buttonText}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
