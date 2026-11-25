import Link from 'next/link';
import ArticleShot from '@/components/seo/ArticleShot';
import { bodyFont, displayFont, pixelFont } from '@/lib/fonts';

const FAQS = [
  {
    q: 'What is NBA Krillion?',
    a: 'NBA Krillion on KrillionPro is basketball rare-answer trivia. Seven prompts, twenty-five seconds each — uncommon correct answers score more. It is listed under Sports Krillion.',
  },
  {
    q: 'What is Sports Krillion?',
    a: 'Sports Krillion is the sports games listing page on KrillionPro. NBA Krillion is one of the packs you can open from that directory.',
  },
  {
    q: 'Is there an NBA Krillion unlimited mode?',
    a: 'Yes. Switch to Unlimited on this page for a fresh basketball prompt set with no daily cap. Daily Challenge keeps a shared set for the day.',
  },
  {
    q: 'Is NBA Krillion an official NBA game?',
    a: 'No. It is an independent, fan-made trivia experience on KrillionPro. It is not affiliated with or endorsed by the NBA or its teams.',
  },
] as const;

export const SPORTS_FAQ_ITEMS = FAQS;

const TIERS = [
  { name: 'Plankton / Common', pts: '10–15', note: 'Crowd favorites' },
  { name: 'Schooler', pts: '30', note: 'Solid, less obvious' },
  { name: 'Rare', pts: '60', note: 'Uncommon knowledge' },
  { name: 'Deep Cut', pts: '85', note: 'Niche or specialist picks' },
  { name: 'One in a Krillion', pts: '100', note: 'Deepest hits' },
] as const;

export default function SportsSeoArticle() {
  return (
    <article
      aria-labelledby="nba-krillion-seo-heading"
      className="border-t border-orange-400/20 bg-[#0c0a08] text-slate-200"
    >
      <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <p
          className={`${pixelFont.className} text-[8px] uppercase tracking-[0.18em] text-orange-300 sm:text-[9px]`}
        >
          Guide · Basketball pack
        </p>
        <h2
          id="nba-krillion-seo-heading"
          className={`${displayFont.className} mt-3 text-3xl font-bold text-white sm:text-4xl`}
        >
          How to play NBA Krillion
        </h2>
        <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
          Same rarity twist as Daily Dive — open prompts, many valid answers, uncommon correct picks
          score more — wrapped in basketball questions. Listed under{' '}
          <Link href="/sports-krillion" className="font-semibold text-orange-300 hover:underline">
            Sports Krillion
          </Link>
          . Fan-made on KrillionPro; not an official NBA product.
        </p>

        <section className="mt-12" aria-labelledby="what-heading">
          <h3 id="what-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            What is NBA Krillion?
          </h3>
          <p className={`${bodyFont.className} mt-3 text-base leading-relaxed text-slate-300`}>
            Seven timed prompts about franchises, players, awards, arenas, stats, and play styles.
            Daily Challenge shares one set for the UTC day; Unlimited lets you dive again without
            waiting.
          </p>
        </section>

        <section className="mt-12" aria-labelledby="how-heading">
          <h3 id="how-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            How to play
          </h3>
          <ol
            className={`${bodyFont.className} mt-4 list-decimal space-y-3 pl-5 text-base leading-relaxed text-slate-300`}
          >
            <li>Pick Daily Challenge or Unlimited, then Begin Descent.</li>
            <li>Read the basketball prompt and type one valid answer in 25 seconds.</li>
            <li>Submit or Pass — rarer correct answers earn more points and depth.</li>
            <li>Review the catch at the end, then dive again or browse more sports games.</li>
          </ol>
          <ArticleShot
            src="/screenshots/sports-prompt.png?v=1"
            alt="NBA Krillion prompt screen with timer and answer field"
            caption="Prompt phase — question, timer, answer field, Pass and Dive."
          />
        </section>

        <section className="mt-12" aria-labelledby="scoring-heading">
          <h3 id="scoring-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Scoring and tiers
          </h3>
          <p className={`${bodyFont.className} mt-3 text-base leading-relaxed text-slate-300`}>
            Correct answers score; miss, pass, and timeout score zero. Among hits, rarity maps to
            points:
          </p>
          <ul className="mt-6 space-y-3">
            {TIERS.map((t) => (
              <li key={t.name} className="rounded-xl border border-white/10 bg-[#1a1208]/70 px-4 py-3">
                <p className={`${displayFont.className} text-sm font-semibold text-white`}>
                  {t.name} <span className={`${bodyFont.className} text-orange-300`}>{t.pts} pts</span>
                </p>
                <p className={`${bodyFont.className} mt-1 text-xs text-slate-400`}>{t.note}</p>
              </li>
            ))}
          </ul>
          <ArticleShot
            src="/screenshots/sports-reveal.png?v=1"
            alt="NBA Krillion reveal with tier and points"
            caption="Reveal — a rare hit shows tier, points, and depth."
          />
          <ArticleShot
            src="/screenshots/sports-miss.png?v=1"
            alt="NBA Krillion miss screen"
            caption="Miss — nothing landed; +0 and continue."
          />
        </section>

        <section className="mt-12" aria-labelledby="tips-heading">
          <h3 id="tips-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Tips
          </h3>
          <ul className={`${bodyFont.className} mt-4 space-y-4 text-base leading-relaxed text-slate-300`}>
            <li>
              <strong className="text-white">Skip Lakers / LeBron first</strong> — crowd picks float;
              niche franchises and metrics sink deeper.
            </li>
            <li>
              <strong className="text-white">Read the prompt</strong> — award ≠ player; arena ≠ city
              only when the bank allows both.
            </li>
            <li>
              <strong className="text-white">Browse more sports</strong> — back to{' '}
              <Link href="/sports-krillion" className="font-semibold text-orange-300 hover:underline">
                Sports Krillion
              </Link>{' '}
              for the full sports games list, or compare depth on{' '}
              <Link href="/daily-challenge" className="font-semibold text-orange-300 hover:underline">
                Daily Dive
              </Link>
              .
            </li>
          </ul>
          <ArticleShot
            src="/screenshots/sports-results.png?v=1"
            alt="NBA Krillion dive complete results"
            caption="Results — dive complete with depth, score, and rundown."
          />
        </section>

        <section className="mt-12" aria-labelledby="related-heading">
          <h3 id="related-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Related games
          </h3>
          <ul className={`${bodyFont.className} mt-4 space-y-2 text-base text-slate-300`}>
            <li>
              <Link href="/sports-krillion" className="font-semibold text-orange-300 hover:underline">
                Sports Krillion
              </Link>{' '}
              — sports games listing
            </li>
            <li>
              <Link href="/pokemon-krillion" className="font-semibold text-orange-300 hover:underline">
                Pokémon Krillion
              </Link>
            </li>
            <li>
              <Link href="/minecraft-krillion-game" className="font-semibold text-orange-300 hover:underline">
                Minecraft Krillion
              </Link>
            </li>
            <li>
              <Link href="/daily-challenge" className="font-semibold text-orange-300 hover:underline">
                Daily Dive
              </Link>
            </li>
          </ul>
        </section>

        <section
          className="mt-12 rounded-2xl border border-orange-400/25 bg-[#1a1208]/80 p-5"
          aria-labelledby="disclaimer-heading"
        >
          <h3 id="disclaimer-heading" className={`${displayFont.className} text-lg font-bold text-white`}>
            Fan-made disclaimer
          </h3>
          <p className={`${bodyFont.className} mt-2 text-sm leading-relaxed text-slate-400`}>
            NBA Krillion is unofficial fan trivia on KrillionPro. Not affiliated with or endorsed by
            the NBA or its teams. All trademarks belong to their owners.
          </p>
        </section>

        <section className="mt-12" aria-labelledby="faq-heading">
          <h3 id="faq-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
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
