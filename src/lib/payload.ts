import { getPayload } from 'payload'
import config from '@/payload.config'

export interface Media {
  id: string
  url: string
  alt: string
}

export interface CompanyInfo {
  logo: Media
  email: string
  phone: string
  socialLinks?: Array<{
    platform: string
    url: string
    id?: string
  }>
}

export interface Service {
  id: string
  name: string
  icon: Media
  shortDescription: string
  fullDetails: any
}

export interface Page {
  id: string
  title: string
  slug: string
  layout: any
  metaTitle?: string
  metaDescription?: string
}

export interface CompanySettings {
  companyName: string
  headOffice: string
  hotline1: string
  hotline2: string
  email: string
  aboutFooter: string
}

/**
 * Helper to fetch data from the Payload REST API
 */
async function fetchPayload<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${NEXT_PUBLIC_SERVER_URL}/api/${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 3600 }, // Cache for 1 hour
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch from Payload: ${res.statusText}`)
  }

  return res.json()
}

/**
 * Fetches the Global company data (logo, phone, email)
 */
export async function getCompanyInfo(): Promise<CompanyInfo> {
  const payload = await getPayload({ config })
  const info = await payload.findGlobal({
    slug: 'company-info',
  })
  return info as unknown as CompanyInfo
}

/**
 * Fetches the Global company settings
 */
export async function getCompanySettings(): Promise<CompanySettings> {
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({
    slug: 'company-settings',
  })
  return settings as unknown as CompanySettings
}

/**
 * Fetches a specific page by its slug
 */
export async function getPage(slug: string): Promise<Page | null> {
  const payload = await getPayload({ config })
  const data = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })
  return (data.docs?.[0] as unknown as Page) || null
}

/**
 * Fetches all active services
 */
export async function getServices(): Promise<Service[]> {
  const payload = await getPayload({ config })
  const data = await payload.find({
    collection: 'services',
    limit: 100,
  })
  return data.docs as unknown as Service[]
}
