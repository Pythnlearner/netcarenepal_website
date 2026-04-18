import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  access: {
    delete: () => false,
    update: () => false,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
