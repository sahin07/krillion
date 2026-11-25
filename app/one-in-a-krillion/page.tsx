import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OneInAKrillionGame from '@/components/one-in-a-krillion/OneInAKrillionGame';
import OneInAKrillionSeoArticle, {
  OIK_FAQ_ITEMS,
} from '@/components/one-in-a-krillion/OneInAKrillionSeoArticle';
import { SITE_CONFIG } from '@/lib/site-data';

const PAGE_PATH = '/one-in-a-krillion';
const PAGE_URL = `${SITE_CONFIG.url}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: 'One in a Krillion – Play the Rare Answer Game Online | KrillionPro',
  description:
    'Play One in a Krillion, a rare-answer challenge where unusual answers earn bigger rewards. Test your creativity, beat seven rounds, and discover your rarity rank.',
  keywords: [
    'one in a krillion',
    'one in a krillion game',
    'play one in a krillion',
    '1 in a krillion',
    '1 in a krillion game',
    'rare answer game',
    'krillion rare answer',
  ],
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    siteName: SITE_CONFIG.name,
    title: 'One in a Krillion – Play the Rare Answer Game Online',
    description:
      'Unusual answers earn bigger rewards. Seven rounds, streak bonuses, and a final rarity rank.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'One in a Krillion – Play the Rare Answer Game Online',
    description: 'Beat seven rounds and discover your rarity rank — free on KrillionPro.',
  },
};

export default function OneInAKrillionPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: OIK_FAQ_ITEMS.map((item) => ({
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
        <OneInAKrillionGame />
        <OneInAKrillionSeoArticle />
      </main>
      <Footer />
    </div>
  );
}
