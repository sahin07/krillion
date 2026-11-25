import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimalDiveGame from '@/components/animal/AnimalDiveGame';
import AnimalSeoArticle, { ANIMAL_FAQ_ITEMS } from '@/components/animal/AnimalSeoArticle';
import { SITE_CONFIG } from '@/lib/site-data';

const PAGE_PATH = '/krillion-animal';
const PAGE_URL = `${SITE_CONFIG.url}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: 'Animal Krillion – Play the Animal Rarity Game Online',
  description:
    'Explore the animal kingdom in Animal Krillion! Discover unusual animals, submit rare answers, earn points and complete the seven-round wildlife challenge.',
  keywords: [
    'Animal Krillion',
    'Animal Krillion game',
    'animal rarity game',
    'animal trivia game',
  ],
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    siteName: SITE_CONFIG.name,
    title: 'Animal Krillion – Play the Animal Rarity Game Online',
    description:
      'Explore the animal kingdom in Animal Krillion! Discover unusual animals, submit rare answers, earn points and complete the seven-round wildlife challenge.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Animal Krillion – Play the Animal Rarity Game Online',
    description:
      'Discover unusual animals, submit rare answers, and complete the seven-round wildlife challenge.',
  },
};

export default function KrillionAnimalPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ANIMAL_FAQ_ITEMS.map((item) => ({
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
        <AnimalDiveGame />
        <AnimalSeoArticle />
      </main>
      <Footer />
    </div>
  );
}
