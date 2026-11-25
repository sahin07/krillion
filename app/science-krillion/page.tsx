import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScienceDiveGame from '@/components/science/ScienceDiveGame';
import ScienceSeoArticle, { SCIENCE_FAQ_ITEMS } from '@/components/science/ScienceSeoArticle';
import { SITE_CONFIG } from '@/lib/site-data';

const PAGE_PATH = '/science-krillion';
const PAGE_URL = `${SITE_CONFIG.url}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: 'Science Krillion – Play the Science Rarity Game Online',
  description:
    'Play Science Krillion, a science-themed rare-answer challenge. Explore physics, biology, chemistry and space, discover unusual answers and earn points across seven rounds.',
  keywords: [
    'Science Krillion',
    'Science Krillion game',
    'science trivia game',
    'science quiz online',
  ],
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    siteName: SITE_CONFIG.name,
    title: 'Science Krillion – Play the Science Rarity Game Online',
    description:
      'Play Science Krillion, a science-themed rare-answer challenge. Explore physics, biology, chemistry and space across seven rounds.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Science Krillion – Play the Science Rarity Game Online',
    description: 'Think beyond the textbook. Discover rare science answers on KrillionPro.',
  },
};

export default function ScienceKrillionPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: SCIENCE_FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main className="flex-1">
        <ScienceDiveGame />
        <ScienceSeoArticle />
      </main>
      <Footer />
    </div>
  );
}
