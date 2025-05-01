import React from 'react';
import Head from 'next/head';
import { site } from '@/utils/basic-info/SiteInfo';

export const metadata = {
  title: 'Secure Password Generator – Create Strong Passwords Instantly',
  description:
    'Generate strong, secure, and random passwords instantly with our free password generator. Customize length, characters, and security level.',
  keywords:
    'password generator, secure password, random password, strong password, online password tool, password maker, free password generator',
  openGraph: {
    title: 'Secure Password Generator – Create Strong Passwords Instantly',
    description:
      'Use our secure password generator to create unique, random passwords for better protection of your accounts and data.',
    url: `${site[0].url}/password-generator`,
    type: 'website',
    siteName: `${site[0].siteName}`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free & Secure Password Generator',
    description:
      'Easily create strong and random passwords to protect your online accounts with our free password generator tool.',
  },
};

export default function PasswordGeneratorLayout({
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
        {/* Open Graph */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta
          property="og:description"
          content={metadata.openGraph.description}
        />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        {/* Twitter */}
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta
          name="twitter:description"
          content={metadata.twitter.description}
        />
      </Head>

      <section
        className="flex flex-col items-center justify-center gap-4 py-8 md:py-10"
        aria-label="Password Generator Section"
      >
        {children}
      </section>
    </>
  );
}
