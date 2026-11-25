import Link from 'next/link';
import ArticleShot from '@/components/seo/ArticleShot';
import { bodyFont, displayFont, pixelFont } from '@/lib/fonts';
import { STRANGER_THINGS_CONFIG } from '@/lib/dive/stranger-things';

const TIERS = [
  { name: 'Common', pts: '10', note: 'Crowd favorite' },
  { name: 'Unusual', pts: '15', note: 'A slight swerve many still share' },
  { name: 'Rare', pts: '30', note: 'Solid and specific' },
  { name: 'Very Rare', pts: '60', note: 'Uncommon · +10 rare bonus' },
  { name: 'Ultra Rare', pts: '85', note: 'Niche · +15 rare bonus' },
  { name: 'Upside Down Legendary', pts: '100', note: 'Almost nobody else · +20 rare bonus' },
] as const;

const RANKS = [
  { name: 'Hawkins Visitor', note: 'Beginner' },
  { name: 'Mystery Seeker', note: 'Intermediate' },
  { name: 'Lab Escapee', note: 'Advanced' },
  { name: 'Dimension Explorer', note: 'Expert' },
  { name: 'Upside Down Legend', note: 'Highest rank' },
] as const;

const CATEGORIES = [
  {
    title: 'Mysterious Locations',
    body: 'Strange towns, abandoned buildings, and secret places.',
  },
  {
    title: 'Unknown Creatures',
    body: 'Mysterious beings and unusual monsters — original prompts, not show spoilers.',
  },
  {
    title: 'Secret Experiments',
    body: 'Strange inventions, lab gear, and scientific mysteries.',
  },
  {
    title: '1980s Mystery',
    body: 'Retro objects, technology, and forgotten details.',
  },
] as const;

const FAQS = [
  {
    q: 'What is Stranger Things Krillion?',
    a: 'Stranger Things Krillion is a fan-made rare-answer challenge on KrillionPro with a supernatural Upside Down atmosphere. You answer seven mysterious open prompts; uncommon accepted answers score more. Not affiliated with Netflix or the Stranger Things franchise.',
  },
  {
    q: 'Is Stranger Things Krillion free to play?',
    a: 'Yes. Play free in your browser on KrillionPro — no download required.',
  },
  {
    q: 'How do you play Stranger Things Krillion?',
    a: 'Hit Play Now, read each question, type an unusual but valid answer within 45 seconds, and Submit. Complete seven rounds to see your final rarity rank.',
  },
  {
    q: 'How does the rarity scoring system work?',
    a: 'Accepted answers land in rarity bands from Common (10) to Upside Down Legendary (100). Very Rare and above also get a rare-answer bonus. Consecutive hits add streak bonuses.',
  },
  {
    q: 'How many rounds are in the game?',
    a: `Seven rounds, ${STRANGER_THINGS_CONFIG.promptSeconds} seconds each.`,
  },
  {
    q: 'Can I play on my phone?',
    a: 'Yes in a mobile browser. Type with the on-screen keyboard. No separate app is required.',
  },
  {
    q: 'Is Stranger Things Krillion multiplayer?',
    a: 'Not yet. This mode is a solo seven-round challenge.',
  },
  {
    q: 'How can I get the highest score?',
    a: 'Avoid obvious answers, stay valid, stack Very Rare+ hits for bonuses, and protect your streak. The top rank is Upside Down Legend.',
  },
] as const;

export const STRANGER_THINGS_FAQ_ITEMS = FAQS;

export default function StrangerThingsSeoArticle() {
  return (
    <article
      aria-labelledby="st-seo-heading"
      className="border-t border-red-500/25 bg-[#0a0508] text-slate-200"
    >
      <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <p
          className={`${pixelFont.className} text-[8px] uppercase tracking-[0.18em] text-red-300 sm:text-[9px]`}
        >
          Stranger Things Krillion · Fan-made
        </p>
        <h2
          id="st-seo-heading"
          className={`${displayFont.className} mt-3 text-3xl font-bold text-white sm:text-4xl`}
        >
          Stranger Things Krillion — Upside Down challenge guide
        </h2>
        <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
          The interface above is the full playable mode. This guide explains{' '}
          <strong className="text-white">this game only</strong> — seven rounds, rarity scoring, streaks,
          and ranks. Original questions and UI; not an official Netflix product.
        </p>
        <p className="mt-5">
          <a
            href="#st-play"
            className={`${bodyFont.className} inline-flex min-h-11 items-center justify-center rounded-full border-2 border-red-300/70 bg-red-700 px-6 py-2.5 text-sm font-bold text-white`}
          >
            Play Now
          </a>
        </p>

        <section className="mt-12" aria-labelledby="what-heading">
          <h3 id="what-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            What is Stranger Things Krillion?
          </h3>
          <div className={`${bodyFont.className} mt-4 space-y-4 text-base leading-relaxed text-slate-300`}>
            <p>
              A supernatural-themed <strong className="text-white">rare-answer game</strong>. Questions are
              inspired by mysterious places, creatures, objects, and alternate dimensions — written as
              original prompts, not copied show dialogue.
            </p>
            <p>
              Players try to think of unusual but valid answers. Rarer accepted answers earn higher points,
              and a final rarity rank closes the seven-round challenge.
            </p>
          </div>
        </section>

        <section className="mt-12" aria-labelledby="how-heading">
          <h3 id="how-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            How to play Stranger Things Krillion
          </h3>
          <ol className={`${bodyFont.className} mt-4 list-decimal space-y-3 pl-5 text-base text-slate-300`}>
            <li>Start the challenge (Play Now).</li>
            <li>Read the question carefully.</li>
            <li>Enter an unusual answer.</li>
            <li>Submit before the {STRANGER_THINGS_CONFIG.promptSeconds}-second timer expires.</li>
            <li>Earn points based on answer rarity (plus rare and streak bonuses).</li>
            <li>Complete seven rounds to reveal your final rank.</li>
          </ol>
          <ArticleShot
            src="/screenshots/stranger-things-prompt.png?v=2"
            alt="Stranger Things Krillion prompt with rarity meter, timer, answer field, and Submit"
            caption="Play the game — question card, countdown, answer field, Submit / Pass, round and score in the HUD."
          />
        </section>

        <section className="mt-12" aria-labelledby="scoring-heading">
          <h3 id="scoring-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Rarity scoring system
          </h3>
          <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
            Display names are Upside Down–themed. Point values match KrillionPro curated banks so judging
            stays fair and consistent:
          </p>
          <ul className="mt-6 space-y-2">
            {TIERS.map((t) => (
              <li
                key={t.name}
                className="rounded-xl border border-white/10 bg-[#12080c]/80 px-4 py-3"
              >
                <span className="font-semibold text-white">{t.name}</span>
                <span className="ml-2 text-amber-300">{t.pts} pts</span>
                <span className="mt-1 block text-sm text-slate-400">{t.note}</span>
              </li>
            ))}
          </ul>
          <ArticleShot
            src="/screenshots/stranger-things-reveal.png?v=2"
            alt="Stranger Things Krillion reveal showing rarity tier and points"
            caption="Reveal after a hit — rarity tier, points, and bonus breakdown when a rare answer lands."
          />
        </section>

        <section className="mt-12" aria-labelledby="categories-heading">
          <h3 id="categories-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Explore the game categories
          </h3>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {CATEGORIES.map((c) => (
              <li
                key={c.title}
                className="rounded-2xl border border-red-500/25 bg-[#12080c]/80 p-5"
              >
                <h4 className={`${displayFont.className} text-base font-bold text-red-200`}>
                  {c.title}
                </h4>
                <p className={`${bodyFont.className} mt-2 text-sm leading-relaxed text-slate-300`}>
                  {c.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12" aria-labelledby="features-heading">
          <h3 id="features-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Special game features
          </h3>
          <ul className={`${bodyFont.className} mt-4 list-disc space-y-2 pl-5 text-base text-slate-300`}>
            <li>Seven-round challenge ({STRANGER_THINGS_CONFIG.promptSeconds}s each)</li>
            <li>Rare-answer scoring with themed tier names</li>
            <li>Atmospheric supernatural environment</li>
            <li>Rarity meter</li>
            <li>Streak bonuses</li>
            <li>Final score and rank</li>
            <li>Replay challenge (Play Again)</li>
          </ul>
          <ArticleShot
            src="/screenshots/stranger-things-miss.png?v=2"
            alt="Stranger Things Krillion miss screen with zero points"
            caption="Miss, pass, or timeout — +0, streak reset, then continue to the next round."
          />
        </section>

        <section className="mt-12" aria-labelledby="tips-heading">
          <h3 id="tips-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Tips to get rare answers
          </h3>
          <ul className={`${bodyFont.className} mt-4 list-disc space-y-2 pl-5 text-base text-slate-300`}>
            <li>Don&apos;t choose the first obvious answer.</li>
            <li>Think about unusual details.</li>
            <li>Try specific rather than generic answers.</li>
            <li>Explore less obvious possibilities.</li>
            <li>Make sure every answer matches the question.</li>
          </ul>
        </section>

        <section className="mt-12" aria-labelledby="ranks-heading">
          <h3 id="ranks-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Final results and rarity ranks
          </h3>
          <ul className="mt-6 space-y-2">
            {RANKS.map((r) => (
              <li
                key={r.name}
                className={`rounded-xl border px-4 py-3 ${
                  r.name === 'Upside Down Legend'
                    ? 'border-red-400/40 bg-red-500/10'
                    : 'border-white/10 bg-[#12080c]/80'
                }`}
              >
                <span className="font-semibold text-white">{r.name}</span>
                <span className="ml-2 text-sm text-slate-400">{r.note}</span>
              </li>
            ))}
          </ul>
          <ArticleShot
            src="/screenshots/stranger-things-results.png?v=2"
            alt="Stranger Things Krillion final results with rank, score, and rundown"
            caption="Final results — rarity rank, score, prompt rundown, and Play Again."
          />
        </section>

        <section className="mt-12" aria-labelledby="faq-heading">
          <h3 id="faq-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Frequently asked questions
          </h3>
          <div className="mt-6 space-y-3">
            {FAQS.map((item) => (
              <details
                key={item.q}
                className="rounded-2xl border border-white/10 bg-[#12080c]/80 px-5 py-4 open:border-red-400/30"
              >
                <summary
                  className={`${bodyFont.className} cursor-pointer list-none font-semibold text-white`}
                >
                  {item.q}
                </summary>
                <p className={`${bodyFont.className} mt-3 text-sm text-slate-300`}>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="more-heading">
          <h3 id="more-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            More games to explore
          </h3>
          <ul className={`${bodyFont.className} mt-4 space-y-2 text-base text-slate-300`}>
            <li>
              <Link href="/" className="font-semibold text-red-300 hover:underline">
                Krillion
              </Link>{' '}
              — home &amp; Daily Dive
            </li>
            <li>
              <Link href="/one-in-a-krillion" className="font-semibold text-red-300 hover:underline">
                One in a Krillion
              </Link>{' '}
              — rare-answer seven-signal dive
            </li>
            <li>
              <Link href="/noillirk" className="font-semibold text-red-300 hover:underline">
                Noillirk
              </Link>{' '}
              — common answers win
            </li>
            <li>
              <Link href="/puffer-party-krillion" className="font-semibold text-red-300 hover:underline">
                Puffer Party
              </Link>{' '}
              — Don&apos;t Fall party mode
            </li>
          </ul>
        </section>

        <p className={`${bodyFont.className} mt-12 text-xs leading-relaxed text-slate-500`}>
          Stranger Things Krillion is an independent fan-made trivia experience. Stranger Things and related
          marks belong to their owners. KrillionPro is not affiliated with or endorsed by Netflix or those
          trademark holders.
        </p>
      </div>
    </article>
  );
}
