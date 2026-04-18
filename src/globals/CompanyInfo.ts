import type { GlobalConfig } from 'payload'

export const CompanyInfo: GlobalConfig = {
  slug: 'company-info',
  access: { read: () => true },
  label: 'Company Info',
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'phone',
          type: 'text',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Twitter', value: 'twitter' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Instagram', value: 'instagram' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
        },
      ],
    },
  ],
}
