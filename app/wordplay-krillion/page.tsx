import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WordplayDiveGame from '@/components/wordplay/WordplayDiveGame';
import WordplaySeoArticle, { WORDPLAY_FAQ_ITEMS } from '@/components/wordplay/WordplaySeoArticle';
import { SITE_CONFIG } from '@/lib/site-data';

const PAGE_PATH = '/wordplay-krillion';
const PAGE_URL = `${SITE_CONFIG.url}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: 'Wordplay Krillion – Play the Rare Word Game Online',
  description:
    'Play Wordplay Krillion, a creative word challenge where unusual answers earn higher scores. Solve seven rounds, discover rare words and test your vocabulary.',
  keywords: [
    'Wordplay Krillion',
    'Wordplay game',
    'word puzzle game',
    'rare word challenge',
  ],
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    siteName: SITE_CONFIG.name,
    title: 'Wordplay Krillion – Play the Rare Word Game Online',
    description:
      'Play Wordplay Krillion, a creative word challenge where unusual answers earn higher scores. Solve seven rounds, discover rare words and test your vocabulary.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wordplay Krillion – Play the Rare Word Game Online',
    description:
      'Unusual valid words score higher. Seven rounds of creative word challenges on KrillionPro.',
  },
};

export default function WordplayKrillionPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: WORDPLAY_FAQ_ITEMS.map((item) => ({
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
        <WordplayDiveGame />
        <WordplaySeoArticle />
      </main>
      <Footer />
    </div>
  );
}
