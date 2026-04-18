import Hero from "@/components/Hero";
import ValueProps from "@/components/ValueProps";
import ServiceFeature from "@/components/ServiceFeature";
import ProductShowcase from "@/components/ProductShowcase";
import VideoBanner from "@/components/VideoBanner";
import AppFeatures from "@/components/AppFeatures";
import SocialProof from "@/components/SocialProof";
import TabbedProducts from "@/components/TabbedProducts";
import ResponseAndQuote from "@/components/ResponseAndQuote";
import FAQ from "@/components/FAQ";


import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function Home() {
  const payload = await getPayload({ config })

  // Fetch dynamic page data from Payload CMS
  let page = null
  try {
    const result = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'home',
        },
      },
    })
    page = result.docs?.[0] || null
  } catch (error) {
    console.error("Failed to fetch homepage data:", error)
  }

  // If page exists in CMS and has layout blocks, render them dynamically
  if (page?.layout && page.layout.length > 0) {
    return (
      <main className="relative">
        {page.layout.map((block: Record<string, unknown>, index: number) => {
          switch (block.blockType) {
            case 'hero':
              return (
                <Hero
                  key={index}
                  overline={block.overline as string}
                  headline={block.headline as string}
                  buttonText={block.buttonText as string}
                  carousel={block.carousel as any[]}
                />
              );
            case 'stats':
              return (
                <ValueProps
                  key={index}
                  headline={block.headline as string}
                  subheadline={block.subheadline as string}
                  cards={block.cards as any[]}
                />
              );
            case 'serviceFeature':
              return (
                <ServiceFeature
                  key={index}
                  headline={block.headline as string}
                  subheadline={block.subheadline as string}
                  buttonText={block.buttonText as string}
                  benefits={(block.benefits as any[])?.map(b => b.text) || undefined}
                />
              );
            case 'productShowcase':
              return <ProductShowcase key={index} />;
            case 'videoBanner':
              return <VideoBanner key={index} />;
            case 'appFeatures':
              return (
                <AppFeatures
                  key={index}
                  headline={block.headline as string}
                  description={block.description as string}
                  buttonText={block.buttonText as string}
                  features={block.features as any[]}
                />
              );
            case 'socialProof':
              return (
                <SocialProof
                  key={index}
                  title={block.title as string}
                  visionText={block.visionText as string}
                  establishedDate={block.establishedDate as string}
                  partners={(block.partners as any[])?.map(p => p.name) || undefined}
                  testimonials={block.testimonials as any[]}
                  founders={block.founders as any[]}
                />
              );
            case 'tabbedProducts':
              return (
                <TabbedProducts
                  key={index}
                  badge={block.badge as string}
                  headline={block.headline as string}
                  description={block.description as string}
                  categories={block.categories as any[]}
                />
              );
            case 'responseAndQuote':
              return <ResponseAndQuote key={index} />;
            case 'faq':
              return (
                <FAQ
                  key={index}
                  headline={block.headline as string}
                  subheadline={block.subheadline as string}
                  questions={block.questions as any[]}
                />
              );
            default:
              return null;
          }
        })}
      </main>
    );
  }

  // Fallback to static high-fidelity layout if CMS is not yet populated
  return (
    <main className="relative">
      {/* 1. Hero Section */}
      <Hero
        overline="Accurate, Secure, Efficient"
        headline="Netcare Smart Solutions"
        buttonText="Get Quotes Now!"
      />

      {/* 2. Value Proposition Section */}
      <ValueProps />

      {/* 3. Service Feature */}
      <ServiceFeature />

      {/* 4. Product Showcase */}
      <ProductShowcase />

      {/* 5. Video Banner */}
      <VideoBanner />

      {/* 6. App Features */}
      <AppFeatures />

      {/* 7. Social Proof */}
      <SocialProof />

      {/* 8. Tabbed Products Showcase */}
      <TabbedProducts />

      {/* 9. Threat Response & Quote Form */}
      <ResponseAndQuote />

      {/* 10. FAQ Section */}
      <FAQ />
    </main>
  );
}
