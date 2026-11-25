import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReverseDiveGame from '@/components/reverse/ReverseDiveGame';
import ReverseSeoArticle, { REVERSE_FAQ_ITEMS } from '@/components/reverse/ReverseSeoArticle';

export const metadata: Metadata = {
  title: 'Krillion Backwards Game | Noillirk — Opposite of Krillion | KrillionPro',
  description:
    'Play the Krillion backwards game (Noillirk) free online. The opposite of Krillion: common correct answers score most. Same mode as Reverse Krillion.',
  keywords: [
    'krillion backwards game',
    'opposite of krillion',
    'noillirk',
    'krillion backwards',
    'krillion noillirk',
    'krillion opposite',
    'opposite krillion',
    'reverse krillion',
    'noilirk',
  ],
  alternates: {
    canonical: '/noillirk',
  },
};

export default function NoillirkPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: REVERSE_FAQ_ITEMS.map((item) => ({
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
        <ReverseDiveGame brand="noillirk" />
        <ReverseSeoArticle />
      </main>
      <Footer />
    </div>
  );
}
