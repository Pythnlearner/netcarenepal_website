'use client'

import React, { useEffect, useRef } from 'react'
import { animate, useInView, useMotionValue, useTransform, motion } from 'framer-motion'

interface CounterProps {
  value: number
  label: string
  suffix?: string
}

export default function Counter({ value, label, suffix = '+' }: CounterProps) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (inView) {
      animate(count, value, { duration: 2, ease: "easeOut" })
    }
  }, [inView, count, value])

  return (
    <div ref={ref} className="text-center space-y-4">
      <div className="text-5xl md:text-6xl font-black text-white tracking-tighter flex justify-center items-center">
        <motion.span>{rounded}</motion.span>
        <span className="text-netcare-red ml-1">{suffix}</span>
      </div>
      <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-white/40">
        {label}
      </p>
    </div>
  )
}
