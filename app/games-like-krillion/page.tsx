import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GamesLikeKrillionArticle, {
  GAMES_LIKE_KRILLION_FAQS,
} from '@/components/seo/GamesLikeKrillionArticle';
import { SITE_CONFIG } from '@/lib/site-data';

const PAGE_PATH = '/games-like-krillion';
const PAGE_URL = `${SITE_CONFIG.url}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: '10 Best Games Like Krillion to Play Online',
  description:
    'Looking for games like Krillion? Explore daily trivia, guessing games, brain challenges and fun online alternatives.',
  keywords: [
    'games like Krillion',
    'games similar to Krillion',
    'Krillion alternatives',
    'games like Krillion online',
    'daily guessing games',
    'daily trivia games',
  ],
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    siteName: SITE_CONFIG.name,
    title: '10 Best Games Like Krillion to Play Online',
    description:
      'Looking for games like Krillion? Explore daily trivia, guessing games, brain challenges and fun online alternatives.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: '10 Best Games Like Krillion to Play Online',
    description:
      'Looking for games like Krillion? Explore daily trivia, guessing games, brain challenges and fun online alternatives.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GamesLikeKrillionPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'KrillionPro',
        item: `${SITE_CONFIG.url}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Games like Krillion',
        item: PAGE_URL,
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: GAMES_LIKE_KRILLION_FAQS.map((item) => ({
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbJsonLd, faqJsonLd]),
        }}
      />
      <Header />
      <main className="flex-1">
        <GamesLikeKrillionArticle />
      </main>
      <Footer />
    </div>
  );
}
