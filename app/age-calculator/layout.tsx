import React from 'react';
import Head from 'next/head';
import { site } from '@/utils/basic-info/SiteInfo';

export const metadata = {
  title: 'Accurate Age Calculator – Find Your Age Instantly',
  description:
    'Use our free and accurate age calculator to determine your exact age in years, months, and days. Perfect for all age-related needs!',
  keywords:
    'age calculator, date of birth calculator, calculate age, online age tool',
  openGraph: {
    title: 'Accurate Age Calculator – Find Your Age Instantly',
    description:
      'Use our free and accurate age calculator to determine your exact age in years, months, and days.',
    url: `${site[0].url}/age-calculator`,
    type: 'website',
    siteName: `${site[0].siteName}`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accurate Age Calculator',
    description:
      'Find your exact age in seconds using our age calculator tool.',
  },
};

export default function AgeCalculateLayOut({
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
        aria-label="Age Calculator Section"
      >
        <h1 className="text-2xl font-bold text-center mb-4">
          Accurate Age Calculator
        </h1>
        {children}
      </section>
    </>
  );
}
