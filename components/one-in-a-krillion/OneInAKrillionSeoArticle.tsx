import Link from 'next/link';
import ArticleShot from '@/components/seo/ArticleShot';
import { bodyFont, displayFont, pixelFont } from '@/lib/fonts';
import { OIK_CONFIG } from '@/lib/dive/one-in-a-krillion';

const TIERS = [
  { name: 'Plankton (common)', pts: '10', note: 'Crowd favorite — barely leaves the surface' },
  { name: 'Too Clever', pts: '15', note: 'Clever dodge many players still share' },
  { name: 'Schooler', pts: '30', note: 'Solid and specific, still shared water' },
  { name: 'Rare', pts: '60', note: 'Genuinely uncommon · +10 rare-answer bonus' },
  { name: 'Deep Cut', pts: '85', note: 'Niche hit · +15 rare-answer bonus' },
  { name: 'One in a Krillion', pts: '100', note: 'Almost nobody else · +20 rare-answer bonus' },
] as const;

const RANKS = [
  { name: 'Ocean Beginner', note: 'Few rare catches — keep practicing specificity' },
  { name: 'Uncommon Thinker', note: 'Hits landed, but obvious answers still weigh you down' },
  { name: 'Rare Mind', note: 'Solid uncommon thinking across the seven signals' },
  { name: 'Deep-Sea Genius', note: 'Rare and deep-cut hits carried the dive' },
  { name: 'One in a Krillion', note: 'Top rarity rank — unusual answers owned the run' },
] as const;

const TIPS = [
  {
    title: 'Avoid the first obvious answer',
    body: 'Whatever pops up first is what the crowd types. Burn it and dig for a second or third valid idea.',
  },
  {
    title: 'Think of specific examples',
    body: 'Wide categories reward narrow names — a precise species, place, or tool beats a generic label.',
  },
  {
    title: 'Consider overlooked possibilities',
    body: 'Change country, decade, or subculture. Same prompt, less crowded answer space.',
  },
  {
    title: 'Stay valid',
    body: 'Rare and wrong still scores zero. Fit the question, then go obscure. Streaks only grow on accepted hits.',
  },
] as const;

const FAQS = [
  {
    q: 'What is One in a Krillion?',
    a: 'One in a Krillion is a playable rare-answer challenge on KrillionPro. You answer seven open prompts; unusual accepted answers score more. Streak and rare-answer bonuses deepen the dive, and a final rarity rank sums up the run.',
  },
  {
    q: 'How do you play One in a Krillion?',
    a: 'Hit Begin Descent, read each question, type one unusual but valid answer within 25 seconds, and Submit (or Pass). Points come from rarity tiers, plus bonuses. After seven rounds you see depth, score, and rarity rank.',
  },
  {
    q: 'Is One in a Krillion free?',
    a: 'Yes. Play free in your browser on KrillionPro — no download or account required.',
  },
  {
    q: 'How does rare-answer scoring work?',
    a: 'Accepted answers land in curated rarity tiers from Plankton (10) to One in a Krillion (100). Rare, Deep Cut, and top-tier hits also get a rare-answer bonus. Consecutive hits add streak bonuses. Misses and passes score zero and reset the streak.',
  },
  {
    q: 'How many rounds are in the game?',
    a: `Seven rounds (signals) per game, ${OIK_CONFIG.promptSeconds} seconds each. Scores accumulate across all seven.`,
  },
  {
    q: 'Can I play One in a Krillion on mobile?',
    a: 'Yes in a mobile or tablet browser. Type with the on-screen keyboard and use Pass / Dive. No separate app is required.',
  },
  {
    q: 'Is One in a Krillion multiplayer?',
    a: 'Not yet. This mode is a solo seven-round challenge with curated rarity scoring. Live rooms and shared boards are separate product work.',
  },
  {
    q: 'How do I get the highest rarity score?',
    a: 'Skip crowd answers, stay valid, stack Rare+ hits for bonuses, and protect your streak. The top rarity rank is One in a Krillion — high average points across all seven signals.',
  },
] as const;

export const OIK_FAQ_ITEMS = FAQS;

export default function OneInAKrillionSeoArticle() {
  return (
    <article
      aria-labelledby="oik-seo-heading"
      className="border-t border-cyan-400/20 bg-[#030914] text-slate-200"
    >
      <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <p className={`${pixelFont.className} text-[8px] uppercase tracking-[0.18em] text-cyan-300 sm:text-[9px]`}>
          One in a Krillion · Game guide
        </p>
        <h2
          id="oik-seo-heading"
          className={`${displayFont.className} mt-3 text-3xl font-bold text-white sm:text-4xl`}
        >
          One in a Krillion — how this mode works
        </h2>
        <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
          The player above is the full game. This guide explains{' '}
          <strong className="text-white">this mode only</strong> — seven rounds, rarity scoring, streak
          bonuses, and your final rarity rank — not a generic overview of every Krillion game.
        </p>
        <p className="mt-5">
          <a
            href="#oik-play"
            className={`${bodyFont.className} inline-flex min-h-11 items-center justify-center rounded-full border-2 border-cyan-200/70 bg-cyan-600 px-6 py-2.5 text-sm font-bold text-white`}
          >
            Play Now
          </a>
        </p>

        <section className="mt-12" aria-labelledby="what-heading">
          <h3 id="what-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            What is One in a Krillion?
          </h3>
          <div className={`${bodyFont.className} mt-4 space-y-4 text-base leading-relaxed text-slate-300`}>
            <p>
              One in a Krillion is a <strong className="text-white">creative rare-answer challenge</strong>.
              Each prompt accepts many valid answers. Your job is to think of something other players might
              overlook — still correct, just uncommon.
            </p>
            <p>
              Unusual accepted answers earn higher scores. Stack rare hits, protect streaks, and chase the
              highest <strong className="text-white">rarity rank</strong> at the end of seven rounds.
            </p>
          </div>
        </section>

        <section className="mt-12" aria-labelledby="how-heading">
          <h3 id="how-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            How to play One in a Krillion
          </h3>
          <ol className={`${bodyFont.className} mt-4 list-decimal space-y-3 pl-5 text-base text-slate-300`}>
            <li>Read the question on the signal card.</li>
            <li>Think of an unusual but valid answer — not the first crowd pick.</li>
            <li>Submit before the {OIK_CONFIG.promptSeconds}-second clock ends (or Pass if stuck).</li>
            <li>Earn points from rarity tier, plus rare-answer and streak bonuses when they apply.</li>
          </ol>
          <ArticleShot
            src="/screenshots/daily-prompt.png?v=oik2"
            alt="One in a Krillion prompt with timer, answer field, Pass and Dive"
            caption="Play the game — question, countdown, answer field, Pass / Dive, round and score in the HUD."
          />
        </section>

        <section className="mt-12" aria-labelledby="scoring-heading">
          <h3 id="scoring-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Rarity scoring system
          </h3>
          <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
            This mode uses KrillionPro curated rarity tiers. Base points come from the answer bank; rare
            tiers also unlock a <strong className="text-white">rare-answer bonus</strong>. Consecutive
            valid hits add a <strong className="text-white">streak bonus</strong> (miss, pass, or timeout
            resets the streak).
          </p>
          <ul className="mt-6 space-y-2">
            {TIERS.map((t) => (
              <li
                key={t.name}
                className="rounded-xl border border-white/10 bg-[#07122b]/70 px-4 py-3"
              >
                <span className="font-semibold text-white">{t.name}</span>
                <span className="ml-2 text-cyan-300">{t.pts} pts</span>
                <span className="mt-1 block text-sm text-slate-400">{t.note}</span>
              </li>
            ))}
          </ul>
          <ArticleShot
            src="/screenshots/daily-reveal.png?v=oik2"
            alt="Rare answer reveal with tier and points"
            caption="Reveal — tier label, total points, and bonus breakdown when a rare hit lands."
          />
        </section>

        <section className="mt-12" aria-labelledby="rounds-heading">
          <h3 id="rounds-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Seven-round challenge
          </h3>
          <ul className={`${bodyFont.className} mt-4 list-disc space-y-2 pl-5 text-base text-slate-300`}>
            <li>
              <strong className="text-white">{OIK_CONFIG.promptsPerDive} questions</strong> per game
              (signals 1–{OIK_CONFIG.promptsPerDive} in the HUD).
            </li>
            <li>
              <strong className="text-white">{OIK_CONFIG.promptSeconds} seconds</strong> per round.
            </li>
            <li>Each round is a different open prompt — different kinds of thinking.</li>
            <li>Scores accumulate; depth is 10 metres per total point (bonuses included).</li>
            <li>Final results show depth, points, rundown, and rarity rank.</li>
          </ul>
          <ArticleShot
            src="/screenshots/daily-miss.png?v=oik2"
            alt="Miss screen with zero points"
            caption="Miss or timeout — +0, streak reset, then Descend to the next signal."
          />
        </section>

        <section className="mt-12" aria-labelledby="features-heading">
          <h3 id="features-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Game features
          </h3>
          <ul className={`${bodyFont.className} mt-4 list-disc space-y-2 pl-5 text-base text-slate-300`}>
            <li>Original One in a Krillion question pack</li>
            <li>Rarity-based scoring with curated answer banks</li>
            <li>Deep-sea visual progression (depth HUD + ocean zones)</li>
            <li>Streak bonuses for consecutive valid answers</li>
            <li>Rare-answer bonuses on Rare / Deep Cut / top tier</li>
            <li>Seven-round challenge with round tracker</li>
            <li>Final rarity rank on the results screen</li>
            <li>Play Again / Begin Descent replay</li>
            <li>Sound and music mute (audio only — dive keeps going)</li>
          </ul>
        </section>

        <section className="mt-12" aria-labelledby="tips-heading">
          <h3 id="tips-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Tips to get rare answers
          </h3>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {TIPS.map((tip) => (
              <li key={tip.title} className="rounded-2xl border border-white/10 bg-[#07122b]/70 p-5">
                <h4 className={`${displayFont.className} text-base font-bold text-fuchsia-200`}>
                  {tip.title}
                </h4>
                <p className={`${bodyFont.className} mt-2 text-sm leading-relaxed text-slate-300`}>
                  {tip.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12" aria-labelledby="ranks-heading">
          <h3 id="ranks-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Rarity ranks and final results
          </h3>
          <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
            After seven signals, your average points (including bonuses) map to a rarity rank:
          </p>
          <ul className="mt-6 space-y-2">
            {RANKS.map((r) => (
              <li
                key={r.name}
                className={`rounded-xl border px-4 py-3 ${
                  r.name === 'One in a Krillion'
                    ? 'border-cyan-400/40 bg-cyan-500/10'
                    : 'border-white/10 bg-[#07122b]/70'
                }`}
              >
                <span className="font-semibold text-white">{r.name}</span>
                <span className="mt-1 block text-sm text-slate-400">{r.note}</span>
              </li>
            ))}
          </ul>
          <ArticleShot
            src="/screenshots/daily-results.png?v=oik2"
            alt="Dive complete with score, depth, and Play Again"
            caption="Final results — rarity rank, depth, score, prompt rundown, Play Again."
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
                className="rounded-2xl border border-white/10 bg-[#07122b]/70 px-5 py-4 open:border-cyan-400/30"
              >
                <summary className={`${bodyFont.className} cursor-pointer list-none font-semibold text-white`}>
                  {item.q}
                </summary>
                <p className={`${bodyFont.className} mt-3 text-sm text-slate-300`}>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="more-heading">
          <h3 id="more-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            More games to play
          </h3>
          <ul className={`${bodyFont.className} mt-4 space-y-2 text-base text-slate-300`}>
            <li>
              <Link href="/" className="font-semibold text-cyan-300 hover:underline">
                Krillion
              </Link>{' '}
              — home &amp; Daily Dive overview
            </li>
            <li>
              <Link href="/noillirk" className="font-semibold text-cyan-300 hover:underline">
                Noillirk
              </Link>{' '}
              — Krillion backwards; common answers win
            </li>
            <li>
              <Link href="/puffer-party-krillion" className="font-semibold text-cyan-300 hover:underline">
                Puffer Party
              </Link>{' '}
              — Don’t Fall party survival
            </li>
            <li>
              <Link href="/games-like-krillion" className="font-semibold text-cyan-300 hover:underline">
                Games Like Krillion
              </Link>{' '}
              — more daily habits
            </li>
          </ul>
        </section>
      </div>
    </article>
  );
}
