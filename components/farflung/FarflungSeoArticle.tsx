import Link from 'next/link';
import ArticleShot from '@/components/seo/ArticleShot';
import { bodyFont, displayFont, pixelFont } from '@/lib/fonts';
import { FARFLUNG_CONFIG } from '@/lib/dive/farflung';

const TIERS = [
  { name: 'Common', pts: '10', note: 'Crowd favorite' },
  { name: 'Unusual', pts: '15', note: 'A slight swerve many still share' },
  { name: 'Rare', pts: '30', note: 'Solid and specific' },
  { name: 'Very Rare', pts: '60', note: 'Uncommon · +10 rare bonus' },
  { name: 'Cosmic Rare', pts: '85', note: 'Niche · +15 rare bonus' },
  { name: 'Farflung Legend', pts: '100', note: 'Almost nobody else · +20 rare bonus' },
] as const;

const RANKS = [
  { name: 'Space Tourist', note: 'Beginner' },
  { name: 'Cosmic Explorer', note: 'Intermediate' },
  { name: 'Rare Discoverer', note: 'Advanced' },
  { name: 'Galaxy Navigator', note: 'Expert' },
  { name: 'Farflung Legend', note: 'Highest rank' },
] as const;

const CATEGORIES = [
  {
    title: 'Distant Worlds',
    body: 'Strange planets, moons, and imaginary destinations.',
  },
  {
    title: 'Lost Places',
    body: 'Forgotten locations and hidden discoveries.',
  },
  {
    title: 'Cosmic Mysteries',
    body: 'Unexpected space-related questions and discoveries.',
  },
  {
    title: 'Uncharted Exploration',
    body: 'Unusual objects, destinations, and possibilities.',
  },
] as const;

const FAQS = [
  {
    q: 'What is Farflung?',
    a: 'Farflung is an original rare-answer exploration game on KrillionPro. You answer seven cosmic open prompts; uncommon accepted answers score more. Streak and rare-answer bonuses deepen the run, and a final exploration rank closes the challenge.',
  },
  {
    q: 'Is Farflung free to play?',
    a: 'Yes. Play Farflung free in your browser on KrillionPro — no download required.',
  },
  {
    q: 'How do you play Farflung?',
    a: 'Hit Play Now, read each question, type an unusual but valid answer within 45 seconds, and Submit. Complete seven rounds to see your final rarity rank.',
  },
  {
    q: 'How does rare-answer scoring work?',
    a: 'Accepted answers land in rarity bands from Common (10) to Farflung Legend (100). Very Rare and above also get a rare-answer bonus. Consecutive hits add streak bonuses.',
  },
  {
    q: 'How many rounds are there?',
    a: `Seven rounds, ${FARFLUNG_CONFIG.promptSeconds} seconds each.`,
  },
  {
    q: 'Can I play Farflung on mobile?',
    a: 'Yes in a mobile browser. Type with the on-screen keyboard. No separate app is required.',
  },
  {
    q: 'Is Farflung multiplayer?',
    a: 'Not yet. This mode is a solo seven-round exploration challenge.',
  },
  {
    q: 'How do I achieve Farflung Legend?',
    a: 'Avoid obvious answers, stay valid, stack Cosmic Rare+ hits for bonuses, and protect your streak. Farflung Legend is the top exploration rank.',
  },
] as const;

export const FARFLUNG_FAQ_ITEMS = FAQS;

export default function FarflungSeoArticle() {
  return (
    <article
      aria-labelledby="ff-seo-heading"
      className="border-t border-fuchsia-500/25 bg-[#0a0618] text-slate-200"
    >
      <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <p
          className={`${pixelFont.className} text-[8px] uppercase tracking-[0.18em] text-fuchsia-300 sm:text-[9px]`}
        >
          Farflung · Cosmic exploration
        </p>
        <h2
          id="ff-seo-heading"
          className={`${displayFont.className} mt-3 text-3xl font-bold text-white sm:text-4xl`}
        >
          Farflung — rare-answer exploration guide
        </h2>
        <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
          The interface above is the full playable mode. This guide explains{' '}
          <strong className="text-white">Farflung only</strong> — seven rounds, rarity scoring, streaks,
          and exploration ranks.
        </p>
        <p className="mt-5">
          <a
            href="#ff-play"
            className={`${bodyFont.className} inline-flex min-h-11 items-center justify-center rounded-full border-2 border-fuchsia-300/70 bg-gradient-to-r from-fuchsia-600 to-violet-700 px-6 py-2.5 text-sm font-bold text-white`}
          >
            Play Now
          </a>
        </p>

        <section className="mt-12" aria-labelledby="what-heading">
          <h3 id="what-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            What is Farflung?
          </h3>
          <div className={`${bodyFont.className} mt-4 space-y-4 text-base leading-relaxed text-slate-300`}>
            <p>
              A space-exploration-themed <strong className="text-white">rare-answer challenge</strong>.
              Players receive creative questions about distant worlds, lost places, cosmic mysteries, and
              uncharted finds.
            </p>
            <p>
              Submit uncommon but valid answers. Rarer accepted answers earn higher points — and the goal
              is the highest rarity rank at the end of seven rounds.
            </p>
          </div>
        </section>

        <section className="mt-12" aria-labelledby="how-heading">
          <h3 id="how-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            How to play Farflung
          </h3>
          <ol className={`${bodyFont.className} mt-4 list-decimal space-y-3 pl-5 text-base text-slate-300`}>
            <li>Start your exploration (Play Now).</li>
            <li>Read the question.</li>
            <li>Think of an unusual answer.</li>
            <li>Submit before the {FARFLUNG_CONFIG.promptSeconds}-second timer runs out.</li>
            <li>Earn points according to rarity (plus rare and streak bonuses).</li>
            <li>Complete all seven rounds and discover your final rank.</li>
          </ol>
          <ArticleShot
            src="/screenshots/farflung-prompt.png?v=1"
            alt="Farflung prompt with rarity meter, timer, answer field, and Submit"
            caption="Play Farflung — question card, countdown, answer field, Submit / Pass, round and score in the HUD."
          />
        </section>

        <section className="mt-12" aria-labelledby="scoring-heading">
          <h3 id="scoring-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Farflung rarity scoring system
          </h3>
          <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
            Display names are cosmic-themed. Point values match KrillionPro curated banks so judging stays
            fair and consistent:
          </p>
          <ul className="mt-6 space-y-2">
            {TIERS.map((t) => (
              <li
                key={t.name}
                className="rounded-xl border border-white/10 bg-[#12082a]/80 px-4 py-3"
              >
                <span className="font-semibold text-white">{t.name}</span>
                <span className="ml-2 text-amber-300">{t.pts} pts</span>
                <span className="mt-1 block text-sm text-slate-400">{t.note}</span>
              </li>
            ))}
          </ul>
          <ArticleShot
            src="/screenshots/farflung-reveal.png?v=1"
            alt="Farflung reveal showing rarity tier and points"
            caption="Reveal after a hit — rarity tier, points, and bonus breakdown when a rare discovery lands."
          />
        </section>

        <section className="mt-12" aria-labelledby="categories-heading">
          <h3 id="categories-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Explore the question categories
          </h3>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {CATEGORIES.map((c) => (
              <li
                key={c.title}
                className="rounded-2xl border border-fuchsia-500/25 bg-[#12082a]/80 p-5"
              >
                <h4 className={`${displayFont.className} text-base font-bold text-fuchsia-200`}>
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
            <li>Seven-round exploration challenge ({FARFLUNG_CONFIG.promptSeconds}s each)</li>
            <li>Rarity-based scoring with cosmic tier names</li>
            <li>Cosmic visual progression</li>
            <li>Rare-answer streak bonuses</li>
            <li>Final exploration rank</li>
            <li>Replay functionality (Play Again)</li>
          </ul>
          <ArticleShot
            src="/screenshots/farflung-miss.png?v=1"
            alt="Farflung miss screen with zero points"
            caption="Miss, pass, or timeout — +0, streak reset, then continue to the next round."
          />
        </section>

        <section className="mt-12" aria-labelledby="tips-heading">
          <h3 id="tips-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Tips to find rare answers
          </h3>
          <ul className={`${bodyFont.className} mt-4 list-disc space-y-2 pl-5 text-base text-slate-300`}>
            <li>Avoid obvious answers.</li>
            <li>Think of unusual examples.</li>
            <li>Consider less familiar possibilities.</li>
            <li>Be specific rather than generic.</li>
            <li>Keep your answers relevant to the question.</li>
          </ul>
        </section>

        <section className="mt-12" aria-labelledby="ranks-heading">
          <h3 id="ranks-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Final results and ranks
          </h3>
          <ul className="mt-6 space-y-2">
            {RANKS.map((r) => (
              <li
                key={r.name}
                className={`rounded-xl border px-4 py-3 ${
                  r.name === 'Farflung Legend'
                    ? 'border-fuchsia-400/40 bg-fuchsia-500/10'
                    : 'border-white/10 bg-[#12082a]/80'
                }`}
              >
                <span className="font-semibold text-white">{r.name}</span>
                <span className="ml-2 text-sm text-slate-400">{r.note}</span>
              </li>
            ))}
          </ul>
          <ArticleShot
            src="/screenshots/farflung-results.png?v=1"
            alt="Farflung final results with rank, score, and rundown"
            caption="Final results — exploration rank, score, prompt rundown, and Play Again."
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
                className="rounded-2xl border border-white/10 bg-[#12082a]/80 px-5 py-4 open:border-fuchsia-400/30"
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
              <Link href="/" className="font-semibold text-fuchsia-300 hover:underline">
                Krillion
              </Link>{' '}
              — home &amp; Daily Dive
            </li>
            <li>
              <Link href="/one-in-a-krillion" className="font-semibold text-fuchsia-300 hover:underline">
                One in a Krillion
              </Link>{' '}
              — rare-answer seven-signal dive
            </li>
            <li>
              <Link href="/noillirk" className="font-semibold text-fuchsia-300 hover:underline">
                Noillirk
              </Link>{' '}
              — common answers win
            </li>
            <li>
              <Link
                href="/stranger-things-krillion"
                className="font-semibold text-fuchsia-300 hover:underline"
              >
                Stranger Things Krillion
              </Link>{' '}
              — Upside Down challenge
            </li>
            <li>
              <Link
                href="/puffer-party-krillion"
                className="font-semibold text-fuchsia-300 hover:underline"
              >
                Puffer Party
              </Link>{' '}
              — Don&apos;t Fall party mode
            </li>
          </ul>
        </section>
      </div>
    </article>
  );
}
