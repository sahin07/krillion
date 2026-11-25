import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GreatApeDiveGame from '@/components/great-ape/GreatApeDiveGame';
import GreatApeSeoArticle, { GREAT_APE_FAQ_ITEMS } from '@/components/great-ape/GreatApeSeoArticle';
import { getGreatApePack, toGreatApePublicPack } from '@/lib/dive/great-ape';
import { SITE_CONFIG } from '@/lib/site-data';

const PAGE_PATH = '/great-ape-krillion';
const PAGE_URL = `${SITE_CONFIG.url}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: 'Great Ape Krillion – Play the Rare Ape Challenge Online',
  description:
    'Play Great Ape Krillion, a jungle-themed rarity challenge. Discover unusual great ape species, answer seven rounds, and compete for the highest rarity score.',
  keywords: [
    'Great Ape Krillion',
    'Great Ape Game',
    'Great Ape Trivia',
    'Primate Quiz',
    'Ape Species Game',
    'Animal Rarity Game',
  ],
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    siteName: SITE_CONFIG.name,
    title: 'Great Ape Krillion – Play the Rare Ape Challenge Online',
    description:
      'Jungle-themed rare-answer challenge — discover unusual great ape species across seven rounds.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Great Ape Krillion – Play the Rare Ape Challenge Online',
    description: 'Enter the world of great apes. Think beyond the obvious.',
  },
};

export default function GreatApeKrillionPage() {
  const initialPack = toGreatApePublicPack(getGreatApePack());
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: GREAT_APE_FAQ_ITEMS.map((item) => ({
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
        <GreatApeDiveGame initialPack={initialPack} />
        <GreatApeSeoArticle />
      </main>
      <Footer />
    </div>
  );
}
