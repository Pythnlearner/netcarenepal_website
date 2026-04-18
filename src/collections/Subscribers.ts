import { CollectionConfig } from 'payload'
import { Resend } from 'resend'

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'status', 'createdAt'],
  },
  access: {
    create: () => true, // Anyone can subscribe
    read: ({ req: { user } }) => !!user, // Admins only
    update: ({ req: { user } }) => !!user, // Admins only
    delete: ({ req: { user } }) => !!user, // Admins only
  },
  hooks: {
    afterChange: [
      ({ doc, operation }) => {
        if (operation === 'create') {
          const resend = new Resend(process.env.RESEND_API_KEY)
          
          // Send email in the background without awaiting
          // This prevents network errors (like ECONNREFUSED) from crashing the request
          resend.emails.send({
            from: 'Netcare Nepal <onboarding@resend.dev>',
            to: doc.email,
            subject: 'Welcome to Netcare Nepal Insights!',
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #020b1a;">
                <div style="background-color: #020b1a; padding: 40px; text-align: center; border-radius: 12px 12px 0 0;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px;">NETCARE NEPAL</h1>
                </div>
                <div style="padding: 40px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
                  <h2 style="font-size: 20px; font-weight: 800; margin-bottom: 24px;">Welcome to the Inner Circle!</h2>
                  <p style="line-height: 1.6; color: #4b5563;">Thank you for joining <strong>500+ enterprises</strong> receiving our weekly fleet intelligence and connectivity updates.</p>
                  <p style="line-height: 1.6; color: #4b5563;">You are now part of a community dedicated to pioneering Nepal's digital infrastructure. Stay tuned for expert insights on:</p>
                  <ul style="color: #4b5563; line-height: 1.8;">
                    <li>Advanced Fleet Telemetry</li>
                    <li>Smart Security & CCTV 360</li>
                    <li>High-Speed Transit Connectivity</li>
                    <li>Custom Software Innovation</li>
                  </ul>
                  <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #f3f4f6; text-align: center;">
                    <p style="font-size: 14px; color: #9ca3af;">&copy; 2024 Netcare Nepal Pvt. Ltd. | Tokha, Kathmandu</p>
                  </div>
                </div>
              </div>
            `,
          }).then(() => {
            console.log('Newsletter Welcome Email dispatched successfully to:', doc.email)
          }).catch((err) => {
            console.error('Newsletter Email Background Failure:', err)
          })
        }
      },
    ],
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      validate: async (val, { payload, operation }) => {
        // Basic format check
        if (!val || !val.includes('@') || !val.includes('.')) {
          return 'Please enter a valid business email address.'
        }
        if (val.length < 5) {
          return 'Email address is too short.'
        }

        // Deduplication Check: ONLY on create
        if (operation === 'create') {
          const existing = await payload.find({
            collection: 'subscribers',
            where: { email: { equals: val } },
          })
          if (existing.totalDocs > 0) {
            return 'You are already subscribed! :)'
          }
        }
        
        return true
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Unsubscribed', value: 'unsubscribed' },
      ],
      defaultValue: 'active',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
