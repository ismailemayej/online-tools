import React from 'react';
import Head from 'next/head';
import { site } from '@/utils/basic-info/SiteInfo';

export const metadata = {
  title: 'Color Picker – Pick & Copy Color Codes Instantly',
  description:
    'Use our free Color Picker tool to select, preview, and copy HEX, RGB, or HSL color codes. Ideal for designers, developers, and creatives.',
  keywords:
    'color picker, hex color picker, rgb color tool, hsl picker, color code generator, web color picker, online color tool',
  openGraph: {
    title: 'Color Picker – Pick & Copy Color Codes Instantly',
    description:
      'Choose and copy color codes using this easy and fast online color picker tool. Perfect for web and graphic design.',
    url: `${site[0].url}/color-picker`,
    type: 'website',
    siteName: `${site[0].siteName}`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Color Picker – Easy & Fast Online Tool',
    description:
      'Select your favorite color and instantly get the HEX, RGB, or HSL code with our user-friendly Color Picker tool.',
  },
};

export default function ColorPickerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        {/* Open Graph tags */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta
          property="og:description"
          content={metadata.openGraph.description}
        />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        {/* Twitter tags */}
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta
          name="twitter:description"
          content={metadata.twitter.description}
        />
      </Head>

      <section
        className="flex flex-col items-center justify-center gap-4 py-8 md:py-10"
        aria-label="Color Picker Section"
      >
        {children}
      </section>
    </>
  );
}
