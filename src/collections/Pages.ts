import type { CollectionConfig, Block } from 'payload'

const HeroBlock: Block = {
  slug: 'hero',
  fields: [
    { name: 'overline', type: 'text', defaultValue: 'Accurate, Secure, Efficient' },
    { name: 'headline', type: 'text', defaultValue: 'Netcare Smart Solutions' },
    { name: 'buttonText', type: 'text', defaultValue: 'Get Quotes Now!' },
    {
      name: 'carousel',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

const StatsBlock: Block = {
  slug: 'stats',
  labels: {
    singular: 'Value Propositions',
    plural: 'Value Propositions',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      label: 'Main Headline (Nepali/English)',
      defaultValue: 'SEAMLESS CONNECTIVITY, STRONGER JOURNEYS.',
      required: true,
    },
    {
      name: 'subheadline',
      type: 'textarea',
      label: 'Subheadline',
      defaultValue: 'यात्रुलाई हाई-स्पीड इन्टरनेट र बसधनीलाई पूर्ण नियन्त्रण। नेटकेयर नेपाल तपाईको भरपर्दो प्रविधि साझेदार।',
      required: true,
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Feature Cards',
      minRows: 1,
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Shield (Security)', value: 'ShieldCheck' },
            { label: 'Map Pin (GPS)', value: 'MapPin' },
            { label: 'Ticket (Booking)', value: 'Ticket' },
            { label: 'Wifi (Internet)', value: 'Wifi' },
            { label: 'Gauge (Speed)', value: 'Gauge' },
            { label: 'Headset (Support)', value: 'Headset' },
            { label: 'Zap (Speed)', value: 'Zap' },
            { label: 'Bell (Alerts)', value: 'Bell' },
          ],
          defaultValue: 'ShieldCheck',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
      defaultValue: [
        { icon: 'Gauge', title: 'थप आम्दानीको अवसर (प्रिमियम सेवा)', description: 'हाई-स्पीड इन्टरनेट प्याकेज मार्फत थप आम्दानीको नयाँ स्रोत।' },
        { icon: 'Wifi', title: 'बसभित्र इन्टरनेट प्रयोगको पूर्ण नियन्त्रण', description: 'प्रयोगकर्ता र डेटा खपतको पूर्ण व्यवस्थापन र निगरानी।' },
        { icon: 'ShieldCheck', title: 'आधुनिक र प्रतिस्पर्धी सेवा', description: 'बजारमा आफ्नो बस सेवालाई प्रविधिमैत्री र अग्रपङ्क्तिमा राख्नुहोस्।' },
        { icon: 'Headset', title: 'यात्रु सन्तुष्टि र पुनः यात्रा गर्ने सम्भावना', description: 'उत्कृष्ट इन्टरनेट सुविधाले यात्रुलाई सन्तुष्ट र वफादार बनाउँछ।' },
      ]
    },
  ],
}

const ServiceFeatureBlock: Block = {
  slug: 'serviceFeature',
  fields: [
    { name: 'headline', type: 'text', defaultValue: 'Smart Technology for Modern Bus Service 🚍' },
    { name: 'subheadline', type: 'textarea', defaultValue: 'Netcare Nepal ले तपाईंको बसमा केवल device जडान मात्र गर्दैन — हामी दिन्छौं **complete smart solution** जसले तपाईंको service लाई अझ reliable, modern र profitable बनाउँछ।' },
    { name: 'buttonText', type: 'text', defaultValue: 'Learn More About Our Tech' },
    {
      name: 'benefits',
      type: 'array',
      minRows: 1,
      fields: [{ name: 'text', type: 'text', required: true }],
      defaultValue: [
        { text: 'Real-Time Monitoring & Control: बसमा कति user connected छन्, data usage कति भइरहेको छ — सबै कुरा तपाईंले anytime, anywhere हेर्न सक्नुहुन्छ।' },
        { text: 'Easy Fleet Management: धेरै बसहरू छन्? कुनै समस्या छैन। सबै बसलाई एकै dashboard बाट manage गर्नुहोस् — simple र efficient।' },
        { text: '24/7 Technical Support: समस्या कहिले पनि आउन सक्छ। त्यसैले हाम्रो team 24/7 ready छ — तपाईंको service कहिल्यै बन्द नहोस्।' },
        { text: 'Reliable & High-Speed Internet: लामो route होस् वा highway — यात्रुहरूले पाउँछन् stable, fast WiFi experience।' },
      ]
    }
  ],
}

const ProductShowcaseBlock: Block = {
  slug: 'productShowcase',
  fields: [{ name: 'title', type: 'text', defaultValue: 'Bestselling Solutions' }],
}

const VideoBannerBlock: Block = {
  slug: 'videoBanner',
  fields: [{ name: 'videoUrl', type: 'text', defaultValue: 'https://images.unsplash.com/photo-1543269865-cbf427effbad' }],
}

const AppFeaturesBlock: Block = {
  slug: 'appFeatures',
  fields: [
    { name: 'headline', type: 'text', defaultValue: 'Superior Security, Trusted By Millions.' },
    { name: 'description', type: 'textarea', defaultValue: 'Managing your fleet shouldn\'t be a chore. The Netcare mobile app puts full control of your Wi-Fi, CCTV, and telemetry in the palm of your hand.' },
    { name: 'buttonText', type: 'text', defaultValue: 'Download Mobile App' },
    {
      name: 'features',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Cloud', value: 'Cloud' },
            { label: 'RotateCcw (Repair)', value: 'RotateCcw' },
            { label: 'Lock (Privacy)', value: 'Lock' },
            { label: 'Shield (Security)', value: 'Shield' }
          ],
          defaultValue: 'Cloud'
        }
      ],
      defaultValue: [
        { title: 'Install & Configure', description: 'Our seamless cloud-based auto-[...]', icon: 'Cloud' },
        { title: 'Repair & Service', description: 'Get real-time health checks on all installed hardware.', icon: 'RotateCcw' },
        { title: 'Privacy Posture', description: 'Your data is encrypted end-to-end.', icon: 'Lock' },
        { title: 'Connectivity Stability', description: 'Automatic failover between multiple ISPs...', icon: 'Shield' }
      ]
    }
  ],
}

const SocialProofBlock: Block = {
  slug: 'socialProof',
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Trusted by Industry Leaders' },
    { 
      name: 'visionText', 
      type: 'textarea', 
      defaultValue: "To be Nepal's ultimate engine of digital progress. From securing and connecting public transit with advanced Wi-Fi and CCTV, to transforming businesses through custom software, CRM, and web development—we turn innovative ideas into connected realities." 
    },
    { name: 'establishedDate', type: 'text', defaultValue: '2014' },
    {
      name: 'partners',
      type: 'array',
      fields: [{ name: 'name', type: 'text', required: true }],
    },
    {
      name: 'testimonials',
      type: 'array',
      fields: [
        { name: 'quote', type: 'textarea' },
        { name: 'authorName', type: 'text' },
        { name: 'authorRole', type: 'text' },
        { name: 'authorAvatar', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'founders',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text' },
        { name: 'bio', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}

const TabbedProductsBlock: Block = {
  slug: 'tabbedProducts',
  fields: [
    { name: 'badge', type: 'text', defaultValue: 'KEY FEATURES' },
    { name: 'headline', type: 'text', defaultValue: 'Discover Which Security Cameras Work Best For Your Home' },
    { name: 'description', type: 'textarea', defaultValue: 'Our refined selection of smart cameras offers unparalleled clarity and reliability, ensuring your assets are protected around the clock.' },
    {
      name: 'categories',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
      defaultValue: [
        { name: 'Poe Ip Cameras & Nvrs' },
        { name: 'Wifi Security Cameras' },
        { name: 'DualLens Security Cameras' },
        { name: 'Battery Cameras' },
        { name: 'Video Doorbells' },
        { name: '4G Battery Camera' },
        { name: 'Security Camera Systems' }
      ]
    }
  ],
}

const ResponseAndQuoteBlock: Block = {
  slug: 'responseAndQuote',
  fields: [{ name: 'title', type: 'text', defaultValue: 'Get Instant Support' }],
}

const FAQBlock: Block = {
  slug: 'faq',
  fields: [
    { name: 'headline', type: 'text', defaultValue: 'Frequently Asked Questions' },
    { name: 'subheadline', type: 'textarea', defaultValue: 'Providing clarity and technical transparency about our core services.' },
    {
      name: 'questions',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
      defaultValue: [
        {
          question: "How long does a typical installation take?",
          answer: "Installation time varies by fleet size, but usually, we can equip a single bus or small office within 4-6 hours.",
        },
        {
          question: "Do you provide off-site monitoring services?",
          answer: "Yes, we offer 24/7 managed monitoring packages where our dedicated team watches your feeds for suspicious activity.",
        },
        {
          question: "Is the hardware weather-resistant?",
          answer: "Absolutely. All our outdoor hardware is IP67 rated, designed to withstand Nepal's monsoon rains and dust.",
        },
        {
          question: "Can I access my feeds from abroad?",
          answer: "Yes, our cloud infrastructure allows you to securely view your cameras from anywhere in the world via our app.",
        }
      ]
    },
  ],
}

// --- NEW BLOCKS FOR AUXILIARY PAGES ---

const AboutHeroBannerBlock: Block = {
  slug: 'aboutHero',
  fields: [
    { name: 'badge', type: 'text', defaultValue: 'OUR JOURNEY' },
    { name: 'headline', type: 'text', defaultValue: 'Delivering The Future of Fleet Innovation' },
    { name: 'description', type: 'textarea', defaultValue: 'We started with a vision.' },
    { name: 'image', type: 'upload', relationTo: 'media' }
  ]
}

const OurHistoryCardBlock: Block = {
  slug: 'ourHistory',
  fields: [
    { name: 'years', type: 'text', defaultValue: '10 Years' },
    { name: 'title', type: 'text', defaultValue: 'A Decade of Trust' },
    { name: 'description', type: 'textarea', defaultValue: 'Since 2013...' }
  ]
}

const CoreServicesGridBlock: Block = {
  slug: 'coreServices',
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Our Foundations' },
    { 
      name: 'services', 
      type: 'array', 
      fields: [{ name: 'title', type: 'text' }, { name: 'desc', type: 'textarea' }] 
    }
  ]
}

const OurValuesSplitBlock: Block = {
  slug: 'ourValues',
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media' },
    { 
      name: 'values', 
      type: 'array', 
      fields: [{ name: 'title', type: 'text' }, { name: 'desc', type: 'textarea' }] 
    }
  ]
}

const LetsConnectGridBlock: Block = {
  slug: 'letsConnect',
  fields: [{ name: 'title', type: 'text', defaultValue: 'Let\'s Connect' }]
}

const HotlineBannerBlock: Block = {
  slug: 'hotlineBanner',
  fields: [
    { name: 'phone', type: 'text', defaultValue: '+977-1-4XXXXXX' },
    { name: 'email', type: 'text', defaultValue: 'contact@netcarenepal.com' }
  ]
}

const ContactQuoteFormBlock: Block = {
  slug: 'contactForm',
  fields: [{ name: 'title', type: 'text', defaultValue: 'Request A Quote' }]
}

const OfficesListBlock: Block = {
  slug: 'officesList',
  fields: [
    { 
      name: 'offices', 
      type: 'array', 
      fields: [{ name: 'city', type: 'text' }, { name: 'name', type: 'text' }, { name: 'isHead', type: 'checkbox' }],
      defaultValue: [
        { city: 'Tokha, Kathmandu', name: 'Head Office', isHead: true },
        { city: 'Birgunj Branch Office', name: 'Support Office', isHead: false },
        { city: 'Pokhara Branch Office', name: 'Branch Office', isHead: false },
      ]
    }
  ]
}

const TechShowcaseBlock: Block = {
  slug: 'techShowcase',
  fields: [
    { name: 'overline', type: 'text', defaultValue: 'Standalone Technologies' },
    { name: 'title', type: 'text', defaultValue: 'Hardware & Software Infrastructure' }
  ]
}

const FleetStackPackagesBlock: Block = {
  slug: 'fleetStack',
  fields: [
    { name: 'overline', type: 'text', defaultValue: 'Matrix' },
    { name: 'title', type: 'text', defaultValue: 'Build Your Fleet Stack' },
    { 
      name: 'packages', 
      type: 'array', 
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'desc', type: 'textarea', required: true },
        { 
          name: 'features', 
          type: 'array', 
          fields: [{ name: 'feature', type: 'text', required: true }] 
        },
        { name: 'badge', type: 'text' },
        { name: 'highlighted', type: 'checkbox', defaultValue: false }
      ],
      defaultValue: [
        {
          title: 'GPS Only',
          desc: 'Essential tracking for monitoring vehicle location and speed.',
          features: [{ feature: 'Real-time location map' }, { feature: 'Route history storage' }, { feature: 'Idle time alerts' }],
          highlighted: false,
        },
        {
          title: 'Wi-Fi Only',
          desc: 'Transform passenger experience with high-speed internet.',
          features: [{ feature: 'Captive portal login' }, { feature: 'Bandwidth management' }, { feature: 'Remote device config' }],
          highlighted: false,
        },
        {
          title: 'Wi-Fi + GPS',
          desc: 'Dual connectivity and tracking for streamlined logistics.',
          features: [{ feature: 'All GPS & Wi-Fi features' }, { feature: 'Integrated dashboards' }, { feature: 'Data usage analytics' }],
          highlighted: false,
        },
        {
          title: 'Wi-Fi + CCTV',
          desc: 'Keep passengers connected and your assets fully secured.',
          features: [{ feature: 'Live camera feeds' }, { feature: 'Tamper alerts' }, { feature: 'Local video storage' }],
          highlighted: false,
        },
        {
          title: 'The Ultimate Fleet',
          desc: 'Wi-Fi + GPS + CCTV. Total control and premium transport experience over your entire fleet operation.',
          features: [{ feature: 'Unified management panel' }, { feature: 'Full vehicle telematics' }, { feature: 'Long-term cloud storage' }, { feature: 'Priority technical support' }],
          badge: 'Most Popular',
          highlighted: true,
        },
      ]
    }
  ]
}

const ServiceAccordionBlock: Block = {
  slug: 'serviceAccordion',
  fields: [
    { name: 'overline', type: 'text', defaultValue: 'OUR SERVICES' },
    { name: 'headline', type: 'text', defaultValue: 'Smarter Security, Trusted By Millions.' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { 
      name: 'services', 
      label: 'Accordion Services',
      type: 'array', 
      fields: [
        { name: 'title', type: 'text', required: true }, 
        { name: 'description', type: 'textarea', required: true }
      ] 
    }
  ]
}

const ProcessGridBlock: Block = {
  slug: 'processGrid',
  fields: [
    { 
      name: 'steps', 
      type: 'array', 
      fields: [
        { name: 'step', type: 'text' }, 
        { name: 'desc', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' }
      ] 
    }
  ]
}

const QuoteFormBlock: Block = {
  slug: 'quoteForm',
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Get A Fleet Quote' },
    { name: 'image', type: 'upload', relationTo: 'media' }
  ]
}

const TrustAndReviewsBlock: Block = {
  slug: 'trustReviews',
  fields: [
    { 
      name: 'galleryImages', 
      type: 'array', 
      fields: [{ name: 'image', type: 'upload', relationTo: 'media' }] 
    },
    { 
      name: 'reviews', 
      type: 'array', 
      fields: [{ name: 'author', type: 'text' }, { name: 'quote', type: 'textarea' }] 
    }
  ]
}

const CustomerGalleryBlock: Block = {
  slug: 'customerGallery',
  fields: [
    { name: 'headline', type: 'text', defaultValue: 'Trusted By 50+ Modern Bus Fleets' },
    { name: 'subheadline', type: 'textarea', defaultValue: 'Partnering with Nepal\'s leading transport companies to deliver superior connectivity and security.' },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
      ],
    },
  ],
}

const RealisticProductSectionBlock: Block = {
  slug: 'realisticProductSection',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'theme', type: 'select', options: [{ label: 'Navy Deep', value: 'navy' }, { label: 'Ochre/Redish', value: 'redish' }, { label: 'Surface Grey', value: 'grey' }], defaultValue: 'navy' },
        { name: 'imageSide', type: 'select', options: [{ label: 'Left', value: 'left' }, { label: 'Right', value: 'right' }], defaultValue: 'right' },
      ]
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'English Content',
          fields: [
            { name: 'headlineEn', type: 'text', required: true },
            { name: 'subheadlineEn', type: 'textarea' },
            { name: 'featuresEn', type: 'array', fields: [{ name: 'feature', type: 'text' }] },
          ]
        },
        {
          label: 'Nepali Content',
          fields: [
            { name: 'headlineNp', type: 'text' },
            { name: 'subheadlineNp', type: 'textarea' },
            { name: 'featuresNp', type: 'array', fields: [{ name: 'feature', type: 'text' }] },
          ]
        }
      ]
    },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'showForm', type: 'checkbox', defaultValue: true, label: 'Show Lead Form (Mobile & Bus Number)' },
    { name: 'formTitle', type: 'text', defaultValue: 'Get Instant Pricing' }
  ]
}

const SolutionsCalculatorBlock: Block = {
  slug: 'solutionsCalculator',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'headline', type: 'text', defaultValue: 'Solutions & Live Calculator', admin: { width: '50%' } },
        { name: 'buttonText', type: 'text', defaultValue: 'Request Formal Proposal', admin: { width: '50%' } },
      ]
    },
    { name: 'description', type: 'textarea', defaultValue: 'Configure your fleet\'s connectivity and security needs in real-time. Our transparent pricing ensures you get the best value.' },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Module Labels',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'fleetModeLabel', type: 'text', defaultValue: 'Fleet Connectivity' },
                { name: 'pocketModeLabel', type: 'text', defaultValue: 'Pocket Wi-Fi Rental' },
              ]
            }
          ]
        },
        {
          label: 'Fleet Pricing',
          fields: [
            { name: 'cctvUnitPrice', type: 'number', defaultValue: 6000, label: 'CCTV Unit Price' },
            {
              type: 'row',
              fields: [
                {
                  name: 'newInstallation',
                  type: 'group',
                  label: 'New Installation Pricing (Basic & Premium)',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'basic1', type: 'number', defaultValue: 7000, label: 'Basic - 1 Month' },
                        { name: 'basic6', type: 'number', defaultValue: 10000, label: 'Basic - 6 Months' },
                        { name: 'basic12', type: 'number', defaultValue: 18000, label: 'Basic - 1 Year' },
                      ]
                    },
                    {
                      type: 'row',
                      fields: [
                        { name: 'premium1', type: 'number', defaultValue: 8000, label: 'Premium - 1 Month' },
                        { name: 'premium6', type: 'number', defaultValue: 15000, label: 'Premium - 6 Months' },
                        { name: 'premium12', type: 'number', defaultValue: 25000, label: 'Premium - 1 Year' },
                      ]
                    }
                  ]
                },
                {
                  name: 'renewal',
                  type: 'group',
                  label: 'Renewal Pricing (Basic & Premium)',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'basic1', type: 'number', defaultValue: 2000, label: 'Basic - 1 Month' },
                        { name: 'basic6', type: 'number', defaultValue: 10000, label: 'Basic - 6 Months' },
                        { name: 'basic12', type: 'number', defaultValue: 18000, label: 'Basic - 1 Year' },
                      ]
                    },
                    {
                      type: 'row',
                      fields: [
                        { name: 'premium1', type: 'number', defaultValue: 3000, label: 'Premium - 1 Month' },
                        { name: 'premium6', type: 'number', defaultValue: 15000, label: 'Premium - 6 Months' },
                        { name: 'premium12', type: 'number', defaultValue: 25000, label: 'Premium - 1 Year' },
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label: 'Pocket Pricing',
          fields: [
            { name: 'pocketDeposit', type: 'number', defaultValue: 3500, label: 'Refundable Deposit' },
            {
              type: 'row',
              fields: [
                { name: 'price7', type: 'number', defaultValue: 800, label: 'Rental - 7 Days' },
                { name: 'price15', type: 'number', defaultValue: 1200, label: 'Rental - 15 Days' },
                { name: 'price30', type: 'number', defaultValue: 1500, label: 'Rental - 30 Days' },
              ]
            }
          ]
        }
      ]
    }
  ]
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
        name: 'slug',
        type: 'text',
        unique: true,
        admin: {
          position: 'sidebar',
        },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              required: true,
              blocks: [
                HeroBlock, 
                StatsBlock, 
                ServiceFeatureBlock, 
                ProductShowcaseBlock, 
                VideoBannerBlock, 
                AppFeaturesBlock, 
                SocialProofBlock, 
                TabbedProductsBlock, 
                ResponseAndQuoteBlock, 
                FAQBlock,
                AboutHeroBannerBlock,
                OurHistoryCardBlock,
                CoreServicesGridBlock,
                OurValuesSplitBlock,
                LetsConnectGridBlock,
                HotlineBannerBlock,
                ContactQuoteFormBlock,
                OfficesListBlock,
                CustomerGalleryBlock,
                SolutionsCalculatorBlock,
                TechShowcaseBlock,
                FleetStackPackagesBlock,
                ServiceAccordionBlock,
                ProcessGridBlock,
                QuoteFormBlock,
                TrustAndReviewsBlock,
                RealisticProductSectionBlock
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
            },
          ],
        },
      ],
    },
  ],
}
