import React from 'react'
import Image from 'next/image'

export const Logo = () => {
  return (
    <div className="admin-logo">
      <img 
        src="/logo.png" 
        alt="Netcare Nepal" 
        style={{ 
          height: '50px',
          width: 'auto',
          display: 'block'
        }} 
      />
    </div>
  )
}
