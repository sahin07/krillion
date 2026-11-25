import Link from 'next/link';
import ArticleShot from '@/components/seo/ArticleShot';
import { bodyFont, displayFont, pixelFont } from '@/lib/fonts';

const FAQS = [
  {
    q: 'What is Long Shot Krillion?',
    a: 'Long Shot Krillion on KrillionPro is rare-answer trivia with a longer clock — seven prompts, thirty-five seconds each. Uncommon correct answers are the long shot: they score more and sink deeper.',
  },
  {
    q: 'How is Long Shot Krillion different from Daily Dive?',
    a: 'Same rarity twist — rarer correct answers score more — but Long Shot gives you more time per prompt (35s) so you can hunt deeper picks instead of the first crowd answer.',
  },
  {
    q: 'Is Long Shot Krillion a basketball game?',
    a: 'Prompts lean sports and hoops (shots, underdogs, clutch moments), but it is still Krillion rare-answer trivia, not a shooting sim. Fan-made — not affiliated with the NBA or other leagues.',
  },
  {
    q: 'Is there a Long Shot unlimited mode?',
    a: 'Yes. Switch to Unlimited on this page for a fresh long-shot prompt set with no daily cap. Daily Challenge keeps a shared set for the day.',
  },
] as const;

export const LONG_SHOT_FAQ_ITEMS = FAQS;

const TIERS = [
  { name: 'Plankton / Common', pts: '10–15', note: 'Safe, crowded picks' },
  { name: 'Schooler', pts: '30', note: 'Solid, less obvious' },
  { name: 'Rare', pts: '60', note: 'A real long shot' },
  { name: 'Deep Cut', pts: '85', note: 'Niche specialist picks' },
  { name: 'One in a Krillion', pts: '100', note: 'Deepest hits' },
] as const;

export default function LongShotSeoArticle() {
  return (
    <article
      aria-labelledby="long-shot-seo-heading"
      className="border-t border-amber-400/20 bg-[#0c0a08] text-slate-200"
    >
      <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <p
          className={`${pixelFont.className} text-[8px] uppercase tracking-[0.18em] text-amber-300 sm:text-[9px]`}
        >
          Guide · Long Shot Krillion
        </p>
        <h2
          id="long-shot-seo-heading"
          className={`${displayFont.className} mt-3 text-3xl font-bold text-white sm:text-4xl`}
        >
          How to play Long Shot Krillion
        </h2>
        <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
          Take the long shot: skip the first answer everyone types and dig for rarer valid picks. You
          get thirty-five seconds per prompt — longer than Daily Dive — so the clock rewards patience.
          Listed under{' '}
          <Link href="/sports-krillion" className="font-semibold text-amber-300 hover:underline">
            Sports Krillion
          </Link>
          .
        </p>

        <section className="mt-12" aria-labelledby="what-heading">
          <h3 id="what-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            What is Long Shot Krillion?
          </h3>
          <p className={`${bodyFont.className} mt-3 text-base leading-relaxed text-slate-300`}>
            A sports-leaning rare-answer dive covering shots, range shooters, underdogs, metrics, and
            clutch moments. Searches for long shot, long shot game, and long shot krillion land here.
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
            <li>Read the prompt — you have 35 seconds.</li>
            <li>Submit a valid answer or Pass — rarer hits earn more points and depth.</li>
            <li>Review the catch, then dive again or browse more sports games.</li>
          </ol>
          <ArticleShot
            src="/screenshots/long-shot-prompt.png?v=1"
            alt="Long Shot Krillion prompt with timer and answer field"
            caption="Prompt phase — longer timer, answer field, Pass and Dive."
          />
        </section>

        <section className="mt-12" aria-labelledby="scoring-heading">
          <h3 id="scoring-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Scoring and tiers
          </h3>
          <p className={`${bodyFont.className} mt-3 text-base leading-relaxed text-slate-300`}>
            Correct answers score; miss, pass, and timeout score zero. Among hits, rarity maps to
            points — the long shot sits at the deep end:
          </p>
          <ul className="mt-6 space-y-3">
            {TIERS.map((t) => (
              <li key={t.name} className="rounded-xl border border-white/10 bg-[#1a1208]/70 px-4 py-3">
                <p className={`${displayFont.className} text-sm font-semibold text-white`}>
                  {t.name} <span className={`${bodyFont.className} text-amber-300`}>{t.pts} pts</span>
                </p>
                <p className={`${bodyFont.className} mt-1 text-xs text-slate-400`}>{t.note}</p>
              </li>
            ))}
          </ul>
          <ArticleShot
            src="/screenshots/long-shot-reveal.png?v=1"
            alt="Long Shot Krillion rare reveal with tier and points"
            caption="Reveal — a rare long shot shows tier, points, and depth."
          />
          <ArticleShot
            src="/screenshots/long-shot-miss.png?v=1"
            alt="Long Shot Krillion miss screen"
            caption="Miss — nothing landed; +0 and continue."
          />
        </section>

        <section className="mt-12" aria-labelledby="tips-heading">
          <h3 id="tips-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Tips
          </h3>
          <ul className={`${bodyFont.className} mt-4 space-y-4 text-base leading-relaxed text-slate-300`}>
            <li>
              <strong className="text-white">Use the extra seconds</strong> — 35s is enough to skip
              Curry / three-pointer and hunt a deeper valid pick.
            </li>
            <li>
              <strong className="text-white">Read the lane</strong> — shot ≠ player; underdog ≠
              metric.
            </li>
            <li>
              <strong className="text-white">Pair with NBA Krillion</strong> — then compare depth on{' '}
              <Link href="/nba-krillion" className="font-semibold text-amber-300 hover:underline">
                NBA Krillion
              </Link>{' '}
              or browse the{' '}
              <Link href="/sports-krillion" className="font-semibold text-amber-300 hover:underline">
                Sports Krillion
              </Link>{' '}
              list.
            </li>
          </ul>
          <ArticleShot
            src="/screenshots/long-shot-results.png?v=1"
            alt="Long Shot Krillion dive complete results"
            caption="Results — dive complete with depth, score, and rundown."
          />
        </section>

        <section className="mt-12" aria-labelledby="related-heading">
          <h3 id="related-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Related games
          </h3>
          <ul className={`${bodyFont.className} mt-4 space-y-2 text-base text-slate-300`}>
            <li>
              <Link href="/sports-krillion" className="font-semibold text-amber-300 hover:underline">
                Sports Krillion
              </Link>{' '}
              — sports games listing
            </li>
            <li>
              <Link href="/nba-krillion" className="font-semibold text-amber-300 hover:underline">
                NBA Krillion
              </Link>
            </li>
            <li>
              <Link href="/daily-challenge" className="font-semibold text-amber-300 hover:underline">
                Daily Dive
              </Link>
            </li>
          </ul>
        </section>

        <section
          className="mt-12 rounded-2xl border border-amber-400/25 bg-[#1a1208]/80 p-5"
          aria-labelledby="disclaimer-heading"
        >
          <h3 id="disclaimer-heading" className={`${displayFont.className} text-lg font-bold text-white`}>
            Fan-made disclaimer
          </h3>
          <p className={`${bodyFont.className} mt-2 text-sm leading-relaxed text-slate-400`}>
            Long Shot Krillion is unofficial fan trivia on KrillionPro. Not affiliated with or
            endorsed by the NBA or any league, team, or brand named in prompts. All trademarks belong
            to their owners.
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
                className="group rounded-2xl border border-white/10 bg-[#1a1208]/70 px-5 py-4 open:border-amber-400/30"
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
