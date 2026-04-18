import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { getCompanyInfo, getCompanySettings } from "@/lib/payload";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Netcare Nepal | Fleet Management & Connectivity Solutions",
  description: "Advanced Wi-Fi, CCTV, and Fleet Management solutions for transport services in Nepal.",
  icons: {
    icon: '/logo.png',
  },
};

import Footer from "@/components/Footer";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch dynamic company data from Payload CMS
  let companyInfo = null;
  let companySettings = null;
  try {
    const [info, settings] = await Promise.all([
      getCompanyInfo().catch(() => null),
      getCompanySettings().catch(() => null),
    ]);
    companyInfo = info;
    companySettings = settings;
  } catch (error) {
    console.error("Failed to fetch company data:", error);
  }

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-midnight-deep text-mist-white">
        <Header 
          logoUrl={companyInfo?.logo?.url} 
          logoAlt={companyInfo?.logo?.alt}
        />
        <main className="flex-grow">
          {children}
        </main>
        <Footer settings={companySettings} />
      </body>
    </html>
  );
}
