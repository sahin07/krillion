import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PufferPartyGame from '@/components/puffer-party/PufferPartyGame';
import PufferPartySeoArticle, {
  PUFFER_PARTY_FAQ_ITEMS,
} from '@/components/puffer-party/PufferPartySeoArticle';
import { SITE_CONFIG } from '@/lib/site-data';

const PAGE_PATH = '/puffer-party-krillion';
const PAGE_URL = `${SITE_CONFIG.url}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: 'Krillion Puffer Party – How to Play & Game Rules | KrillionPro',
  description:
    'Play Puffer Party Krillion on KrillionPro: Don’t Fall hex-arena party mode. Jump tiles, survive rounds, and explore how it differs from Daily Dive.',
  keywords: [
    'puffer party krillion',
    'Krillion Puffer Party',
    'Puffer Party game',
    'Krillion multiplayer game',
    'multiplayer trivia games',
    'play Puffer Party with friends',
  ],
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    siteName: SITE_CONFIG.name,
    title: 'Krillion Puffer Party – How to Play & Game Rules',
    description:
      'Don’t Fall party mode on KrillionPro — jump hex tiles, survive dropping floors, three rounds.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Krillion Puffer Party – How to Play & Game Rules',
    description:
      'Don’t Fall party mode on KrillionPro — jump hex tiles, survive dropping floors, three rounds.',
  },
};

export default function PufferPartyKrillionPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'KrillionPro',
        item: `${SITE_CONFIG.url}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Puffer Party Krillion',
        item: PAGE_URL,
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: PUFFER_PARTY_FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbJsonLd, faqJsonLd]) }}
      />
      <Header />
      <main className="flex-1">
        <PufferPartyGame />
        <PufferPartySeoArticle />
      </main>
      <Footer />
    </div>
  );
}
