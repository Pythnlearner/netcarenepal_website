import { GlobalConfig } from 'payload'

export const AboutUs: GlobalConfig = {
  slug: 'about-us-global',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'welcomeTitle',
      type: 'text',
      required: true,
      defaultValue: 'Driving Nepal’s Digital Transit Future',
      label: 'Hero Title',
    },
    {
      name: 'welcomeMessage',
      type: 'textarea',
      required: true,
      defaultValue: 'Netcare Nepal is at the forefront of the digital revolution in public transport. With a decade of dedicated innovation, we provide high-fidelity connectivity and security solutions that empower fleet owners and safeguard passengers across every mile of Nepal’s highways.',
      label: 'Vision Statement',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Image',
    },
    {
      name: 'stats',
      label: 'Impact Statistics',
      type: 'group',
      fields: [
        {
          name: 'wifiInstalled',
          type: 'number',
          defaultValue: 400,
          label: 'Wi-Fi Systems Installed',
        },
        {
          name: 'cctvInstalled',
          type: 'number',
          defaultValue: 300,
          label: 'CCTV Cameras Deployed',
        },
        {
          name: 'gpsInstalled',
          type: 'number',
          defaultValue: 50,
          label: 'GPS Trackers Integrated',
        },
        {
          name: 'softwareProjects',
          type: 'number',
          defaultValue: 10,
          label: 'Software & App Projects',
        },
      ],
    },
    {
      name: 'gallery',
      type: 'array',
      maxRows: 30,
      label: 'Success Gallery (Slider)',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'company', type: 'text', required: true },
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
      ],
    },
    {
      name: 'leaders',
      type: 'array',
      label: 'Founders & Leadership',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text', required: true },
        { name: 'bio', type: 'textarea', required: true },
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
      ],
    },
  ],
}
