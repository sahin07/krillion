import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MinecraftDiveGame from '@/components/minecraft/MinecraftDiveGame';
import MinecraftSeoArticle, {
  MINECRAFT_FAQ_ITEMS,
} from '@/components/minecraft/MinecraftSeoArticle';

export const metadata: Metadata = {
  title: 'Minecraft Krillion Game | Play Rare-Answer Minecraft Trivia | KrillionPro',
  description:
    'Play the Minecraft Krillion game: seven Minecraft prompts, 25 seconds each. Rare correct answers score more. Daily Challenge and Unlimited on KrillionPro.',
  keywords: [
    'minecraft krillion game',
    'minecraft krillion',
    'krillion minecraft',
    'minecraft trivia game',
    'minecraft rare answers',
  ],
  alternates: {
    canonical: '/minecraft-krillion-game',
  },
};

export default function MinecraftKrillionGamePage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: MINECRAFT_FAQ_ITEMS.map((item) => ({
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
        <MinecraftDiveGame />
        <MinecraftSeoArticle />
      </main>
      <Footer />
    </div>
  );
}
