import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReverseDiveGame from '@/components/reverse/ReverseDiveGame';
import ReverseSeoArticle, { REVERSE_FAQ_ITEMS } from '@/components/reverse/ReverseSeoArticle';

export const metadata: Metadata = {
  title: 'Opposite of Krillion | Reverse Krillion & Krillion Backwards Game | KrillionPro',
  description:
    'Looking for the opposite of Krillion or a Krillion backwards game? Play Reverse Krillion (Noillirk) free — common correct answers score most.',
  keywords: [
    'opposite of krillion',
    'krillion backwards game',
    'reverse krillion',
    'krillion opposite',
    'opposite krillion',
    'krillion noillirk',
    'noillirk',
    'reverse krillion game',
    'krillion backwards',
  ],
  alternates: {
    canonical: '/reverse-krillion',
  },
};

export default function ReverseKrillionPage() {
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
        <ReverseDiveGame brand="reverse" />
        <ReverseSeoArticle />
      </main>
      <Footer />
    </div>
  );
}
