import React from 'react';
import Head from 'next/head';
import { site } from '@/utils/basic-info/SiteInfo';

export const metadata = {
  title: 'Base64 Encoder – Free Online Text to Base64 Converter',
  description:
    'Encode text or data into Base64 format easily with our free online Base64 Encoder. Secure, fast, and user-friendly tool for developers and users alike.',
  keywords:
    'base64 encoder, base64 converter, online base64 tool, text to base64, encode string base64, encode data',
  openGraph: {
    title: 'Base64 Encoder – Free Online Text to Base64 Converter',
    description:
      'Convert text or data to Base64 easily and securely. Try our fast and reliable online Base64 encoder now!',
    url: `${site[0].url}/base64-encoder`,
    type: 'website',
    siteName: `${site[0].siteName}`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Base64 Encoder',
    description:
      'Use our free online Base64 encoder to convert your text or data into Base64 format quickly and safely.',
  },
};

export default function Base64EncoderLayout({
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
        aria-label="Base64 Encoder Section"
      >
        {children}
      </section>
    </>
  );
}
