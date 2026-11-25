import type { Metadata } from 'next';
import './globals.css';
import { bodyFont } from '@/lib/fonts';
import { SITE_CONFIG } from '@/lib/site-data';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  keywords: [
    'krillion game',
    'krillion games',
    'the krillion game',
    'a krillion game',
    'one in a krillion',
    'one in a krillion game',
    'daily krillion',
    'unlimited krillion',
    'KrillionPro',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: `${SITE_CONFIG.url}/`,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    alternateName: SITE_CONFIG.brandKeyword,
    url: `${SITE_CONFIG.url}/`,
    logo: `${SITE_CONFIG.url}/icon`,
    description: SITE_CONFIG.description,
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    alternateName: SITE_CONFIG.brandKeyword,
    url: `${SITE_CONFIG.url}/`,
    description: SITE_CONFIG.description,
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: `${SITE_CONFIG.url}/`,
    },
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body
        suppressHydrationWarning
        className={`${bodyFont.className} min-h-screen bg-[#040816] text-slate-100 antialiased selection:bg-cyan-400/25 selection:text-cyan-100`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([websiteJsonLd, organizationJsonLd]),
          }}
        />
        {children}
      </body>
    </html>
  );
}

