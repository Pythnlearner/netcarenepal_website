'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface HeaderProps {
  logoUrl?: string
  logoAlt?: string
}

const Header: React.FC<HeaderProps> = ({ logoUrl, logoAlt }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Contact Us', href: '/contact' },
  ]

  const searchResults = searchQuery 
    ? [...navLinks, { label: 'CCTV Solutions', href: '/solutions#cctv' }, { label: 'Bus Wi-Fi', href: '/products#wifi' }]
        .filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : []

  return (
    <header className="fixed top-6 left-0 right-0 z-50 px-4 md:px-8">
      <nav className="mx-auto max-w-7xl bg-aero-surface rounded-2xl px-6 py-4 flex items-center justify-between shadow-2xl transition-all duration-300">
        {/* Left: Logo - Hovering Circle Style */}
        <div className="flex-shrink-0 -my-10 relative z-20">
          <Link 
            href="/" 
            className="flex items-center justify-center bg-midnight-deep rounded-full w-20 h-20 md:w-24 md:h-24 shadow-[0_10px_40px_rgba(0,0,0,0.6)] border-2 border-white/5 group transition-all duration-500 hover:border-netcare-red/30 hover:shadow-netcare-red/10"
          >
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <Image
                src={logoUrl || "/logo.png"}
                alt={logoAlt || "Netcare Nepal"}
                width={200}
                height={100}
                className="h-auto w-full object-contain transition-transform duration-500 group-hover:scale-110"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden lg:flex items-center space-x-10 text-sm font-medium tracking-wide">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-netcare-red transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Utility Icons */}
        <div className="flex items-center space-x-3 md:space-x-4 relative z-30">
          <div className="relative flex items-center pointer-events-auto">
            <motion.div 
              initial={false}
              animate={{ width: isSearchOpen ? (typeof window !== 'undefined' && window.innerWidth < 768 ? '140px' : '220px') : '40px' }}
              className="flex items-center bg-white/10 md:bg-white/5 border border-white/10 rounded-full overflow-hidden transition-all duration-500 shadow-lg"
            >
              <button 
                onClick={() => {
                  if (isSearchOpen && searchQuery) {
                    // Trigger search action if needed
                  }
                  setIsSearchOpen(!isSearchOpen);
                }}
                className="p-2.5 hover:bg-white/10 rounded-full transition-all text-mist-white shrink-0 cursor-pointer touch-manipulation"
              >
                <Search size={18} />
              </button>
              <input 
                type="text"
                placeholder="Search..."
                className={`bg-transparent text-xs text-white placeholder:text-white/30 focus:outline-none w-full transition-opacity duration-300 ${isSearchOpen ? 'opacity-100 px-2' : 'opacity-0 w-0'}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => !searchQuery && setIsSearchOpen(false)}
              />
            </motion.div>

            {/* In-Header Search Results Dropdown */}
            <AnimatePresence>
              {isSearchOpen && searchQuery && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-14 right-0 w-64 md:w-80 bg-midnight-deep/98 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-[60] p-2"
                >
                  <div className="max-h-60 overflow-y-auto scrollbar-hide">
                    {searchResults.length > 0 ? (
                      searchResults.map((result, i) => (
                        <Link 
                          key={i}
                          href={result.href}
                          onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                          className="flex items-center gap-3 p-3 hover:bg-netcare-red rounded-xl group transition-all cursor-pointer"
                        >
                          <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20">
                            <Search size={14} className="text-white/60 group-hover:text-white" />
                          </div>
                          <span className="text-[11px] font-bold text-white uppercase tracking-wider">{result.label}</span>
                        </Link>
                      ))
                    ) : (
                      <div className="p-4 text-center">
                        <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">No Matches</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            className="lg:hidden p-2.5 hover:bg-white/10 rounded-full transition-all text-mist-white pointer-events-auto cursor-pointer touch-manipulation"
            onClick={(e) => {
              e.stopPropagation();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
          >
            <Menu size={22} />
          </button>
          <div className="hidden lg:block h-6 w-px bg-white/10 mx-1" />
          <Link
            href="tel:9802900818"
            className="hidden lg:block bg-netcare-red text-white hover:bg-red-800 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all transform hover:scale-105 cursor-pointer"
          >
            Get Help
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-midnight-deep/95 flex flex-col items-center justify-center space-y-8 lg:hidden animate-in fade-in duration-300">
          <button
            className="absolute top-10 right-10 text-mist-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={32} />
          </button>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-bold hover:text-netcare-red transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="tel:9802900818"
            className="bg-netcare-red text-white px-8 py-3 rounded-full text-lg font-bold uppercase tracking-widest mt-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Get Help
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header
