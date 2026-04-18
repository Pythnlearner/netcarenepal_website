import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import LetsConnectGrid from '@/components/contact/LetsConnectGrid'
import HotlineBanner from '@/components/contact/HotlineBanner'
import ContactQuoteForm from '@/components/contact/ContactQuoteForm'
import OfficesList from '@/components/contact/OfficesList'

export const metadata = {
  title: 'Contact Us | Netcare Nepal',
  description: 'Get in touch with Netcare Nepal for your B2B technical support, sales inquiries, and installations.',
}

export default async function ContactPage() {
  const payload = await getPayload({ config })
  
  let page = null
  try {
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'contact' } },
    })
    page = result.docs?.[0] || null
  } catch (error) {
    console.error("Failed to fetch contact data:", error)
  }

  if (page?.layout && page.layout.length > 0) {
    return (
      <main className="py-24 space-y-32">
        {page.layout.map((block: Record<string, unknown>, index: number) => {
          switch (block.blockType) {
            case 'letsConnect':
              return <LetsConnectGrid key={index} title={block.title as string} />;
            case 'hotlineBanner':
              return <HotlineBanner key={index} phone={block.phone as string} email={block.email as string} />;
            case 'contactForm':
              return <ContactQuoteForm key={index} title={block.title as string} />;
            case 'officesList':
              return <OfficesList key={index} offices={block.offices as any[]} />;
            default:
              return null;
          }
        })}
      </main>
    );
  }

  return (
    <main className="py-24 space-y-32">
      <LetsConnectGrid />
      <HotlineBanner />
      <ContactQuoteForm />
      <OfficesList />
    </main>
  )
}
