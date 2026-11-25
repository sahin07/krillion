import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PokemonDiveGame from '@/components/pokemon/PokemonDiveGame';
import PokemonSeoArticle, { POKEMON_FAQ_ITEMS } from '@/components/pokemon/PokemonSeoArticle';

export const metadata: Metadata = {
  title: 'Pokémon Krillion Game | Rare-Answer Pokémon Trivia | KrillionPro',
  description:
    'Play Pokémon Krillion: seven Pokémon prompts, 25 seconds each. Rare correct answers score more. Daily Challenge and Unlimited. Fan-made — not affiliated with Nintendo.',
  keywords: [
    'pokemon krillion',
    'pokémon krillion',
    'krillion pokemon',
    'pokemon krillion game',
    'pokemon trivia game',
  ],
  alternates: {
    canonical: '/pokemon-krillion',
  },
};

export default function PokemonKrillionPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: POKEMON_FAQ_ITEMS.map((item) => ({
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
        <PokemonDiveGame />
        <PokemonSeoArticle />
      </main>
      <Footer />
    </div>
  );
}
