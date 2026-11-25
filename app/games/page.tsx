import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { bodyFont, displayFont, pixelFont } from '@/lib/fonts';
import { RELATED_GAMES } from '@/lib/game-pages';
import { SITE_CONFIG } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'Krillion Games Hub | Daily, Unlimited & Themed Packs | KrillionPro',
  description:
    'Browse Krillion games on KrillionPro: Daily Krillion, Unlimited Krillion, Minecraft Krillion, themed modes, and leaderboards. Free rare-answer trivia in the browser.',
  keywords: [
    'krillion games',
    'krillion game',
    'krillion type games',
    'daily krillion',
    'unlimited krillion',
    'minecraft krillion',
  ],
  alternates: {
    canonical: '/games',
  },
};

const HUB_CARDS = [
  {
    href: '/daily-challenge',
    title: 'Daily Krillion',
    kicker: 'Shared dive',
    body: 'Eight prompts. Twenty seconds each. One shared Daily Dive for everyone — rare answers sink deeper.',
  },
  {
    href: '/one-in-a-krillion',
    title: 'One in a Krillion',
    kicker: 'Rare hunt',
    body: 'Seven signals, 25 seconds each. Rare-answer and streak bonuses, then a final rarity rank.',
  },
  {
    href: '/unlimited-krillion',
    title: 'Unlimited Krillion',
    kicker: 'Practice anytime',
    body: 'Six prompts per dive. Pick a charted pack and dive again — krillion unlimited game practice with no daily wait.',
  },
  {
    href: '/reverse-krillion',
    title: 'Noillirk / Reverse Krillion',
    kicker: 'Common wins',
    body: 'Krillion backwards: common correct answers score most. Think like everybody and rise.',
  },
  {
    href: '/pokemon-krillion',
    title: 'Pokémon Krillion',
    kicker: 'Themed pack',
    body: 'Pokémon-themed rare-answer trivia. Fan-made — not affiliated with Nintendo or The Pokémon Company.',
  },
  {
    href: '/sports-krillion',
    title: 'Sports Krillion',
    kicker: 'Sports directory',
    body: 'Listing of sports-themed Krillion games — NBA Krillion, Long Shot Krillion, and more as they launch.',
  },
  {
    href: '/long-shot-krillion',
    title: 'Long Shot Krillion',
    kicker: 'Longer clock',
    body: 'Seven prompts, 35 seconds each. Uncommon correct answers are the long shot — they score more.',
  },
  {
    href: '/puffer-party-krillion',
    title: 'Puffer Party Krillion',
    kicker: 'Don’t Fall party',
    body: 'Jump hex tiles, survive dropping floors, three rounds. Party action — not Daily Dive trivia.',
  },
  {
    href: '/cosmillion',
    title: 'Cosmillion Moonshot',
    kicker: 'Space party trivia',
    body: 'Multi-fit space prompts. Rare correct picks among the crew score more than popular ones.',
  },
  {
    href: '/minecraft-krillion-game',
    title: 'Minecraft Krillion',
    kicker: 'Themed pack',
    body: 'Minecraft-themed rare-answer trivia. Same rarity twist — fan-made, not affiliated with Mojang.',
  },
  {
    href: '/stranger-things-krillion',
    title: 'Stranger Things Krillion',
    kicker: 'Upside Down challenge',
    body: 'Seven mysterious rounds, rarity meter, survival ranks. Fan-made — not affiliated with Netflix.',
  },
  {
    href: '/farflung',
    title: 'Farflung',
    kicker: 'Cosmic exploration',
    body: 'Seven rare-answer rounds among distant worlds and lost places. Chase the Farflung Legend rank.',
  },
  {
    href: '/krillion-animal',
    title: 'Animal Krillion',
    kicker: 'Wildlife safari',
    body: 'Think beyond the animal kingdom — seven rare-answer wildlife rounds. Chase the Animal Legend rank.',
  },
  {
    href: '/wordplay-krillion',
    title: 'Wordplay Krillion',
    kicker: 'Rare words',
    body: 'Think smart, find rare words — rhymes, synonyms, puzzles across seven rounds. Chase Wordplay Legend.',
  },
  {
    href: '/science-krillion',
    title: 'Science Krillion',
    kicker: 'STEM discoveries',
    body: 'Think beyond the textbook — physics, biology, chemistry, space. Chase Scientific Legend.',
  },
  {
    href: '/medical-krillion',
    title: 'Medical Krillion',
    kicker: 'Clinical vocabulary',
    body: 'Anatomy, instruments, pharmacology — uncommon correct answers score more. Chase Medical Legend.',
  },
  {
    href: '/great-ape-krillion',
    title: 'Great Ape Krillion',
    kicker: 'Primates only',
    body: 'Gorillas, chimps, orangutans, bonobos — rarer valid species score more. Chase Ape Legend.',
  },
  {
    href: '/leaderboards',
    title: 'Leaderboards',
    kicker: 'Compare depth',
    body: 'Track scores and depth across dives as boards expand.',
  },
] as const;

export default function GamesPage() {
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Krillion Games on KrillionPro',
    description: SITE_CONFIG.description,
    numberOfItems: HUB_CARDS.length,
    itemListElement: HUB_CARDS.map((card, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: card.title,
      url: `${SITE_CONFIG.url}${card.href}`,
      description: card.body,
    })),
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <Header />
      <main className="flex-1 bg-[#040816] text-slate-200">
        <section className="border-b border-[#67e8f9]/15">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
            <p className={`${pixelFont.className} text-[8px] uppercase tracking-[0.18em] text-cyan-300 sm:text-[9px]`}>
              KrillionPro · Krillion Games
            </p>
            <h1
              className={`${displayFont.className} mt-3 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl`}
            >
              Krillion Games Hub
            </h1>
            <p className={`${bodyFont.className} mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg`}>
              Browse Krillion games in one hub — Daily Krillion, Unlimited Krillion, themed packs, and
              leaderboards. Same rarity twist: uncommon correct answers sink deeper.
            </p>

            <nav aria-label="Related games" className="mt-8">
              <ul className="flex flex-wrap gap-2">
                {RELATED_GAMES.map((game) => (
                  <li key={game.id}>
                    <Link
                      href={game.href}
                      className={`${pixelFont.className} inline-flex items-center rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-[8px] tracking-wide text-slate-300 transition-colors hover:border-cyan-400/50 hover:text-white sm:text-[9px]`}
                    >
                      {game.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        <section aria-labelledby="hub-modes-heading" className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <h2
            id="hub-modes-heading"
            className={`${displayFont.className} text-2xl font-bold text-white sm:text-3xl`}
          >
            Play a Krillion game
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HUB_CARDS.map((card) => (
              <li key={card.href}>
                <Link
                  href={card.href}
                  className="flex h-full flex-col rounded-2xl border border-[#67e8f9]/25 bg-[#07122b]/85 p-5 transition-colors hover:border-cyan-300/50 hover:bg-[#0a1a3a]"
                >
                  <p className={`${pixelFont.className} text-[8px] tracking-wider text-cyan-300`}>
                    {card.kicker}
                  </p>
                  <h3 className={`${displayFont.className} mt-2 text-xl font-bold text-white`}>
                    {card.title}
                  </h3>
                  <p className={`${bodyFont.className} mt-3 flex-1 text-sm leading-relaxed text-slate-300`}>
                    {card.body}
                  </p>
                  <span className={`${bodyFont.className} mt-5 text-sm font-semibold text-cyan-200`}>
                    Play →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
