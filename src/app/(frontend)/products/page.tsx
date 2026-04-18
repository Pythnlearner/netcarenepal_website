import TechShowcase from '@/components/products/TechShowcase'
import FleetStackPackages from '@/components/products/FleetStackPackages'
import RealisticProductSection from '@/components/products/RealisticProductSection'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const metadata = {
  title: 'Our Products | Netcare Nepal',
  description: 'Explore enterprise-grade bus Wi-Fi, mobile CCTV, and GPS fleet tracking solutions by Netcare Nepal.',
}

export default async function ProductsPage() {
  const payload = await getPayload({ config })
  
  // Fetch standalone products from Payload CMS
  const productsData = await payload.find({
    collection: 'products',
    limit: 100,
    sort: 'name',
  })

  // Fetch page layout from Payload CMS
  let page = null
  try {
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'products' } },
    })
    page = result.docs?.[0] || null
  } catch (error) {
    console.error("Failed to fetch products page data:", error)
  }

  if (page?.layout && page.layout.length > 0) {
    return (
      <main className="space-y-4">
        {page.layout.map((block: Record<string, any>, index: number) => {
          switch (block.blockType) {
            case 'techShowcase':
              return (
        <TechShowcase 
          key={index} 
          overline={block.overline as string}
          title={block.title as string} 
          products={productsData.docs.length > 0 ? productsData.docs : undefined} 
        />
      );
    case 'fleetStack':
      return (
        <FleetStackPackages 
          key={index} 
          overline={block.overline as string}
          title={block.title as string}
          packages={block.packages as any[]} 
        />
      );
    case 'realisticProductSection':
      return (
        <RealisticProductSection 
          key={index}
          {...block}
          serviceType={block.serviceType as any}
        />
      );
    default:
      return null;
  }
})}
</main>
);
}

return (
<main className="space-y-4">
{/* 1. Wi-Fi Solution */}
<RealisticProductSection 
theme="redish"
imageSide="right"
headlineEn="Smart Bus Wi-Fi: Dual SIM Seamless Edge"
headlineNp="बस वाइफाइ: सिम र डिजिटल कनेक्टिभिटीको उत्कृष्ट समाधान"
subheadlineEn="Enterprise-grade 4G/5G mobile routers with dual-SIM failover for uninterrupted passenger connectivity across high-altitude trails and highways."
subheadlineNp="नेटकेयर नेपालले तपाईंको बसमा केवल डिभाइस जडान मात्र गर्दैन — हामी दिन्छौं पूर्ण स्मार्ट समाधान।"
featuresEn={[{ feature: 'Dual SIM Auto-Failover' }, { feature: 'Bandwidth Management' }, { feature: 'Captive Portal Login' }, { feature: '24/7 Remote Monitoring' }]}
featuresNp={[{ feature: 'ड्युअल सिम सपोर्ट' }, { feature: 'ब्यान्डविथ व्यवस्थापन' }, { feature: 'सजिलो लगइन' }, { feature: 'रिमोट निगरानी' }]}
image="/media/BUS WIFI.png"
formTitle="Get Wi-Fi Installation Quote"
serviceType="wifi_only"
/>

{/* 2. CCTV Solution */}
<RealisticProductSection 
theme="navy"
imageSide="left"
headlineEn="EZVIZ H1c: Smart Transit Security"
headlineNp="EZVIZ H1c: सुरक्षामा कहिल्यै सम्झौता नगर्नुहोस्"
subheadlineEn="FHD 1080p resolution with 108° wide-angle lens and night vision. Professional-grade security tailored for public transport environments."
subheadlineNp="हाम्रो सीसीटीभी प्रणालीले तपाईंको बसलाई चौबीसै घण्टा सुरक्षित राख्छ।"
featuresEn={[{ feature: 'Full HD 1080p Video' }, { feature: 'Two-Way Audio Talk' }, { feature: '10m IR Night Vision' }, { feature: 'Motion Detection Alerts' }]}
featuresNp={[{ feature: 'फुल एचडी भिडियो' }, { feature: 'दुई-तर्फी अडियो' }, { feature: 'नाइट भिजन' }, { feature: 'मोसन डिटेक्सन' }]}
image="/media/CCTV H1C.png"
formTitle="Secure Your Fleet Now"
serviceType="wifi_camera"
/>

{/* 3. GPS Solution */}
<RealisticProductSection 
theme="grey"
imageSide="right"
headlineEn="TrackOn GPS: Nepal Certified Fleet Tracking"
headlineNp="TrackOn GPS: ईन्धन बचत र १००% वास्तविक ट्र्याकिङ"
subheadlineEn="Save up to 20% on fuel costs annually. Real-time positioning, route history, and certified compliance with Nepal transport regulations."
subheadlineNp="आफ्नो बसको अवस्था र लोकेसन जुनसुकै बेला मोबाइलबाटै हेर्नुहोस्।"
featuresEn={[{ feature: 'Live GPS Tracking' }, { feature: 'Fuel Optimization' }, { feature: 'Route Playback' }, { feature: 'Overspeeding Alerts' }]}
featuresNp={[{ feature: 'लाइभ ट्र्याकिङ' }, { feature: 'इन्धन खपत रिपोर्ट' }, { feature: 'रुट हिस्ट्री' }, { feature: 'गती अलर्ट' }]}
image="/media/trackon.png"
formTitle="Get GPS Offer"
serviceType="wifi_camera_gps"
/>
    </main>
  )
}

