import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UnlimitedDiveGame from '@/components/dive/UnlimitedDiveGame';
import UnlimitedSeoArticle, { UNLIMITED_FAQ_ITEMS } from '@/components/dive/UnlimitedSeoArticle';

export const metadata: Metadata = {
  title: 'Unlimited Krillion · Krillion Unlimited Practice | KrillionPro',
  description:
    'Play Unlimited Krillion (also called Krillion Unlimited): six prompts, twenty seconds each. Rare answers sink deeper. Infinite Krillion practice anytime on KrillionPro.',
  keywords: [
    'unlimited krillion',
    'krillion unlimited',
    'krillion unlimited game',
    'infinite krillion',
    'krillion practice',
  ],
  alternates: {
    canonical: '/unlimited-krillion',
  },
};

export default function UnlimitedKrillionPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: UNLIMITED_FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
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
        <UnlimitedDiveGame />
        <UnlimitedSeoArticle />
      </main>
      <Footer />
    </div>
  );
}
