import React from 'react'

export const Icon = () => {
  return (
    <div className="admin-icon">
      <img 
        src="/logo.png" 
        alt="Netcare Icon" 
        style={{ 
          height: '24px',
          width: '24px',
          objectFit: 'contain'
        }} 
      />
    </div>
  )
}
