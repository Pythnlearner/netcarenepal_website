import type { CollectionConfig } from 'payload'
import { Resend } from 'resend'

const getResend = () => {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_your_api_key_here') {
    return null
  }
  return new Resend(process.env.RESEND_API_KEY)
}

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'formType', 'email', 'createdAt'],
  },
  access: {
    create: () => true, // Anyone can submit a lead
    read: ({ req: { user } }) => !!user, // Only authenticated users
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        if (operation === 'create') {
          const resend = getResend()
          
          try {
            if (resend) {
              // 1. Internal Sales Alert (Resend)
              await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: 'netcarenepal@gmail.com',
                subject: `🚨 New Lead: ${doc.name} - ${doc.formType}`,
                html: `
                  <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #d32f2f; margin-bottom: 20px;">New Website Lead Received</h2>
                    
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                      <p style="margin: 5px 0;"><strong>Customer:</strong> ${doc.name}</p>
                      <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${doc.email}">${doc.email}</a></p>
                      <p style="margin: 5px 0;"><strong>Phone:</strong> ${doc.phone || 'N/A'}</p>
                    </div>

                    <h3 style="color: #444; border-bottom: 1px solid #eee; padding-bottom: 5px;">Requirement Details</h3>
                    <div style="padding: 10px 0;">
                      <p style="margin: 5px 0;"><strong>Inquiry Type:</strong> ${doc.formType}</p>
                      <p style="margin: 5px 0;"><strong>Vehicle Type:</strong> ${doc.vehicleType}</p>
                      <p style="margin: 5px 0;"><strong>Vehicle Number:</strong> ${doc.vehicleNumber}</p>
                      <p style="margin: 5px 0;"><strong>Requested Service:</strong> ${doc.requiredService.replace('_', ' ').toUpperCase()}</p>
                      ${doc.numberOfCameras ? `<p style="margin: 5px 0;"><strong>Number of Cameras:</strong> ${doc.numberOfCameras}</p>` : ''}
                    </div>

                    <h3 style="color: #444; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 20px;">User Message</h3>
                    <blockquote style="background: #fffcf0; padding: 15px; border-left: 4px solid #fbc02d; margin: 10px 0;">
                      ${doc.message || '<em style="color: #999;">No additional message provided.</em>'}
                    </blockquote>
                    
                    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
                    <p style="font-size: 12px; color: #999; text-align: center;">This is an automated notification from your Netcare Nepal CMS.</p>
                  </div>
                `,
              })

              // 2. Customer Auto-Reply (Resend)
              await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: doc.email,
                subject: 'Thank you for contacting Netcare Nepal!',
                html: `
                  <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #007AB8;">Hello ${doc.name},</h2>
                    <p>Thank you for reaching out to **Netcare Nepal**. We have received your inquiry for <strong>${doc.requiredService.replace('_', ' ').toUpperCase()}</strong>.</p>
                    
                    <div style="background: #f0f7ff; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #007AB8;">
                      <p style="margin: 5px 0;"><strong>Your Vehicle:</strong> ${doc.vehicleType} (${doc.vehicleNumber})</p>
                      <p style="margin: 5px 0;"><strong>Service Selected:</strong> ${doc.requiredService.replace('_', ' ').toUpperCase()}</p>
                      ${doc.numberOfCameras ? `<p style="margin: 5px 0;"><strong>Planned Cameras:</strong> ${doc.numberOfCameras}</p>` : ''}
                    </div>

                    <p>Our technical team is reviewing your fleet requirements and will prepare a customized proposal for you within 24 hours.</p>
                    
                    <p>If you have urgent questions, please feel free to call our hotline directly.</p>
                    
                    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
                    <p><strong>Netcare Nepal</strong></p>
                    <p>📞 +977 980290818</p>
                    <p>📍 Tokha, Kathmandu</p>
                  </div>
                `,
              })
            } else {
              console.warn('⚠️ Resend API Key is missing. Lead notifications were NOT sent via email.')
            }

            // 3. Slack Notification (Fetch API)
            if (process.env.SLACK_WEBHOOK_URL && process.env.SLACK_WEBHOOK_URL !== 'https://hooks.slack.com/services/YOUR/WEBHOOK/URL') {
              await fetch(process.env.SLACK_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  text: `🚀 *New Lead Captured*\n*Name:* ${doc.name}\n*Inquiry:* ${doc.formType}\n*Phone:* ${doc.phone || 'N/A'}\n*Email:* ${doc.email}`,
                }),
              })
            }
          } catch (error) {
            console.error('Error in Lead afterChange hook:', error)
          }
        }
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
      validate: (val: string) => {
        if (!val || val.length < 3) return 'Full Name must be at least 3 characters long.'
        if (val.length > 50) return 'Full Name cannot exceed 50 characters.'
        if (/[0-9]/.test(val)) return 'Names should not contain numbers.'
        return true
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email Address',
      validate: (val: string) => {
        if (!val || !val.includes('@')) return 'Please provide a valid business email.'
        if (val.length > 60) return 'Email address is too long (Max 60 chars).'
        return true
      },
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
      required: true,
      validate: (val: string) => {
        if (!val || !/^\d{10}$/.test(val)) return 'Phone number must be exactly 10 digits.'
        return true
      },
    },
    {
      name: 'vehicleType',
      type: 'select',
      required: true,
      options: [
        { label: 'Bus', value: 'BUS' },
        { label: 'Van', value: 'VAN' },
        { label: 'Car', value: 'CAR' },
        { label: 'Hiace', value: 'HIACE' },
      ],
    },
    {
      name: 'vehicleNumber',
      type: 'text',
      required: true,
      validate: (val: string) => {
        if (!val || val.length < 4) return 'Please enter a valid vehicle plate number.'
        if (val.length > 20) return 'Vehicle Number is too long (Max 20 chars).'
        return true
      },
    },
    {
      name: 'requiredService',
      type: 'select',
      required: true,
      options: [
        { label: 'WIFI Only', value: 'wifi_only' },
        { label: 'WIFI + CAMERA', value: 'wifi_camera' },
        { label: 'WIFI + CAMERA + GPS', value: 'wifi_camera_gps' },
      ],
    },
    {
      name: 'numberOfCameras',
      type: 'number',
      admin: {
        condition: (data) => ['wifi_camera', 'wifi_camera_gps'].includes(data.requiredService),
      },
    },
    {
      name: 'formType',
      type: 'text',
      required: true,
      label: 'Form/Inquiry Type',
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Message/Inquiry Details',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Qualified', value: 'qualified' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
