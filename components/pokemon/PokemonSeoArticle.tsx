import Link from 'next/link';
import ArticleShot from '@/components/seo/ArticleShot';
import { bodyFont, displayFont, pixelFont } from '@/lib/fonts';

const FAQS = [
  {
    q: 'What is the Pokémon Krillion game?',
    a: 'Pokémon Krillion on KrillionPro is rare-answer trivia with Pokémon-themed prompts. You get seven prompts, twenty-five seconds each, and uncommon correct answers score more points and depth.',
  },
  {
    q: 'Is Pokémon Krillion the same as Pokemon Krillion?',
    a: 'Yes — searches for Pokémon Krillion and Pokemon Krillion point to the same fan-made mode on KrillionPro.',
  },
  {
    q: 'How is it different from a normal Pokémon quiz?',
    a: 'A normal quiz often has one correct choice. Pokémon Krillion accepts many valid answers per prompt, and your score depends on how uncommon your correct answer is.',
  },
  {
    q: 'Is there a Pokémon Krillion unlimited mode?',
    a: 'Yes. Switch to Unlimited on this page for a fresh Pokémon prompt set with no daily cap. Daily Challenge keeps a shared set for the day.',
  },
  {
    q: 'Is Pokémon Krillion an official Nintendo game?',
    a: 'No. It is an independent, fan-made trivia experience on KrillionPro. It is not affiliated with or endorsed by Nintendo, Game Freak, or The Pokémon Company. Pokémon is a trademark of their respective owners.',
  },
] as const;

export const POKEMON_FAQ_ITEMS = FAQS;

const TIERS = [
  { name: 'Plankton / Common', pts: '10–15', note: 'Crowd favorites' },
  { name: 'Schooler', pts: '30', note: 'Solid, less obvious' },
  { name: 'Rare', pts: '60', note: 'Uncommon knowledge' },
  { name: 'Deep Cut', pts: '85', note: 'Niche or newer picks' },
  { name: 'One in a Krillion', pts: '100', note: 'Deepest hits' },
] as const;

export default function PokemonSeoArticle() {
  return (
    <article
      aria-labelledby="pokemon-krillion-seo-heading"
      className="border-t border-yellow-400/20 bg-[#140810] text-slate-200"
    >
      <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <p className={`${pixelFont.className} text-[8px] uppercase tracking-[0.18em] text-yellow-300 sm:text-[9px]`}>
          Guide · Themed pack
        </p>
        <h2
          id="pokemon-krillion-seo-heading"
          className={`${displayFont.className} mt-3 text-3xl font-bold text-white sm:text-4xl`}
        >
          How to play Pokémon Krillion
        </h2>
        <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
          Same rarity twist as Daily Dive — open prompts, many valid answers, uncommon correct picks score
          more — wrapped in Pokémon-flavoured questions. Fan-made on KrillionPro; not an official Pokémon
          product.
        </p>

        <section className="mt-12" aria-labelledby="what-heading">
          <h3 id="what-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            What is Pokémon Krillion?
          </h3>
          <p className={`${bodyFont.className} mt-3 text-base leading-relaxed text-slate-300`}>
            Seven timed prompts about starters, types, legendaries, regions, moves, trainers, and items. Daily
            Challenge shares one set for the UTC day; Unlimited lets you dive again without waiting.
          </p>
        </section>

        <section className="mt-12" aria-labelledby="how-heading">
          <h3 id="how-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            How to play
          </h3>
          <ol className={`${bodyFont.className} mt-4 list-decimal space-y-3 pl-5 text-base leading-relaxed text-slate-300`}>
            <li>Pick Daily Challenge or Unlimited, then Begin Descent.</li>
            <li>Read the Pokémon prompt and type one valid answer in 25 seconds.</li>
            <li>Submit or Pass — rarer correct answers earn more points and depth.</li>
            <li>Review the catch at the end, then dive again or switch modes.</li>
          </ol>
          <ArticleShot
            src="/screenshots/pokemon-prompt.png?v=1"
            alt="Pokémon Krillion prompt screen with timer and answer field"
            caption="Prompt phase — question, timer, answer field, Pass and Dive."
          />
        </section>

        <section className="mt-12" aria-labelledby="scoring-heading">
          <h3 id="scoring-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Scoring and tiers
          </h3>
          <p className={`${bodyFont.className} mt-3 text-base leading-relaxed text-slate-300`}>
            Correct answers score; miss, pass, and timeout score zero. Among hits, rarity maps to points:
          </p>
          <ul className="mt-6 space-y-3">
            {TIERS.map((t) => (
              <li key={t.name} className="rounded-xl border border-white/10 bg-[#1a0a12]/70 px-4 py-3">
                <p className={`${displayFont.className} text-sm font-semibold text-white`}>
                  {t.name} <span className={`${bodyFont.className} text-yellow-300`}>{t.pts} pts</span>
                </p>
                <p className={`${bodyFont.className} mt-1 text-xs text-slate-400`}>{t.note}</p>
              </li>
            ))}
          </ul>
          <ArticleShot
            src="/screenshots/pokemon-reveal.png?v=1"
            alt="Pokémon Krillion reveal with tier and points"
            caption="Reveal — a rare hit shows tier, points, and depth."
          />
          <ArticleShot
            src="/screenshots/pokemon-miss.png?v=1"
            alt="Pokémon Krillion miss screen"
            caption="Miss — nothing landed; +0 and continue."
          />
        </section>

        <section className="mt-12" aria-labelledby="tips-heading">
          <h3 id="tips-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Tips
          </h3>
          <ul className={`${bodyFont.className} mt-4 space-y-4 text-base leading-relaxed text-slate-300`}>
            <li>
              <strong className="text-white">Skip the first thought</strong> — Pikachu and Fire are crowd
              picks; newer gens and niche names go deeper.
            </li>
            <li>
              <strong className="text-white">Read the prompt</strong> — starter ≠ any Pokémon; region ≠ city.
            </li>
            <li>
              <strong className="text-white">Pair with ocean Daily Dive</strong> — warm up here, then compare
              depth on{' '}
              <Link href="/daily-challenge" className="font-semibold text-yellow-300 hover:underline">
                Daily Dive
              </Link>
              .
            </li>
          </ul>
          <ArticleShot
            src="/screenshots/pokemon-results.png?v=1"
            alt="Pokémon Krillion dive complete results"
            caption="Results — dive complete with depth, score, and rundown."
          />
        </section>

        <section className="mt-12" aria-labelledby="related-heading">
          <h3 id="related-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Related games
          </h3>
          <ul className={`${bodyFont.className} mt-4 space-y-2 text-base text-slate-300`}>
            <li>
              <Link href="/minecraft-krillion-game" className="font-semibold text-yellow-300 hover:underline">
                Minecraft Krillion
              </Link>{' '}
              — another themed rarity pack
            </li>
            <li>
              <Link href="/daily-challenge" className="font-semibold text-yellow-300 hover:underline">
                Daily Dive
              </Link>{' '}
              — shared ocean set
            </li>
            <li>
              <Link href="/reverse-krillion" className="font-semibold text-yellow-300 hover:underline">
                Noillirk / Reverse
              </Link>{' '}
              — common answers win
            </li>
          </ul>
        </section>

        <section className="mt-12 rounded-2xl border border-yellow-400/25 bg-[#1a0a12]/80 p-5" aria-labelledby="disclaimer-heading">
          <h3 id="disclaimer-heading" className={`${displayFont.className} text-lg font-bold text-white`}>
            Fan-made disclaimer
          </h3>
          <p className={`${bodyFont.className} mt-2 text-sm leading-relaxed text-slate-400`}>
            Pokémon Krillion is an unofficial fan trivia mode on KrillionPro. It is not affiliated with,
            endorsed by, or associated with Nintendo, Game Freak, Creatures Inc., or The Pokémon Company.
            Pokémon and related names are trademarks of their respective owners.
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
                className="group rounded-2xl border border-white/10 bg-[#1a0a12]/70 px-5 py-4 open:border-yellow-400/30"
              >
                <summary
                  className={`${bodyFont.className} cursor-pointer list-none text-base font-semibold text-white`}
                >
                  {item.q}
                </summary>
                <p className={`${bodyFont.className} mt-3 text-sm leading-relaxed text-slate-300`}>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
