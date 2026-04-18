import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Pages } from './collections/Pages'
import { Services } from './collections/Services'
import { Media } from './collections/Media'
import { Products } from './collections/Products'
import { Leads } from './collections/Leads'
import { Subscribers } from './collections/Subscribers'
import { CompanyInfo } from './globals/CompanyInfo'
import { CompanySettings } from './globals/CompanySettings'
import { AboutUs } from './globals/AboutUs'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    theme: 'light',
    css: path.resolve(dirname, 'app/(payload)/custom.css'),
    components: {
      graphics: {
        Logo: '@/components/admin/Logo#Logo',
        Icon: '@/components/admin/Icon#Icon',
      },
      views: {
        login: {
          Component: '@/components/admin/CustomLogin#CustomLogin',
        },
      },
    },
  },
  // Ensure all collections are registered and visible
  collections: [
    Users,
    Pages,
    Media,
    Services,
    Products,
    Leads,
    Subscribers
  ],
  globals: [CompanyInfo, CompanySettings, AboutUs],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
})
