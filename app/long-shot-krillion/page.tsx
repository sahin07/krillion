import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LongShotDiveGame from '@/components/long-shot/LongShotDiveGame';
import LongShotSeoArticle, { LONG_SHOT_FAQ_ITEMS } from '@/components/long-shot/LongShotSeoArticle';

export const metadata: Metadata = {
  title: 'Long Shot Krillion Game | Rare-Answer Trivia | KrillionPro',
  description:
    'Play Long Shot Krillion: seven sports prompts, 35 seconds each. Uncommon correct answers are the long shot — they score more. Daily + Unlimited. Fan-made trivia on KrillionPro.',
  keywords: [
    'long shot krillion',
    'long shot',
    'long shot game',
    'long shot game krillion',
    'long shot krillion game',
    'longshot game',
    'long shot hoops',
  ],
  alternates: { canonical: '/long-shot-krillion' },
};

export default function LongShotPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: LONG_SHOT_FAQ_ITEMS.map((item) => ({
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
        <LongShotDiveGame />
        <LongShotSeoArticle />
      </main>
      <Footer />
    </div>
  );
}
