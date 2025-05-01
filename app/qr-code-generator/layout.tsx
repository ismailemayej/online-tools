import React from 'react';
import Head from 'next/head';
import { site } from '@/utils/basic-info/SiteInfo';
import { Facebook, Twitter, Linkedin, Share2 } from 'lucide-react';

export const metadata = {
  title: 'Free QR Code Generator – Create Custom QR Codes Instantly',
  description:
    'Generate QR codes for links, text, or any data instantly with our free and customizable QR Code Generator tool.',
  keywords:
    'qr code generator, qr code, free qr code maker, custom qr codes, generate qr code online, qr code for url, qr code text generator',
  openGraph: {
    title: 'Free QR Code Generator – Create Custom QR Codes Instantly',
    description:
      'Easily create QR codes for URLs, contact info, text, or any custom data using our simple and fast QR Code Generator.',
    url: `${site[0].url}/qr-code-generator`,
    type: 'website',
    siteName: site[0].siteName,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free & Easy QR Code Generator',
    description:
      'Instantly generate and customize QR codes online for personal or business use with our easy-to-use QR Code Generator tool.',
  },
};

const shareUrl = metadata.openGraph.url;
const shareText = metadata.title;

export default function QRCodeGeneratorLayout({
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
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta
          property="og:description"
          content={metadata.openGraph.description}
        />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta
          name="twitter:description"
          content={metadata.twitter.description}
        />
      </Head>

      <section
        className="flex flex-col items-center justify-center gap-4 py-8 md:py-10"
        aria-label="QR Code Generator Section"
      >
        <h1 className="text-2xl font-bold text-center mb-4">
          QR Code Generator
        </h1>
        {children}

        {/* Social Share Buttons */}
        <div className="mt-8 flex gap-4 items-center">
          <span className="text-gray-600 flex items-center gap-2">
            <Share2 size={18} /> Share:
          </span>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on Facebook"
            className="hover:text-blue-600"
          >
            <Facebook />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on Twitter"
            className="hover:text-sky-500"
          >
            <Twitter />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on LinkedIn"
            className="hover:text-blue-700"
          >
            <Linkedin />
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on WhatsApp"
            className="hover:text-green-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 32 32"
              className="w-5 h-5"
            >
              <path d="M16 2.003a13.944 13.944 0 0 0-11.84 21.567L2 30l6.66-2.137A13.944 13.944 0 1 0 16 2.003zm0 2a11.944 11.944 0 1 1 0 23.889c-2.023 0-3.975-.508-5.688-1.464l-.406-.231-3.955 1.27 1.301-3.857-.25-.413A11.944 11.944 0 0 1 16 4.003zm-5.248 6.842c-.145-.322-.297-.328-.438-.334l-.374-.006c-.129 0-.334.048-.51.241s-.669.652-.669 1.589.685 1.844.78 1.969c.096.129 1.32 2.113 3.2 2.88 1.6.635 1.92.509 2.265.478.354-.032 1.12-.457 1.278-.898.16-.445.16-.827.113-.898-.048-.064-.177-.097-.374-.177s-1.12-.552-1.294-.614c-.177-.064-.306-.096-.434.097-.128.193-.499.613-.612.737-.113.128-.225.145-.418.048-.193-.096-.812-.299-1.545-.953-.571-.509-.956-1.14-1.067-1.333-.112-.193-.012-.296.084-.394.086-.085.193-.225.29-.338.097-.112.129-.193.193-.322.064-.129.032-.241-.016-.338-.048-.096-.433-1.04-.592-1.434z" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}
