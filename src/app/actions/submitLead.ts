'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'

export async function submitLead(formData: FormData) {
  const payload = await getPayload({ config })
  
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const message = formData.get('message') as string
  const subject = formData.get('subject') as string
  const formType = (formData.get('formType') as string) || subject || 'New Website Inquiry'
  
  // New Fields
  const vehicleType = formData.get('vehicleType') as string
  const vehicleNumber = formData.get('vehicleNumber') as string
  const requiredService = formData.get('requiredService') as string
  const numberOfCameras = formData.get('numberOfCameras') ? Number(formData.get('numberOfCameras')) : undefined

  try {
    console.log('Attempting to create lead for:', email)
    const newLead = await payload.create({
      collection: 'leads',
      data: {
        name,
        email,
        phone: phone || '',
        vehicleType: (vehicleType as any) || 'BUS', // fallback
        vehicleNumber: vehicleNumber || 'N/A',
        requiredService: (requiredService as any) || 'wifi_only',
        numberOfCameras,
        formType,
        message: message || '',
        status: 'new',
      },
    })
    
    console.log('Lead created successfully:', newLead.id)
    
    return { 
      success: true, 
      redirect: `mailto:netcarenepal@gmail.com?subject=Inquiry from ${name}&body=From: ${name}%0D%0AEmail: ${email}%0D%0AMessage: ${message}` 
    }
  } catch (error: any) {
    console.error('CRITICAL: Lead submission failed:', error?.message || error)
    return { success: false, error: error?.message || 'Failed to submit request. Please try again.' }
  }
}
