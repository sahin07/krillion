import Link from 'next/link';
import ArticleShot from '@/components/seo/ArticleShot';
import { bodyFont, displayFont, pixelFont } from '@/lib/fonts';
import { ANIMAL_CONFIG } from '@/lib/dive/animal';

const TIERS = [
  { name: 'Common', pts: '10', note: 'Familiar zoo favorite' },
  { name: 'Unusual', pts: '20', note: 'A slight swerve many still share' },
  { name: 'Rare', pts: '40', note: 'Solid and specific' },
  { name: 'Very Rare', pts: '60', note: 'Uncommon · +10 rare bonus' },
  { name: 'Ultra Rare', pts: '80', note: 'Niche · +15 rare bonus' },
  { name: 'Animal Legend', pts: '100', note: 'Almost nobody else · +20 rare bonus' },
] as const;

const RANKS = [
  { name: 'Wildlife Rookie', note: 'Beginner' },
  { name: 'Jungle Explorer', note: 'Intermediate' },
  { name: 'Rare Species Hunter', note: 'Advanced' },
  { name: 'Animal Expert', note: 'Expert' },
  { name: 'Animal Legend', note: 'Highest rank' },
] as const;

const CATEGORIES = [
  {
    title: 'Wild Mammals',
    body: 'Big cats, unusual mammals, primates and rare land animals.',
  },
  {
    title: 'Birds',
    body: 'Unusual birds, flightless species and exotic species.',
  },
  {
    title: 'Ocean Creatures',
    body: 'Deep-sea animals, unusual fish and marine life.',
  },
  {
    title: 'Reptiles and Amphibians',
    body: 'Snakes, lizards, frogs and unusual amphibians.',
  },
  {
    title: 'Insects and Tiny Creatures',
    body: 'Rare insects, spiders and miniature wildlife.',
  },
] as const;

const FAQS = [
  {
    q: 'What is Animal Krillion?',
    a: 'Animal Krillion is an original animal-themed rare-answer game on KrillionPro. You answer seven wildlife prompts with valid animals; uncommon accepted answers score more. Streak and rare-answer bonuses deepen the run, and a final wildlife rank closes the challenge.',
  },
  {
    q: 'Is Animal Krillion free to play?',
    a: 'Yes. Play Animal Krillion free in your browser on KrillionPro — no download required.',
  },
  {
    q: 'How do you play Animal Krillion?',
    a: 'Hit Play Now, read each animal question, type an unusual but valid animal within 45 seconds, and Submit. Complete seven rounds to see your final rarity rank.',
  },
  {
    q: 'How does animal rarity scoring work?',
    a: 'Accepted answers land in rarity bands from Common (10) to Animal Legend (100). Very Rare and above also get a rare-answer bonus. Consecutive hits add streak bonuses.',
  },
  {
    q: 'How many rounds are there?',
    a: `Seven rounds, ${ANIMAL_CONFIG.promptSeconds} seconds each.`,
  },
  {
    q: 'Can I play Animal Krillion on mobile?',
    a: 'Yes in a mobile browser. Type with the on-screen keyboard. No separate app is required.',
  },
  {
    q: 'Are extinct animals included?',
    a: 'This pack focuses on living wildlife. Extinct animals are not the target answers for these rounds.',
  },
  {
    q: 'How do I get the highest score?',
    a: 'Skip familiar zoo animals, stay valid for the prompt, aim for Ultra Rare and Animal Legend hits, and protect your streak for bonus points.',
  },
] as const;

export const ANIMAL_FAQ_ITEMS = FAQS;

export default function AnimalSeoArticle() {
  return (
    <article
      aria-labelledby="ak-seo-heading"
      className="border-t border-lime-500/25 bg-[#0f1a0c] text-slate-200"
    >
      <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <p
          className={`${pixelFont.className} text-[8px] uppercase tracking-[0.18em] text-lime-300 sm:text-[9px]`}
        >
          Animal Krillion · Think beyond the animal kingdom
        </p>
        <h2
          id="ak-seo-heading"
          className={`${displayFont.className} mt-3 text-3xl font-bold text-white sm:text-4xl`}
        >
          Animal Krillion — rare-answer wildlife guide
        </h2>
        <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
          Discover rare animals. Think differently. Score higher. The interface above is the full
          playable mode — this guide covers scoring, categories, ranks, and tips for{' '}
          <strong className="text-white">Animal Krillion</strong> only.
        </p>
        <p className="mt-5">
          <a
            href="#ak-play"
            className={`${bodyFont.className} inline-flex min-h-11 items-center justify-center rounded-full border-2 border-lime-300/70 bg-gradient-to-r from-lime-500 to-green-700 px-6 py-2.5 text-sm font-bold text-white`}
          >
            Play Now
          </a>
        </p>

        <section className="mt-12" aria-labelledby="what-heading">
          <h3 id="what-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            What is Animal Krillion?
          </h3>
          <div className={`${bodyFont.className} mt-4 space-y-4 text-base leading-relaxed text-slate-300`}>
            <p>
              An animal-themed <strong className="text-white">rare-answer challenge</strong>. Questions
              cover different parts of the animal kingdom — mammals, birds, ocean life, reptiles,
              amphibians, and tiny creatures.
            </p>
            <p>
              Players submit one valid animal answer per round. Uncommon accepted answers earn more
              points. The objective is to discover answers other players might overlook.
            </p>
            <p className="text-sm text-slate-400">
              Animal Krillion is an original KrillionPro mode with its own questions, accepted-answer
              bank, scoring labels, and artwork — not an official third-party “Krillion Animals”
              product.
            </p>
          </div>
        </section>

        <section className="mt-12" aria-labelledby="how-heading">
          <h3 id="how-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            How to play Animal Krillion
          </h3>
          <ol className={`${bodyFont.className} mt-4 list-decimal space-y-3 pl-5 text-base text-slate-300`}>
            <li>Start your wildlife challenge.</li>
            <li>Read the animal question.</li>
            <li>Think of an unusual animal that fits.</li>
            <li>Enter your answer before time runs out ({ANIMAL_CONFIG.promptSeconds}s).</li>
            <li>Earn points based on its rarity.</li>
            <li>Complete all seven rounds to discover your final rank.</li>
          </ol>
          <ArticleShot
            src="/screenshots/krillion-animal-prompt.png?v=7"
            alt="Animal Krillion prompt with rarity meter, timer, answer field, and Submit"
            caption="Playable game interface — question card, countdown, answer field, Submit / Pass, round and score."
          />
        </section>

        <section className="mt-12" aria-labelledby="scoring-heading">
          <h3 id="scoring-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Animal rarity scoring system
          </h3>
          <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
            Every accepted animal lands in a rarity band. Rarer picks score higher — plus rare-answer
            and streak bonuses on strong runs:
          </p>
          <ul className="mt-6 space-y-2">
            {TIERS.map((t) => (
              <li
                key={t.name}
                className="rounded-xl border border-white/10 bg-[#1a2e14]/80 px-4 py-3"
              >
                <span className="font-semibold text-white">{t.name}</span>
                <span className="ml-2 text-amber-300">{t.pts} pts</span>
                <span className="mt-1 block text-sm text-slate-400">{t.note}</span>
              </li>
            ))}
          </ul>
          <ArticleShot
            src="/screenshots/krillion-animal-reveal.png?v=7"
            alt="Animal Krillion reveal showing rarity tier and points"
            caption="Reveal after a hit — rarity tier, points, and bonus breakdown when a rare animal lands."
          />
        </section>

        <section className="mt-12" aria-labelledby="categories-heading">
          <h3 id="categories-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Explore animal categories
          </h3>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {CATEGORIES.map((c) => (
              <li
                key={c.title}
                className="rounded-2xl border border-lime-500/25 bg-[#1a2e14]/80 p-5"
              >
                <h4 className={`${displayFont.className} text-base font-bold text-lime-200`}>
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
            <li>Seven-round animal challenge</li>
            <li>Rare-answer scoring</li>
            <li>Wildlife-themed visuals</li>
            <li>Animal rarity meter</li>
            <li>Streak bonuses</li>
            <li>Final wildlife rank</li>
            <li>Replay functionality</li>
          </ul>
          <ArticleShot
            src="/screenshots/krillion-animal-miss.png?v=7"
            alt="Animal Krillion miss screen with zero points"
            caption="Miss, pass, or timeout — +0, streak reset, then continue to the next round."
          />
        </section>

        <section className="mt-12" aria-labelledby="tips-heading">
          <h3 id="tips-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Tips for finding rare animals
          </h3>
          <ul className={`${bodyFont.className} mt-4 list-disc space-y-2 pl-5 text-base text-slate-300`}>
            <li>Don&apos;t always choose familiar zoo animals.</li>
            <li>Think about unusual habitats.</li>
            <li>Explore deep-sea creatures.</li>
            <li>Consider rare insects and amphibians.</li>
            <li>Try lesser-known species.</li>
            <li>Make sure the animal actually matches the question.</li>
          </ul>
        </section>

        <section className="mt-12" aria-labelledby="ranks-heading">
          <h3 id="ranks-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Final results and animal ranks
          </h3>
          <ul className="mt-6 space-y-2">
            {RANKS.map((r) => (
              <li
                key={r.name}
                className={`rounded-xl border px-4 py-3 ${
                  r.name === 'Animal Legend'
                    ? 'border-lime-400/40 bg-lime-500/10'
                    : 'border-white/10 bg-[#1a2e14]/80'
                }`}
              >
                <span className="font-semibold text-white">{r.name}</span>
                <span className="ml-2 text-sm text-slate-400">{r.note}</span>
              </li>
            ))}
          </ul>
          <ArticleShot
            src="/screenshots/krillion-animal-results.png?v=7"
            alt="Animal Krillion final results with rank, score, and rundown"
            caption="Final results — wildlife rank, score, prompt rundown, and Play Again."
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
                className="rounded-2xl border border-white/10 bg-[#1a2e14]/80 px-5 py-4 open:border-lime-400/30"
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
              <Link href="/" className="font-semibold text-lime-300 hover:underline">
                Krillion
              </Link>{' '}
              — home &amp; Daily Dive
            </li>
            <li>
              <Link href="/one-in-a-krillion" className="font-semibold text-lime-300 hover:underline">
                One in a Krillion
              </Link>{' '}
              — rare-answer seven-signal dive
            </li>
            <li>
              <Link href="/farflung" className="font-semibold text-lime-300 hover:underline">
                Farflung
              </Link>{' '}
              — cosmic rare-answer exploration
            </li>
            <li>
              <Link href="/noillirk" className="font-semibold text-lime-300 hover:underline">
                Noillirk
              </Link>{' '}
              — common answers win
            </li>
            <li>
              <Link
                href="/puffer-party-krillion"
                className="font-semibold text-lime-300 hover:underline"
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
