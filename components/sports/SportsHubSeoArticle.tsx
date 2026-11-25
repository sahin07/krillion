import Link from 'next/link';
import { bodyFont, displayFont, pixelFont } from '@/lib/fonts';

const FAQS = [
  {
    q: 'What is Sports Krillion?',
    a: 'Sports Krillion on KrillionPro is the sports games listing page — a directory of sports-themed rare-answer trivia packs. Pick a game like NBA Krillion to play.',
  },
  {
    q: 'What sports games are on Sports Krillion?',
    a: 'NBA Krillion and Long Shot Krillion are live now. More sports packs will be listed on this page as they ship.',
  },
  {
    q: 'What is NBA Krillion?',
    a: 'NBA Krillion is a basketball rare-answer trivia dive listed under Sports Krillion. Seven prompts, twenty-five seconds each — uncommon correct answers score more.',
  },
  {
    q: 'Is Sports Krillion an official league product?',
    a: 'No. Sports Krillion and every pack on this list are independent, fan-made trivia on KrillionPro. Not affiliated with or endorsed by the NBA or other leagues.',
  },
] as const;

export const SPORTS_HUB_FAQ_ITEMS = FAQS;

export default function SportsHubSeoArticle() {
  return (
    <article
      aria-labelledby="sports-hub-seo-heading"
      className="border-t border-orange-400/20 bg-[#080604] text-slate-200"
    >
      <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <p
          className={`${pixelFont.className} text-[8px] uppercase tracking-[0.18em] text-orange-300 sm:text-[9px]`}
        >
          Guide · Sports directory
        </p>
        <h2
          id="sports-hub-seo-heading"
          className={`${displayFont.className} mt-3 text-3xl font-bold text-white sm:text-4xl`}
        >
          What is Sports Krillion?
        </h2>
        <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
          Sports Krillion is not a single dive — it is the listing page for sports-themed Krillion
          games on KrillionPro. Open a card above to play that pack. Same rarity twist as Daily Dive:
          many valid answers, uncommon correct picks score more.
        </p>

        <section className="mt-12" aria-labelledby="how-hub-heading">
          <h3 id="how-hub-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            How to use this page
          </h3>
          <ol
            className={`${bodyFont.className} mt-4 list-decimal space-y-3 pl-5 text-base leading-relaxed text-slate-300`}
          >
            <li>Browse the Sports games list above.</li>
            <li>
              Open a live pack such as{' '}
              <Link href="/nba-krillion" className="font-semibold text-orange-300 hover:underline">
                NBA Krillion
              </Link>
              .
            </li>
            <li>On that game page, pick Daily Challenge or Unlimited and Begin Descent.</li>
          </ol>
        </section>

        <section className="mt-12" aria-labelledby="hub-related-heading">
          <h3
            id="hub-related-heading"
            className={`${displayFont.className} text-2xl font-bold text-white`}
          >
            Related games
          </h3>
          <ul className={`${bodyFont.className} mt-4 space-y-2 text-base text-slate-300`}>
            <li>
              <Link href="/nba-krillion" className="font-semibold text-orange-300 hover:underline">
                NBA Krillion
              </Link>{' '}
              — basketball pack on this list
            </li>
            <li>
              <Link href="/pokemon-krillion" className="font-semibold text-orange-300 hover:underline">
                Pokémon Krillion
              </Link>
            </li>
            <li>
              <Link href="/daily-challenge" className="font-semibold text-orange-300 hover:underline">
                Daily Dive
              </Link>
            </li>
            <li>
              <Link href="/games" className="font-semibold text-orange-300 hover:underline">
                All Krillion Games
              </Link>
            </li>
          </ul>
        </section>

        <section
          className="mt-12 rounded-2xl border border-orange-400/25 bg-[#1a1208]/80 p-5"
          aria-labelledby="hub-disclaimer-heading"
        >
          <h3
            id="hub-disclaimer-heading"
            className={`${displayFont.className} text-lg font-bold text-white`}
          >
            Fan-made disclaimer
          </h3>
          <p className={`${bodyFont.className} mt-2 text-sm leading-relaxed text-slate-400`}>
            Sports Krillion is an unofficial fan directory on KrillionPro. Not affiliated with or
            endorsed by the NBA, NFL, FIFA, or any team or league. All trademarks belong to their
            owners.
          </p>
        </section>

        <section className="mt-12" aria-labelledby="hub-faq-heading">
          <h3 id="hub-faq-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            FAQ
          </h3>
          <div className="mt-6 space-y-3">
            {FAQS.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-white/10 bg-[#1a1208]/70 px-5 py-4 open:border-orange-400/30"
              >
                <summary
                  className={`${bodyFont.className} cursor-pointer list-none text-base font-semibold text-white`}
                >
                  {item.q}
                </summary>
                <p className={`${bodyFont.className} mt-3 text-sm leading-relaxed text-slate-300`}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
