import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'shortDescription'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Service Title',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      label: 'Short Description',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Full Service Content',
    },
    {
      name: 'mainImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Main Showcase Image',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Trust & Review Gallery',
      labels: {
        singular: 'Gallery Image',
        plural: 'Gallery Images',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
