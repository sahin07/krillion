import Link from 'next/link';
import ArticleShot from '@/components/seo/ArticleShot';
import { bodyFont, displayFont, pixelFont } from '@/lib/fonts';
import { SCIENCE_CONFIG } from '@/lib/dive/science';

const TIERS = [
  { name: 'Common Discovery', pts: '10', note: 'Textbook favorite' },
  { name: 'Unusual Discovery', pts: '20', note: 'A slight swerve many still share' },
  { name: 'Rare Discovery', pts: '40', note: 'Solid and specific' },
  { name: 'Advanced Discovery', pts: '60', note: 'Uncommon · +10 rare bonus' },
  { name: 'Ultra Rare Discovery', pts: '80', note: 'Niche · +15 rare bonus' },
  { name: 'Scientific Legend', pts: '100', note: 'Almost nobody else · +20 rare bonus' },
] as const;

const RANKS = [
  { name: 'Science Rookie', note: 'Beginner' },
  { name: 'Curious Researcher', note: 'Intermediate' },
  { name: 'Discovery Hunter', note: 'Advanced' },
  { name: 'Science Master', note: 'Expert' },
  { name: 'Scientific Legend', note: 'Highest rank' },
] as const;

const CATEGORIES = [
  {
    title: 'Physics',
    body: 'Forces, energy, motion, electricity and unusual physical phenomena.',
  },
  {
    title: 'Biology',
    body: 'Animals, cells, genetics, human anatomy and living organisms.',
  },
  {
    title: 'Chemistry',
    body: 'Elements, compounds, reactions and unusual chemical substances.',
  },
  {
    title: 'Astronomy',
    body: 'Planets, stars, moons, galaxies and cosmic discoveries.',
  },
  {
    title: 'Earth Science',
    body: 'Rocks, minerals, volcanoes, oceans and Earth\'s natural processes.',
  },
] as const;

const FAQS = [
  {
    q: 'What is Science Krillion?',
    a: 'Science Krillion is an original science-themed rare-answer game on KrillionPro. You answer seven science prompts with scientifically valid answers; uncommon accepted discoveries score more.',
  },
  {
    q: 'Is Science Krillion free to play?',
    a: 'Yes. Play Science Krillion free in your browser on KrillionPro — no download required.',
  },
  {
    q: 'How do you play Science Krillion?',
    a: 'Start your challenge, read each question, type an unusual but scientifically valid answer within 45 seconds, and Submit. Complete seven rounds for your final science rank.',
  },
  {
    q: 'How does science rarity scoring work?',
    a: 'Accepted answers land in bands from Common Discovery (10) to Scientific Legend (100). Advanced and above also get rare-answer bonuses. Consecutive hits add streak bonuses.',
  },
  {
    q: 'What science categories are included?',
    a: 'Physics, biology, chemistry, astronomy, and earth science — each dive mixes fields across seven rounds.',
  },
  {
    q: 'Can I play Science Krillion on mobile?',
    a: 'Yes in a mobile browser. Type with the on-screen keyboard. No separate app is required.',
  },
  {
    q: 'Do answers need to be scientifically accurate?',
    a: 'Yes. Only curated scientifically correct answers (plus accepted spellings and aliases) score. Incorrect or unrelated answers earn nothing.',
  },
  {
    q: 'How many rounds are in the game?',
    a: `Seven rounds, ${SCIENCE_CONFIG.promptSeconds} seconds each.`,
  },
  {
    q: 'How can I earn the highest score?',
    a: 'Think beyond basic textbook examples, stay accurate, aim for Ultra Rare and Scientific Legend hits, and protect your streak.',
  },
] as const;

export const SCIENCE_FAQ_ITEMS = FAQS;

export default function ScienceSeoArticle() {
  return (
    <article
      aria-labelledby="sci-seo-heading"
      className="border-t border-cyan-500/25 bg-[#020810] text-slate-200"
    >
      <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <p
          className={`${pixelFont.className} text-[8px] uppercase tracking-[0.18em] text-cyan-300 sm:text-[9px]`}
        >
          Science Krillion · Think. Discover. Score.
        </p>
        <h2
          id="sci-seo-heading"
          className={`${displayFont.className} mt-3 text-3xl font-bold text-white sm:text-4xl`}
        >
          Science Krillion — rare-answer research guide
        </h2>
        <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
          Test your knowledge. Find rare discoveries. Become a Scientific Legend. The interface above
          is the full playable mode — this guide covers scoring, categories, ranks, and tips.
        </p>
        <p className="mt-5">
          <a
            href="#sci-play"
            className={`${bodyFont.className} inline-flex min-h-11 items-center justify-center rounded-full border-2 border-cyan-300/70 bg-gradient-to-r from-cyan-500 to-blue-700 px-6 py-2.5 text-sm font-bold text-white`}
          >
            Play Now
          </a>
        </p>

        <section className="mt-12" aria-labelledby="what-heading">
          <h3 id="what-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            What is Science Krillion?
          </h3>
          <div className={`${bodyFont.className} mt-4 space-y-4 text-base leading-relaxed text-slate-300`}>
            <p>
              A science-themed <strong className="text-white">rare-answer challenge</strong>. Players
              answer questions from different scientific fields. Answers must be scientifically correct
              and relevant.
            </p>
            <p>
              Uncommon accepted answers earn more points. The goal is the highest science rarity rank
              after seven rounds.
            </p>
          </div>
        </section>

        <section className="mt-12" aria-labelledby="how-heading">
          <h3 id="how-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            How to play Science Krillion
          </h3>
          <ol className={`${bodyFont.className} mt-4 list-decimal space-y-3 pl-5 text-base text-slate-300`}>
            <li>Start your science challenge.</li>
            <li>Read the question carefully.</li>
            <li>Think of an unusual but scientifically valid answer.</li>
            <li>Enter your answer before time runs out ({SCIENCE_CONFIG.promptSeconds}s).</li>
            <li>Submit and discover its rarity score.</li>
            <li>Complete all seven rounds.</li>
            <li>See your final score and science rank.</li>
          </ol>
          <ArticleShot
            src="/screenshots/science-prompt.png?v=1"
            alt="Science Krillion prompt with rarity meter, timer, answer field, and Submit"
            caption="Playable interface — science question card, countdown, answer field, Submit / Pass."
          />
        </section>

        <section className="mt-12" aria-labelledby="scoring-heading">
          <h3 id="scoring-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Science rarity scoring system
          </h3>
          <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
            Every accepted discovery lands in a rarity band. Only curated scientifically correct
            answers (with aliases) score — obscure-sounding terms that are wrong still earn zero:
          </p>
          <ul className="mt-6 space-y-2">
            {TIERS.map((t) => (
              <li
                key={t.name}
                className="rounded-xl border border-white/10 bg-[#061428]/80 px-4 py-3"
              >
                <span className="font-semibold text-white">{t.name}</span>
                <span className="ml-2 text-amber-300">{t.pts} pts</span>
                <span className="mt-1 block text-sm text-slate-400">{t.note}</span>
              </li>
            ))}
          </ul>
          <ArticleShot
            src="/screenshots/science-reveal.png?v=1"
            alt="Science Krillion reveal showing rarity tier and points"
            caption="Reveal after a hit — discovery tier, points, and bonus breakdown."
          />
        </section>

        <section className="mt-12" aria-labelledby="categories-heading">
          <h3 id="categories-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Explore science categories
          </h3>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {CATEGORIES.map((c) => (
              <li
                key={c.title}
                className="rounded-2xl border border-cyan-500/25 bg-[#061428]/80 p-5"
              >
                <h4 className={`${displayFont.className} text-base font-bold text-cyan-200`}>
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
            <li>Seven-round science challenge</li>
            <li>Multiple science categories</li>
            <li>Rare-answer scoring system</li>
            <li>Science rarity meter</li>
            <li>Countdown timer</li>
            <li>Consecutive-answer streak bonuses</li>
            <li>Final score and achievement ranks</li>
            <li>Replay functionality</li>
          </ul>
          <ArticleShot
            src="/screenshots/science-miss.png?v=1"
            alt="Science Krillion miss screen with zero points"
            caption="Miss, pass, or timeout — +0, streak reset, then continue."
          />
        </section>

        <section className="mt-12" aria-labelledby="tips-heading">
          <h3 id="tips-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Tips for finding rare science answers
          </h3>
          <ul className={`${bodyFont.className} mt-4 list-disc space-y-2 pl-5 text-base text-slate-300`}>
            <li>Think beyond basic textbook examples.</li>
            <li>Explore less familiar scientific discoveries.</li>
            <li>Consider unusual species, elements and celestial objects.</li>
            <li>Give specific answers rather than broad categories.</li>
            <li>Make sure every answer is scientifically accurate.</li>
            <li>Avoid inventing scientific terms.</li>
          </ul>
        </section>

        <section className="mt-12" aria-labelledby="ranks-heading">
          <h3 id="ranks-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Final results and science ranks
          </h3>
          <ul className="mt-6 space-y-2">
            {RANKS.map((r) => (
              <li
                key={r.name}
                className={`rounded-xl border px-4 py-3 ${
                  r.name === 'Scientific Legend'
                    ? 'border-cyan-400/40 bg-cyan-500/10'
                    : 'border-white/10 bg-[#061428]/80'
                }`}
              >
                <span className="font-semibold text-white">{r.name}</span>
                <span className="ml-2 text-sm text-slate-400">{r.note}</span>
              </li>
            ))}
          </ul>
          <ArticleShot
            src="/screenshots/science-results.png?v=1"
            alt="Science Krillion final results with rank, score, and rundown"
            caption="Final results — science rank, score, prompt rundown, and Play Again."
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
                className="rounded-2xl border border-white/10 bg-[#061428]/80 px-5 py-4 open:border-cyan-400/30"
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
              <Link href="/" className="font-semibold text-cyan-300 hover:underline">
                Krillion
              </Link>
            </li>
            <li>
              <Link href="/one-in-a-krillion" className="font-semibold text-cyan-300 hover:underline">
                One in a Krillion
              </Link>
            </li>
            <li>
              <Link href="/wordplay-krillion" className="font-semibold text-cyan-300 hover:underline">
                Wordplay Krillion
              </Link>
            </li>
            <li>
              <Link href="/krillion-animal" className="font-semibold text-cyan-300 hover:underline">
                Animal Krillion
              </Link>
            </li>
            <li>
              <Link href="/farflung" className="font-semibold text-cyan-300 hover:underline">
                Farflung
              </Link>
            </li>
            <li>
              <Link href="/noillirk" className="font-semibold text-cyan-300 hover:underline">
                Noillirk
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </article>
  );
}
