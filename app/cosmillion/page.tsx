import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CosmillionGame from '@/components/cosmillion/CosmillionGame';
import CosmillionSeoArticle, {
  COSMILLION_FAQ_ITEMS,
} from '@/components/cosmillion/CosmillionSeoArticle';
import { SITE_CONFIG } from '@/lib/site-data';

const PAGE_PATH = '/cosmillion';
const PAGE_URL = `${SITE_CONFIG.url}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: 'Cosmillion / Moonshot – Play Space Trivia Game Online | KrillionPro',
  description:
    'Explore Cosmillion / Moonshot, a space-themed trivia game featuring timed questions, rare answers and exciting challenges. Play free in the browser.',
  keywords: [
    'cosmillion game',
    'Cosmillion',
    'Moonshot game',
    'space trivia game',
    'online trivia game',
    'moonshot',
    'rare answer trivia',
  ],
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    siteName: SITE_CONFIG.name,
    title: 'Cosmillion / Moonshot – Play Space Trivia Game Online',
    description:
      'Timed space trivia with rare-answer scoring. Classic, Space Survival, and Rare Answer Hunt — play free on KrillionPro.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cosmillion / Moonshot – Play Space Trivia Game Online',
    description:
      'Timed space trivia with rare-answer scoring. Classic, Space Survival, and Rare Answer Hunt — play free on KrillionPro.',
  },
};

export default function CosmillionPage() {
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
        name: 'Cosmillion Moonshot',
        item: PAGE_URL,
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: COSMILLION_FAQ_ITEMS.map((item) => ({
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
        <CosmillionGame />
        <CosmillionSeoArticle />
      </main>
      <Footer />
    </div>
  );
}
