import Link from 'next/link';
import ArticleShot from '@/components/seo/ArticleShot';
import { bodyFont, displayFont, pixelFont } from '@/lib/fonts';
import { WORDPLAY_CONFIG } from '@/lib/dive/wordplay';

const TIERS = [
  { name: 'Common Word', pts: '10', note: 'First word most people type' },
  { name: 'Unusual Word', pts: '20', note: 'A slight swerve many still share' },
  { name: 'Rare Word', pts: '40', note: 'Solid and specific' },
  { name: 'Very Rare Word', pts: '60', note: 'Uncommon · +10 rare bonus' },
  { name: 'Ultra Rare Word', pts: '80', note: 'Niche · +15 rare bonus' },
  { name: 'Wordplay Legend', pts: '100', note: 'Almost nobody else · +20 rare bonus' },
] as const;

const RANKS = [
  { name: 'Word Rookie', note: 'Beginner' },
  { name: 'Letter Explorer', note: 'Intermediate' },
  { name: 'Vocabulary Hunter', note: 'Advanced' },
  { name: 'Word Master', note: 'Expert' },
  { name: 'Wordplay Legend', note: 'Highest rank' },
] as const;

const CATEGORIES = [
  {
    title: 'Letter Challenges',
    body: 'Find words starting or ending with specific letters.',
  },
  {
    title: 'Rhyming Challenges',
    body: 'Discover words that rhyme with a given word.',
  },
  {
    title: 'Vocabulary Challenges',
    body: 'Find unusual synonyms, antonyms and meanings.',
  },
  {
    title: 'Word Association',
    body: 'Think of less obvious words connected to a given idea.',
  },
  {
    title: 'Word Pattern Challenges',
    body: 'Find words matching special letter combinations and patterns.',
  },
] as const;

const FAQS = [
  {
    q: 'What is Wordplay Krillion?',
    a: 'Wordplay Krillion is an original creative word rare-answer game on KrillionPro. You solve seven word challenges; unusual but valid dictionary words that match the prompt score more.',
  },
  {
    q: 'Is Wordplay Krillion free to play?',
    a: 'Yes. Play Wordplay Krillion free in your browser on KrillionPro — no download required.',
  },
  {
    q: 'How do you play Wordplay Krillion?',
    a: 'Start a challenge, read the prompt, think of an unusual valid word, enter it before the timer ends, and Submit. Complete seven rounds for your final rank.',
  },
  {
    q: 'How does word rarity scoring work?',
    a: 'Accepted words land in bands from Common Word (10) to Wordplay Legend (100). Rarity uses English word-frequency data (not word length), plus curated overrides. Very Rare and above also get rare-answer bonuses; streaks add more.',
  },
  {
    q: 'What types of word challenges are included?',
    a: 'Letter challenges, rhymes, vocabulary (synonyms), word association, and pattern challenges such as consecutive vowels or letter shapes.',
  },
  {
    q: 'Can I play Wordplay Krillion on mobile?',
    a: 'Yes in a mobile browser. Type with the on-screen keyboard. No separate app is required.',
  },
  {
    q: 'Are dictionary words required?',
    a: 'Yes. Answers must be real dictionary words that also match the round’s rule. Invalid words, rule mismatches, and repeats are rejected without ending the round.',
  },
  {
    q: 'How can I earn the highest score?',
    a: 'Avoid the first word that comes to mind, explore less familiar vocabulary that still fits, protect your streak, and aim for Ultra Rare and Wordplay Legend hits.',
  },
] as const;

export const WORDPLAY_FAQ_ITEMS = FAQS;

export default function WordplaySeoArticle() {
  return (
    <article
      aria-labelledby="wp-seo-heading"
      className="border-t border-violet-500/25 bg-[#1a0f30] text-slate-200"
    >
      <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <p
          className={`${pixelFont.className} text-[8px] uppercase tracking-[0.18em] text-violet-300 sm:text-[9px]`}
        >
          Wordplay Krillion · Think rarer. Play smarter.
        </p>
        <h2
          id="wp-seo-heading"
          className={`${displayFont.className} mt-3 text-3xl font-bold text-white sm:text-4xl`}
        >
          Wordplay Krillion — rare word challenge guide
        </h2>
        <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
          Find unusual words. Beat the challenge. Become a Wordplay Legend. The interface above is
          the full playable mode — this guide covers scoring, categories, ranks, and tips.
        </p>
        <p className="mt-5">
          <a
            href="#wp-play"
            className={`${bodyFont.className} inline-flex min-h-11 items-center justify-center rounded-full border-2 border-violet-300/70 bg-gradient-to-r from-violet-500 to-indigo-700 px-6 py-2.5 text-sm font-bold text-white`}
          >
            Play Now
          </a>
        </p>

        <section className="mt-12" aria-labelledby="what-heading">
          <h3 id="what-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            What is Wordplay Krillion?
          </h3>
          <div className={`${bodyFont.className} mt-4 space-y-4 text-base leading-relaxed text-slate-300`}>
            <p>
              A creative <strong className="text-white">word-based rare-answer game</strong>. Players
              receive different word challenges and must find valid words that other players might
              overlook.
            </p>
            <p>
              Less common accepted answers earn higher points. The goal is to finish seven rounds with
              the highest possible score — and unlock Wordplay Legend.
            </p>
          </div>
        </section>

        <section className="mt-12" aria-labelledby="how-heading">
          <h3 id="how-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            How to play Wordplay Krillion
          </h3>
          <ol className={`${bodyFont.className} mt-4 list-decimal space-y-3 pl-5 text-base text-slate-300`}>
            <li>Start a new challenge.</li>
            <li>Read the word prompt carefully.</li>
            <li>Think of an unusual but valid answer.</li>
            <li>Enter your word before the timer expires ({WORDPLAY_CONFIG.promptSeconds}s).</li>
            <li>Submit your answer.</li>
            <li>Earn points according to its rarity.</li>
            <li>Complete all seven rounds to reveal your final rank.</li>
          </ol>
          <ArticleShot
            src="/screenshots/wordplay-prompt.png?v=2"
            alt="Wordplay Krillion prompt with rarity meter, timer, answer field, and Submit"
            caption="Playable interface — challenge card, countdown, answer field, Submit / Pass, round and score."
          />
        </section>

        <section className="mt-12" aria-labelledby="scoring-heading">
          <h3 id="scoring-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Word rarity scoring system
          </h3>
          <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
            Every accepted word lands in a rarity band. Scoring uses dictionary validation plus
            English frequency ranks (longer is not automatically rarer):
          </p>
          <ul className="mt-6 space-y-2">
            {TIERS.map((t) => (
              <li
                key={t.name}
                className="rounded-xl border border-white/10 bg-[#2a1a4a]/80 px-4 py-3"
              >
                <span className="font-semibold text-white">{t.name}</span>
                <span className="ml-2 text-amber-300">{t.pts} pts</span>
                <span className="mt-1 block text-sm text-slate-400">{t.note}</span>
              </li>
            ))}
          </ul>
          <ArticleShot
            src="/screenshots/wordplay-reveal.png?v=2"
            alt="Wordplay Krillion reveal showing rarity tier and points"
            caption="Reveal after a hit — rarity tier, points, and bonus breakdown when a rare word lands."
          />
        </section>

        <section className="mt-12" aria-labelledby="categories-heading">
          <h3 id="categories-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Explore word challenge categories
          </h3>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {CATEGORIES.map((c) => (
              <li
                key={c.title}
                className="rounded-2xl border border-violet-500/25 bg-[#2a1a4a]/80 p-5"
              >
                <h4 className={`${displayFont.className} text-base font-bold text-violet-200`}>
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
            <li>Seven-round word challenge</li>
            <li>Rare-word scoring from frequency data</li>
            <li>Dictionary + prompt-rule validation</li>
            <li>Duplicate-word prevention</li>
            <li>Multiple word puzzle categories</li>
            <li>Countdown timer and rarity meter</li>
            <li>Streak bonuses</li>
            <li>Final score and rank · Replay</li>
          </ul>
          <ArticleShot
            src="/screenshots/wordplay-miss.png?v=2"
            alt="Wordplay Krillion miss screen with zero points"
            caption="Pass or timeout — +0, streak reset, then continue. Invalid words stay on the prompt."
          />
        </section>

        <section className="mt-12" aria-labelledby="tips-heading">
          <h3 id="tips-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Tips to find rare words
          </h3>
          <ul className={`${bodyFont.className} mt-4 list-disc space-y-2 pl-5 text-base text-slate-300`}>
            <li>Avoid the first word that comes to mind.</li>
            <li>Explore less familiar vocabulary.</li>
            <li>Think of unusual synonyms.</li>
            <li>Try longer or more specific words when appropriate — rarity still comes from frequency, not length alone.</li>
            <li>Check spelling and make sure your answer matches the prompt.</li>
          </ul>
        </section>

        <section className="mt-12" aria-labelledby="ranks-heading">
          <h3 id="ranks-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Final results and word ranks
          </h3>
          <ul className="mt-6 space-y-2">
            {RANKS.map((r) => (
              <li
                key={r.name}
                className={`rounded-xl border px-4 py-3 ${
                  r.name === 'Wordplay Legend'
                    ? 'border-violet-400/40 bg-violet-500/10'
                    : 'border-white/10 bg-[#2a1a4a]/80'
                }`}
              >
                <span className="font-semibold text-white">{r.name}</span>
                <span className="ml-2 text-sm text-slate-400">{r.note}</span>
              </li>
            ))}
          </ul>
          <ArticleShot
            src="/screenshots/wordplay-results.png?v=2"
            alt="Wordplay Krillion final results with rank, score, and rundown"
            caption="Final results — wordplay rank, score, prompt rundown, and Play Again."
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
                className="rounded-2xl border border-white/10 bg-[#2a1a4a]/80 px-5 py-4 open:border-violet-400/30"
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
              <Link href="/" className="font-semibold text-violet-300 hover:underline">
                Krillion
              </Link>
            </li>
            <li>
              <Link href="/one-in-a-krillion" className="font-semibold text-violet-300 hover:underline">
                One in a Krillion
              </Link>
            </li>
            <li>
              <Link href="/noillirk" className="font-semibold text-violet-300 hover:underline">
                Noillirk
              </Link>
            </li>
            <li>
              <Link href="/farflung" className="font-semibold text-violet-300 hover:underline">
                Farflung
              </Link>
            </li>
            <li>
              <Link href="/krillion-animal" className="font-semibold text-violet-300 hover:underline">
                Animal Krillion
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </article>
  );
}
