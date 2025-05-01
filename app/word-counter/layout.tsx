import React from 'react';
import Head from 'next/head';
import { site } from '@/utils/basic-info/SiteInfo';

export const metadata = {
  title: 'Word & Character Counter – Free Online Text Tool',
  description:
    'Quickly count words, characters, sentences, and more with our free Word & Character Counter. Ideal for students, writers, and professionals!',
  keywords:
    'word counter, character counter, online text counter, free writing tool, count characters, count words, text analyzer',
  openGraph: {
    title: 'Word & Character Counter – Free Online Text Tool',
    description:
      'Quickly count words, characters, sentences, and more with our free Word & Character Counter. Ideal for students, writers, and professionals!',
    url: `${site[0].url}/word-counter`,
    type: 'website',
    siteName: `${site[0].siteName}`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Word & Character Counter',
    description:
      'Use our free tool to count words, characters, and more. Great for writers, students, and professionals!',
  },
};

export default function WordCharCounterLayout({
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
        aria-label="Word and Character Counter Section"
      >
        {children}
      </section>
    </>
  );
}
