import type { GlobalConfig } from 'payload'

export const CompanySettings: GlobalConfig = {
  slug: 'company-settings',
  access: {
    read: () => true,
  },
  label: 'Company Settings',
  fields: [
    {
      name: 'companyName',
      type: 'text',
      required: true,
      defaultValue: 'Netcare Nepal',
    },
    {
      name: 'headOffice',
      type: 'text',
      required: true,
      defaultValue: 'Tokha, Kathmandu',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'hotline1',
          type: 'text',
          required: true,
          defaultValue: '+977 9802900818',
          admin: { width: '50%' },
        },
        {
          name: 'hotline2',
          type: 'text',
          required: true,
          defaultValue: '+977 9802900819',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      defaultValue: 'netcarenepal@gmail.com',
    },
    {
      name: 'aboutFooter',
      type: 'textarea',
      label: 'About Netcare (Footer)',
      required: true,
      defaultValue: "For over a decade, Netcare Nepal has been at the forefront of transport technology, providing enterprise-grade connectivity and security solutions across the Himalayas. We are dedicated to safer travel and continuous connectivity through innovation and reliability.",
    },
  ],
}
