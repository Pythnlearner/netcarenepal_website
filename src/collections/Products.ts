import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'badge', 'basePrice'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Product Name',
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline (e.g., Most Reliable Wi-Fi)',
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      label: 'Detailed Description',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Key Features',
      labels: {
        singular: 'Feature',
        plural: 'Features',
      },
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'tag',
      type: 'text',
      label: 'Badge Tag (e.g., Coming Soon, New)',
    },
    {
      name: 'isComingSoon',
      type: 'checkbox',
      label: 'Is Coming Soon?',
      defaultValue: false,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Product Showcase Image',
    },
    {
      name: 'basePrice',
      type: 'number',
      label: 'Starting Price (Monthly/One-time)',
    },
  ],
}
