'use client'

import React from 'react'
import Link from 'next/link'
import { CompanySettings } from '@/lib/payload'
import Image from 'next/image'
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'

interface FooterProps {
  settings?: CompanySettings | null
}

export default function Footer({ settings }: FooterProps) {
  const headOffice = settings?.headOffice || 'Tokha, Kathmandu'
  const email = (settings?.email && settings.email !== 'info@netcarenepal.com') ? settings.email : 'netcarenepal@gmail.com'
  const hotline1 = settings?.hotline1 || '+977 9802900818'

  const socialLinks = [
    { name: 'Facebook', icon: '/icons/facebook.png', href: 'https://www.facebook.com/netcarenepal' },
    { name: 'Instagram', icon: '/icons/instagram.png', href: 'https://www.instagram.com/netcarenepal' },
    { name: 'WhatsApp', icon: '/icons/whatsapp.png', href: 'https://wa.me/9779802900818' },
    { name: 'TikTok', icon: '/icons/tiktok.png', href: 'https://www.tiktok.com/search?q=netcare%20nepal&t=1776366082128' },
  ]

  return (
    <footer className="bg-netcare-navy text-netcare-warm-gray border-t border-white/5 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-netcare-red/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-6 max-w-7xl pt-24 pb-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 pb-20">
          
          {/* Column 1: Brand & Map */}
          <div className="lg:col-span-4 space-y-8">
             <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-netcare-red rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(235,51,51,0.3)]">
                      <span className="text-white font-black">N</span>
                   </div>
                   <h2 className="text-2xl font-black text-white tracking-tighter italic">NETCARE NEPAL</h2>
                </div>
                <p className="text-sm leading-relaxed text-netcare-warm-gray/60 max-w-xs">
                   Pioneering Nepal&apos;s digital infrastructure with enterprise connectivity and smart security solutions since 2014.
                </p>
             </div>

             {/* Small Map Container */}
             <div className="relative h-48 w-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14125.7554900595!2d85.3197609!3d27.7656965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb193f9c3f640f%3A0x6b68a88c3a96860!2sTokha%2044600!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(0.8)' }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="group-hover:grayscale-0 group-hover:invert-0 group-hover:contrast-100 transition-all duration-700"
                />
                <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-[2rem]" />
             </div>
          </div>

          {/* Column 2: Solutions */}
          <div className="lg:col-span-2 space-y-8 pt-2">
             <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white">Solutions</h4>
             <ul className="space-y-4 text-sm font-medium">
                <li><Link href="/products" className="hover:text-netcare-red transition-colors">Bus Wi-Fi System</Link></li>
                <li><Link href="/products" className="hover:text-netcare-red transition-colors">Fleet CCTV 360</Link></li>
                <li><Link href="/products" className="hover:text-netcare-red transition-colors">GPS Telemetry</Link></li>
                <li><Link href="/solutions" className="hover:text-netcare-red transition-colors">Digital Ticketing</Link></li>
             </ul>
          </div>

          {/* Column 3: Utility */}
          <div className="lg:col-span-2 space-y-8 pt-2">
             <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white">Company</h4>
             <ul className="space-y-4 text-sm font-medium">
                <li><Link href="/about-us" className="hover:text-netcare-red transition-colors">About History</Link></li>
                <li><Link href="/about-us" className="hover:text-netcare-red transition-colors">Leadership</Link></li>
                <li><Link href="/contact" className="hover:text-netcare-red transition-colors">Support Portal</Link></li>
                <li><Link href="/contact" className="hover:text-netcare-red transition-colors">Privacy Policy</Link></li>
             </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="lg:col-span-4 space-y-8 pt-2">
             <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white">Direct Connect</h4>
             <div className="space-y-6">
                <a href={`tel:${hotline1}`} className="flex items-center gap-5 group/item">
                   <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover/item:border-netcare-red group-hover/item:bg-netcare-red/10 transition-all">
                      <Phone className="w-5 h-5 text-netcare-red" />
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Main Hotline</span>
                      <span className="text-base font-black text-white">{hotline1}</span>
                   </div>
                </a>
                <a href={`mailto:${email}`} className="flex items-center gap-5 group/item">
                   <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover/item:border-netcare-red group-hover/item:bg-netcare-red/10 transition-all">
                      <Mail className="w-5 h-5 text-netcare-red" />
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Enterprise Email</span>
                      <span className="text-base font-black text-white">{email}</span>
                   </div>
                </a>
                <div className="space-y-4">
                  {[
                    { label: 'Head Office', city: 'Tokha, Kathmandu' },
                    { label: 'Support Office', city: 'Birgunj Branch' },
                    { label: 'Branch Office', city: 'Pokhara Branch' },
                  ].map((office, idx) => (
                    <div key={idx} className="flex items-center gap-5 group/item">
                       <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover/item:border-netcare-red group-hover/item:bg-netcare-red/10 transition-all">
                          <MapPin className="w-4 h-4 text-netcare-red" />
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[9px] uppercase font-bold text-white/40 tracking-widest">{office.label}</span>
                          <span className="text-sm font-bold text-white leading-tight">{office.city}</span>
                       </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
           <p className="text-xs font-medium text-white/30">
              © 2024 NETCARE NEPAL PVT. LTD. ALL RIGHTS RESERVED.
           </p>
           <div className="flex items-center gap-4">
              {socialLinks.map((social, i) => (
                <Link 
                  key={i} 
                  href={social.href} 
                  target="_blank"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-netcare-red hover:bg-netcare-red/5 transition-all overflow-hidden p-2 group"
                >
                  <Image 
                    src={social.icon} 
                    alt={social.name} 
                    width={20} 
                    height={20} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform" 
                  />
                </Link>
              ))}
           </div>
        </div>

      </div>
    </footer>
  )
}
