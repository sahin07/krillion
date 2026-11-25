import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StrangerThingsDiveGame from '@/components/stranger-things/StrangerThingsDiveGame';
import StrangerThingsSeoArticle, {
  STRANGER_THINGS_FAQ_ITEMS,
} from '@/components/stranger-things/StrangerThingsSeoArticle';
import { SITE_CONFIG } from '@/lib/site-data';

const PAGE_PATH = '/stranger-things-krillion';
const PAGE_URL = `${SITE_CONFIG.url}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: 'Stranger Things Krillion – Play the Upside Down Challenge | KrillionPro',
  description:
    'Enter a mysterious supernatural world in Stranger Things Krillion. Answer unusual questions, earn rarity points, and complete the ultimate seven-round challenge.',
  keywords: [
    'Stranger Things Krillion',
    'Stranger Things game',
    'Stranger Things Krillion game',
    'Upside Down challenge',
    'rare answer game',
  ],
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    siteName: SITE_CONFIG.name,
    title: 'Stranger Things Krillion – Play the Upside Down Challenge',
    description:
      'Enter a mysterious supernatural world. Answer unusual questions, earn rarity points, and complete seven rounds.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stranger Things Krillion – Play the Upside Down Challenge',
    description:
      'Answer unusual questions, earn rarity points, and complete the seven-round Upside Down challenge.',
  },
};

export default function StrangerThingsKrillionPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: STRANGER_THINGS_FAQ_ITEMS.map((item) => ({
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
        <StrangerThingsDiveGame />
        <StrangerThingsSeoArticle />
      </main>
      <Footer />
    </div>
  );
}
