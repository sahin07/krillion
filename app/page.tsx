import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturedDailyChallenge from '@/components/FeaturedDailyChallenge';
import GameCategories from '@/components/GameCategories';
import AboutKrillionSection from '@/components/AboutKrillionSection';
import WhyPlaySection from '@/components/WhyPlaySection';
import FaqSection from '@/components/FaqSection';
import HomeSeoArticle from '@/components/HomeSeoArticle';
import Footer from '@/components/Footer';
import { FAQ_ITEMS } from '@/lib/site-data';

export default function HomePage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedDailyChallenge />
        <GameCategories />
        <AboutKrillionSection />
        <WhyPlaySection />
        <HomeSeoArticle />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
