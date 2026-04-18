import { getPayload } from 'payload'
import config from '../src/payload.config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Simple .env loader
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const envPath = path.resolve(__dirname, '../.env')

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8')
  envContent.split('\n').forEach(line => {
    const [key, ...value] = line.split('=')
    if (key && value) {
      process.env[key.trim()] = value.join('=').trim()
    }
  })
}

async function seed() {
  console.log('--- Starting CMS Seeding ---')
  const payload = await getPayload({ config })

  // 1. Seed Media
  console.log('Seeding Media...')
  const mediaDir = path.resolve(__dirname, '../media')
  const mediaFiles = fs.readdirSync(mediaDir).filter(f => !f.includes('-')) // filter out auto-generated sizes if they follow naming convention
  
  const mediaMap: Record<string, string> = {}

  for (const file of mediaFiles) {
    const filePath = path.join(mediaDir, file)
    const stats = fs.statSync(filePath)
    if (stats.isDirectory()) continue

    try {
      // Check if already exists
      const existing = await payload.find({
        collection: 'media',
        where: {
          filename: { equals: file }
        }
      })

      if (existing.totalDocs > 0) {
        console.log(`Media exists: ${file}`)
        mediaMap[file] = existing.docs[0].id as string
      } else {
        console.log(`Uploading media: ${file}`)
        const mediaDoc = await payload.create({
          collection: 'media',
          data: {
            alt: `Image for ${file.split('.')[0]}`
          },
          file: {
            data: fs.readFileSync(filePath),
            name: file,
            mimetype: file.endsWith('.png') ? 'image/png' : 'image/jpeg',
            size: stats.size,
          }
        })
        mediaMap[file] = mediaDoc.id as string
      }
    } catch (e: any) {
      console.error(`Failed to process media ${file}:`, e.message)
    }
  }

  // 2. Map representative images (Theme-aware)
  const fallbackImg = mediaMap['connection.jpeg'] || Object.values(mediaMap)[0]
  const cctvImg = mediaMap['dd004de2-eb5a-4bf7-8ecc-4b4df433580f.jpg'] || fallbackImg
  const wifiImg = mediaMap['905ab6f6-364d-430d-bd59-55c669473900.jpg'] || fallbackImg
  const techImg = mediaMap['7699193b-b4bd-4105-9def-24b71049d543.jpg'] || fallbackImg

  // 3. Seed Pages
  console.log('Seeding Pages...')
  const pages = [
    {
      title: 'Home',
      slug: 'home',
      layout: [
        { blockType: 'hero' },
        {
          blockType: 'stats',
          headline: 'SEAMLESS CONNECTIVITY, STRONGER JOURNEYS.',
          subheadline: 'यात्रुलाई हाई-स्पीड इन्टरनेट र बसधनीलाई पूर्ण नियन्त्रण। NETCARE NEPAL तपाईको भरपर्दो प्रविधि साझेदार।',
          cards: [
            { icon: 'Gauge', title: 'थप आम्दानीको अवसर (प्रिमियम सेवा)', description: 'हाई-स्पीड इन्टरनेट प्याकेज मार्फत थप आम्दानीको नयाँ स्रोत।' },
            { icon: 'Wifi', title: 'बसभित्र इन्टरनेट प्रयोगको पूर्ण नियन्त्रण', description: 'प्रयोगकर्ता र डेटा खपतको पूर्ण व्यवस्थापन र निगरानी।' },
            { icon: 'ShieldCheck', title: 'आधुनिक र प्रतिस्पर्धी सेवा', description: 'बजारमा आफ्नो बस सेवालाई प्रविधिमैत्री र अग्रपङ्क्तिमा राख्नुहोस्।' },
            { icon: 'Headset', title: 'यात्रु सन्तुष्टि र पुनः यात्रा गर्ने सम्भावना', description: 'उत्कृष्ट इन्टरनेट सुविधाले यात्रुलाई सन्तुष्ट र वफादार बनाउँछ।' },
          ]
        },
        {
          blockType: 'serviceFeature',
          headline: 'Smart Technology for Modern Bus Service 🚍',
          subheadline: 'हाम्रो **complete smart solution** ले तपाईंको बस सेवालाई विश्वसनीय, आधुनिक र नाफामूलक बनाउँछ।',
          buttonText: 'Learn More',
          image: mediaMap['smart_bus_tech_vertical.png'] || fallbackImg,
          benefits: [
            { text: 'Real-Time Monitoring: कुनै पनि समय, जहाँबाट पनि बस र डेटा खपतको प्रत्यक्ष निगरानी।' },
            { text: 'Fleet Management: सबै बसहरू एकै ड्यासबोर्डबाट सहज र प्रभावकारी व्यवस्थापन।' },
            { text: '24/7 Support: सेवा निरन्तर राख्न हाम्रो प्राविधिक टोली सधैं तयार।' },
            { text: 'High-Speed WiFi: प्रत्येक रुटमा यात्रुहरूका लागि तीव्र र स्थिर इन्टरनेट सुविधा।' },
          ]
        },
        { blockType: 'productShowcase' },
        { blockType: 'videoBanner' },
        { blockType: 'appFeatures' },
        {
          blockType: 'socialProof',
          title: 'Trusted by Industry Leaders',
          partners: [
            { name: 'Everest Fleet' },
            { name: 'Himalayan Bus Line' },
            { name: 'Nepal Telecom' },
            { name: 'SafeCity Initiative' },
            { name: 'Global Link' },
            { name: 'Yatayat Plus' }
          ],
          testimonial: {
            quote: 'Netcare Nepal solved our connectivity problems during high-altitude routes. Our passengers are happier, and our fleet tracking is finally seamless.',
            authorName: 'Rajesh Shrestha',
            authorRole: 'CEO, Himalayan Bus Lines',
            authorAvatar: fallbackImg
          },
          founders: [
            {
              name: 'Suman Thapa',
              role: 'Co-Founder / CTO',
              bio: "Dedicated to bringing robust networking and security infrastructure to the heart of Nepal's transport industry.",
              image: techImg
            },
            {
              name: 'Anish Gurung',
              role: 'Co-Founder / COO',
              bio: "Dedicated to bringing robust networking and security infrastructure to the heart of Nepal's transport industry.",
              image: wifiImg
            }
          ]
        },
        {
          blockType: 'tabbedProducts',
          badge: 'KEY FEATURES',
          headline: 'Discover Which Security Cameras\nWork Best For Your Home',
          categories: [
            { name: 'Poe Ip Cameras & Nvrs', image: cctvImg },
            { name: 'Wifi Security Cameras', image: wifiImg },
            { name: 'DualLens Security Cameras', image: techImg },
            { name: 'Battery Cameras', image: fallbackImg },
            { name: 'Video Doorbells', image: techImg },
            { name: '4G Battery Camera', image: wifiImg },
            { name: 'Security Camera Systems', image: cctvImg }
          ]
        },
        { blockType: 'responseAndQuote' },
        { blockType: 'faq' }
      ]
    },
    {
      title: 'About Us',
      slug: 'about-us',
      layout: [
        {
          blockType: 'aboutHero',
          badge: 'OUR JOURNEY',
          headline: '10+ Years of Excellence in Transport Technology',
          description: 'Netcare Nepal is a premier technology provider in Nepal, specializing in fleet management, high-speed public transport Wi-Fi, and AI-powered CCTV security.',
          image: techImg
        },
        {
          blockType: 'ourHistory',
          years: 'Established 2013',
          title: 'A Decade of Digital Innovation',
          description: 'Started as a small Wi-Fi provider for local businesses, we have grown into the national leader for transport connectivity and safety systems.'
        },
        {
          blockType: 'coreServices',
          title: 'Our Core Expertise',
          services: [
            { title: 'Fleet Management', desc: 'Real-time telemetry and GPS tracking for commercial fleets.' },
            { title: 'Public Transport Wi-Fi', desc: 'Stable, high-speed internet for over 5,000 buses nationwide.' },
            { title: 'AI-Powered Security', desc: 'Smart CCTV integrated with facial recognition and remote monitoring.' }
          ]
        },
        {
          blockType: 'ourValues',
          image: wifiImg,
          values: [
            { title: 'Reliability', desc: 'Our systems maintain 99.9% uptime in demanding mobile environments.' },
            { title: 'Innovation', desc: 'We build our own hardware and software for local requirements.' },
            { title: 'Customer First', desc: '24/7 technical support for every client, big or small.' }
          ]
        }
      ]
    },
    {
      title: 'Services',
      slug: 'services',
      layout: [
        {
          blockType: 'serviceAccordion',
          image: cctvImg,
          faqs: [
            { question: 'What is Bus Wi-Fi Management?', answer: 'It is a specialized solution that provides stable 4G/5G internet to passengers while giving bus owners clear analytics on usage.' },
            { question: 'How does the CCTV help fleet owners?', answer: 'Owners can view live video from anywhere in the world and receive alerts for suspicious activities or route deviations.' }
          ]
        },
        {
          blockType: 'processGrid',
          steps: [
            { title: 'Consultation', desc: 'We analyze your fleet or property needs.', btnText: 'Get Free Audit', image: mediaMap['600x400.png'] || fallbackImg },
            { title: 'Design', desc: 'Tailored networking and hardware blueprints.', btnText: 'View Designs', image: mediaMap['dd004de2-eb5a-4bf7-8ecc-4b4df433580f.jpg'] || fallbackImg },
            { title: 'Installation', desc: 'Expert on-site setup and configuration.', btnText: 'Book Install', image: techImg },
            { title: 'Maintenance', desc: 'Ongoing remote support and updates.', btnText: 'Support Portal', image: fallbackImg }
          ]
        },
        {
          blockType: 'quoteForm',
          title: 'Request a Professional Quote',
          image: techImg
        },
        {
          blockType: 'trustReviews',
          galleryImages: [
            { image: wifiImg },
            { image: cctvImg },
            { image: techImg }
          ],
          reviews: [
            { author: 'Transport Dept. Head', quote: 'Netcare transformed our passenger experience with seamless Wi-Fi.' },
            { author: 'School Principal', quote: 'The CCTV security in our buses has given parents huge peace of mind.' }
          ]
        }
      ]
    },
    {
      title: 'Contact Us',
      slug: 'contact',
      layout: [
        {
          blockType: 'letsConnect',
          title: 'Connect With Our Support Team'
        },
        {
          blockType: 'hotlineBanner',
          phone: '+977-9802900818',
          email: 'support@netcarenepal.com'
        },
        {
          blockType: 'contactForm',
          title: 'Send Us a Message'
        },
        {
          blockType: 'officesList',
          offices: [
            { city: 'Kathmandu (HQ)', address: 'Anamnagar-29, Kathmandu, Nepal' },
            { city: 'Butwal', address: 'Amarpath, Butwal, Nepal' },
            { city: 'Itahari', address: 'Saptarishi Chowk, Itahari, Nepal' }
          ]
        }
      ]
    },
    {
      title: 'Solutions',
      slug: 'solutions',
      layout: [
        {
          blockType: 'solutionsCalculator',
          headline: 'Calculate Your Custom Solution',
          description: 'Select your fleet size and requirements to get a live quotation.'
        }
      ]
    },
    {
        title: 'Products',
        slug: 'products',
        layout: [
          {
            blockType: 'techShowcase',
            title: 'Industrial Grade Connectivity Gear'
          },
          {
            blockType: 'fleetStack',
            packages: [
              { name: 'Lite (WiFi Only)', price: '2,500 NPR/mo' },
              { name: 'Standard (WiFi + GPS)', price: '4,000 NPR/mo' },
              { name: 'Premium (WiFi + 4-Cam CCTV)', price: '6,500 NPR/mo' }
            ]
          }
        ]
      }
  ]

  for (const p of pages) {
    try {
      // Upsert logic
      const existingPage = await payload.find({
        collection: 'pages',
        where: {
          slug: { equals: p.slug }
        }
      })

      if (existingPage.totalDocs > 0) {
        console.log(`Updating existing page: ${p.title}`)
        await payload.update({
          collection: 'pages',
          id: existingPage.docs[0].id,
          data: p as any,
        })
      } else {
        console.log(`Creating new page: ${p.title}`)
        await payload.create({
          collection: 'pages',
          data: p as any,
        })
      }
    } catch (e: any) {
      console.error(`Failed to create/update ${p.title}:`, e.message)
    }
  }

  console.log('--- Seeding Complete ---')
  process.exit(0)
}

seed()
