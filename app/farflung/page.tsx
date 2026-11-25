import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FarflungDiveGame from '@/components/farflung/FarflungDiveGame';
import FarflungSeoArticle, { FARFLUNG_FAQ_ITEMS } from '@/components/farflung/FarflungSeoArticle';
import { SITE_CONFIG } from '@/lib/site-data';

const PAGE_PATH = '/farflung';
const PAGE_URL = `${SITE_CONFIG.url}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: 'Farflung – Play the Rare Answer Exploration Game | KrillionPro',
  description:
    'Explore the unknown in Farflung, an original rare-answer game. Think beyond ordinary answers, discover unusual possibilities and earn points across seven rounds.',
  keywords: [
    'Farflung game',
    'Play Farflung online',
    'Farflung gameplay',
    'Farflung game rules',
    'rare answer game',
  ],
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    siteName: SITE_CONFIG.name,
    title: 'Farflung – Play the Rare Answer Exploration Game',
    description:
      'Think beyond ordinary answers. Discover unusual possibilities across seven cosmic rounds.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Farflung – Play the Rare Answer Exploration Game',
    description: 'Play Farflung online — rare-answer cosmic exploration on KrillionPro.',
  },
};

export default function FarflungPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FARFLUNG_FAQ_ITEMS.map((item) => ({
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
        <FarflungDiveGame />
        <FarflungSeoArticle />
      </main>
      <Footer />
    </div>
  );
}
