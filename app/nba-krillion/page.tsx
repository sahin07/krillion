import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SportsDiveGame from '@/components/sports/SportsDiveGame';
import SportsSeoArticle, { SPORTS_FAQ_ITEMS } from '@/components/sports/SportsSeoArticle';

export const metadata: Metadata = {
  title: 'NBA Krillion Game | Rare-Answer Basketball Trivia | KrillionPro',
  description:
    'Play NBA Krillion on KrillionPro: basketball rare-answer trivia — seven prompts, 25 seconds each. Listed under Sports Krillion. Fan-made — not affiliated with the NBA.',
  keywords: [
    'nba krillion',
    'krillion nba',
    'nba krillion game',
    'sports krillion',
    'nba trivia',
  ],
  alternates: { canonical: '/nba-krillion' },
};

export default function NbaKrillionPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: SPORTS_FAQ_ITEMS.map((item) => ({
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
        <SportsDiveGame />
        <SportsSeoArticle />
      </main>
      <Footer />
    </div>
  );
}
