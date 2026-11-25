import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SportsHubSeoArticle, { SPORTS_HUB_FAQ_ITEMS } from '@/components/sports/SportsHubSeoArticle';
import { bodyFont, displayFont, pixelFont } from '@/lib/fonts';
import { RELATED_GAMES } from '@/lib/game-pages';
import { SITE_CONFIG } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'Sports Krillion Games | NBA & Sports Trivia Packs | KrillionPro',
  description:
    'Sports Krillion on KrillionPro is the sports games listing: browse NBA Krillion and other sports rare-answer trivia packs. Fan-made — not affiliated with any league.',
  keywords: [
    'sports krillion',
    'krillion sports',
    'sports krillion games',
    'nba krillion',
    'sports trivia games',
  ],
  alternates: { canonical: '/sports-krillion' },
};

/** Live sports game pages listed on the Sports Krillion hub. Add new packs here as they ship. */
const SPORTS_GAMES = [
  {
    href: '/nba-krillion',
    title: 'NBA Krillion',
    kicker: 'Basketball',
    body: 'Seven basketball prompts, 25 seconds each. Rare correct answers sink deeper. Daily Challenge + Unlimited.',
    cta: 'Play NBA →',
    thumb: '/screenshots/sports-prompt.png',
    thumbAlt: 'NBA Krillion gameplay prompt with timer and answer field',
  },
  {
    href: '/long-shot-krillion',
    title: 'Long Shot Krillion',
    kicker: 'Longer clock',
    body: 'Seven sports prompts, 35 seconds each. Uncommon correct answers are the long shot — they score more.',
    cta: 'Play Long Shot →',
    thumb: '/screenshots/long-shot-prompt.png',
    thumbAlt: 'Long Shot Krillion gameplay prompt with longer timer',
  },
] as const;

export default function SportsKrillionHubPage() {
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Sports Krillion games on KrillionPro',
    description:
      'Directory of sports-themed Krillion rare-answer trivia games, including NBA Krillion.',
    numberOfItems: SPORTS_GAMES.length,
    itemListElement: SPORTS_GAMES.map((game, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: game.title,
      url: `${SITE_CONFIG.url}${game.href}`,
      description: game.body,
    })),
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: SPORTS_HUB_FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main className="flex-1 bg-[#0c0a08] text-slate-200">
        <section className="border-b border-orange-400/20">
          <div
            className="relative overflow-hidden"
            style={{
              backgroundImage: 'url(/sports-krillion-bg.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-[#0c0a08]/82" aria-hidden="true" />
            <div className="relative mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
              <p
                className={`${pixelFont.className} text-[8px] uppercase tracking-[0.18em] text-orange-300 sm:text-[9px]`}
              >
                KrillionPro · Sports directory
              </p>
              <h1
                className={`${displayFont.className} mt-3 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl`}
              >
                Sports Krillion
              </h1>
              <p
                className={`${bodyFont.className} mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg`}
              >
                Browse sports-themed Krillion games — pick a pack below and dive. Uncommon correct
                answers sink deeper. Fan-made; not affiliated with the NBA or other leagues.
              </p>

              <nav aria-label="Related games" className="mt-8">
                <ul className="flex flex-wrap gap-2">
                  {RELATED_GAMES.map((game) => (
                    <li key={game.id}>
                      <Link
                        href={game.href}
                        className={`${pixelFont.className} inline-flex items-center rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[8px] tracking-wide text-slate-300 transition-colors hover:border-orange-400/50 hover:text-white sm:text-[9px]`}
                      >
                        {game.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="sports-games-heading"
          className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8"
        >
          <h2
            id="sports-games-heading"
            className={`${displayFont.className} text-2xl font-bold text-white sm:text-3xl`}
          >
            Sports games
          </h2>
          <p className={`${bodyFont.className} mt-2 max-w-2xl text-sm text-slate-400`}>
            Each card opens a full Sports Krillion game page. More sports packs will appear here as
            they launch.
          </p>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SPORTS_GAMES.map((game) => (
              <li key={game.href}>
                <Link
                  href={game.href}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-orange-400/35 bg-[#1a1208] shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition-[border-color,transform,box-shadow] hover:-translate-y-0.5 hover:border-orange-300/70 hover:shadow-[0_16px_48px_rgba(251,146,60,0.18)]"
                >
                  <span className="relative aspect-[16/10] w-full overflow-hidden border-b border-orange-400/20 bg-black/50">
                    <img
                      src={game.thumb}
                      alt={game.thumbAlt}
                      className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <span
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a1208]/80 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                    <span
                      className={`${pixelFont.className} absolute left-3 top-3 rounded-md border border-orange-300/40 bg-black/65 px-2 py-1 text-[8px] tracking-wider text-orange-200`}
                    >
                      {game.kicker}
                    </span>
                  </span>
                  <span className="flex flex-1 flex-col p-5">
                    <h3 className={`${displayFont.className} text-xl font-bold text-white`}>
                      {game.title}
                    </h3>
                    <p
                      className={`${bodyFont.className} mt-2 flex-1 text-sm leading-relaxed text-slate-300`}
                    >
                      {game.body}
                    </p>
                    <span
                      className={`${bodyFont.className} mt-5 inline-flex items-center text-sm font-semibold text-orange-200 transition-colors group-hover:text-orange-100`}
                    >
                      {game.cta}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <SportsHubSeoArticle />
      </main>
      <Footer />
    </div>
  );
}
