import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import SolutionsCalculator from '@/components/solutions/SolutionsCalculator'

export const metadata = {
  title: 'Solutions Calculator | Netcare Nepal',
  description: 'Configure your fleet\'s connectivity and security needs in real-time.',
}

export default async function SolutionsPage() {
  const payload = await getPayload({ config })
  
  // Fetch page layout from Payload CMS
  let page = null
  try {
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'solutions' } },
    })
    page = result.docs?.[0] || null
  } catch (error) {
    console.error("Failed to fetch solutions page data:", error)
  }

  if (page?.layout && page.layout.length > 0) {
    return (
      <React.Fragment>
        {page.layout.map((block: Record<string, unknown>, index: number) => {
          switch (block.blockType) {
            case 'solutionsCalculator':
              return <SolutionsCalculator 
                       key={index} 
                       headline={block.headline as string} 
                       description={block.description as string} 
                       fleetModeLabel={block.fleetModeLabel as string}
                       pocketModeLabel={block.pocketModeLabel as string}
                       buttonText={block.buttonText as string}
                       cctvUnitPrice={block.cctvUnitPrice as number}
                       newInstallation={block.newInstallation as any}
                       renewal={block.renewal as any}
                       pocketDeposit={block.pocketDeposit as number}
                       price7={block.price7 as number}
                       price15={block.price15 as number}
                       price30={block.price30 as number}
                     />;
            default:
              return null;
          }
        })}
      </React.Fragment>
    );
  }

  return (
    <SolutionsCalculator />
  )
}
