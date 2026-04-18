import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: { read: () => true },
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 400,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: null,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: null,
        position: 'centre',
      },
    ],
    formatOptions: {
      format: 'webp',
      options: {
        quality: 80,
      },
    },
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
