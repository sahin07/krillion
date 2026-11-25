import Link from 'next/link';
import ArticleShot from '@/components/seo/ArticleShot';
import { bodyFont, displayFont, pixelFont } from '@/lib/fonts';
import { GREAT_APE_CONFIG } from '@/lib/dive/great-ape';

const TIERS = [
  { name: 'Common Ape', pts: '10', note: 'Familiar zoo favorite' },
  { name: 'Unusual Discovery', pts: '20', note: 'A slight swerve many still share' },
  { name: 'Rare Species', pts: '40', note: 'Solid and specific' },
  { name: 'Deep Discovery', pts: '60', note: 'Uncommon · +10 rare bonus' },
  { name: 'Ultra Rare', pts: '80', note: 'Niche · +15 rare bonus' },
  { name: 'Great Ape Legend', pts: '100', note: 'Almost nobody else · +20 rare bonus' },
] as const;

const RANKS = [
  { name: 'Jungle Rookie', note: 'Beginner explorer' },
  { name: 'Primate Explorer', note: 'Knows the basics' },
  { name: 'Rare Species Hunter', note: 'Discovers unusual answers' },
  { name: 'Great Ape Expert', note: 'Strong knowledge' },
  { name: 'Great Ape Legend', note: 'Exceptional performance' },
] as const;

const CATEGORIES = [
  {
    title: 'Gorilla World',
    body: 'Questions about gorilla species, habitats, behaviour, and physical characteristics.',
  },
  {
    title: 'Orangutan Kingdom',
    body: 'Explore orangutan species, rainforest habitats, intelligence, and adaptations.',
  },
  {
    title: 'Chimpanzee Territory',
    body: 'Discover chimpanzee species, social behaviour, communication, and tool use.',
  },
  {
    title: 'Bonobo Discovery',
    body: 'Questions about bonobos, their social groups, habitats, and characteristics.',
  },
  {
    title: 'Evolution and Primate Science',
    body: 'Explore great ape evolution, anatomy, genetics, and scientific discoveries.',
  },
] as const;

const FAQS = [
  {
    q: 'What is Great Ape Krillion?',
    a: 'An original jungle-themed rare-answer game based on great apes and primate knowledge on KrillionPro. You answer seven prompts with curated valid answers; uncommon accepted answers score more.',
  },
  {
    q: 'How many rounds are in Great Ape Krillion?',
    a: `Seven rounds, ${GREAT_APE_CONFIG.promptSeconds} seconds each.`,
  },
  {
    q: 'Which animals are considered great apes?',
    a: 'Great apes include orangutans, gorillas, chimpanzees, bonobos, and humans. This mode accepts human-related answers where the curated bank lists them (for example on species or genus prompts). Monkeys and lesser apes that are not great apes do not score.',
  },
  {
    q: 'Can I submit scientific names?',
    a: 'Yes, if the answer matches the question and is recognized in the curated answer database (for example Pan paniscus or Pongo tapanuliensis).',
  },
  {
    q: 'How are rarity points calculated?',
    a: 'Correctness and rarity are separate. Only scientifically valid curated answers score. Points then follow rarity bands from Common Ape (10) to Great Ape Legend (100), plus rare-answer and streak bonuses where earned.',
  },
  {
    q: 'Is Great Ape Krillion free to play?',
    a: 'Yes. Play Great Ape Krillion free in your browser on KrillionPro — no download required.',
  },
  {
    q: 'How do you play Great Ape Krillion?',
    a: `Start the seven-round challenge, read each question, type a valid great-ape-related answer within ${GREAT_APE_CONFIG.promptSeconds} seconds, and Submit. Complete all seven rounds to see your final rank.`,
  },
  {
    q: 'Can I play Great Ape Krillion on mobile?',
    a: 'Yes — responsive on desktop, tablet, and mobile browsers. No separate app is required.',
  },
] as const;

export const GREAT_APE_FAQ_ITEMS = FAQS;

export default function GreatApeSeoArticle() {
  return (
    <article
      aria-labelledby="ga-seo-heading"
      className="border-t border-lime-500/25 bg-[#0f1a0c] text-slate-200"
    >
      <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <p
          className={`${pixelFont.className} text-[8px] uppercase tracking-[0.18em] text-lime-300 sm:text-[9px]`}
        >
          Great Ape Krillion · Enter the world of great apes
        </p>
        <h2
          id="ga-seo-heading"
          className={`${displayFont.className} mt-3 text-3xl font-bold text-white sm:text-4xl`}
        >
          Great Ape Krillion
        </h2>
        <p className={`${bodyFont.className} mt-3 text-lg font-medium text-lime-100`}>
          Enter the world of great apes. Think beyond the obvious.
        </p>
        <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
          Explore the fascinating world of great apes in a seven-round rarity challenge. Think of
          valid answers, discover unusual species, and earn points based on how rare your answers
          are. The interface above is the full playable mode — this guide covers scoring, categories,
          ranks, and tips.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href="#ga-play"
            className={`${bodyFont.className} inline-flex min-h-11 items-center justify-center rounded-full border-2 border-lime-300/70 bg-gradient-to-r from-lime-500 to-green-800 px-6 py-2.5 text-sm font-bold text-white`}
          >
            Play Now
          </a>
          <a
            href="#how-heading"
            className={`${bodyFont.className} inline-flex min-h-11 items-center justify-center rounded-full border border-white/25 bg-black/40 px-6 py-2.5 text-sm font-semibold text-slate-100 hover:border-lime-300/50`}
          >
            How to Play
          </a>
        </div>

        <section className="mt-12" aria-labelledby="what-heading">
          <h3 id="what-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            What is Great Ape Krillion?
          </h3>
          <div className={`${bodyFont.className} mt-4 space-y-4 text-base leading-relaxed text-slate-300`}>
            <p>
              Great Ape Krillion is an original jungle-themed{' '}
              <strong className="text-white">rare-answer challenge</strong> where players answer
              questions about great apes, their species, habitats, biology, and evolution.
            </p>
            <p>
              The objective is not simply to give an answer quickly. Discover valid answers that are
              less commonly submitted and earn higher rarity scores after seven rounds.
            </p>
          </div>
        </section>

        <section className="mt-12" aria-labelledby="how-heading">
          <h3 id="how-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            How to play Great Ape Krillion
          </h3>
          <ol className={`${bodyFont.className} mt-4 list-decimal space-y-3 pl-5 text-base text-slate-300`}>
            <li>Start the seven-round challenge.</li>
            <li>Read the question displayed on screen.</li>
            <li>Think of a valid great ape-related answer.</li>
            <li>Enter your answer before the timer expires ({GREAT_APE_CONFIG.promptSeconds}s).</li>
            <li>Submit it to receive your result.</li>
            <li>Earn points based on answer rarity.</li>
            <li>Complete all seven rounds to reveal your final rank.</li>
          </ol>
          <ArticleShot
            src="/screenshots/great-ape-prompt.png?v=2"
            alt="Great Ape Krillion prompt with rarity meter, timer, answer field, and Submit"
            caption="Playable interface — round counter, question card, timer, score, rarity meter, Submit / Pass."
          />
        </section>

        <section className="mt-12" aria-labelledby="scoring-heading">
          <h3 id="scoring-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Great ape rarity scoring system
          </h3>
          <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
            Correctness and rarity are evaluated separately. A scientifically incorrect answer does
            not earn points just because it sounds unusual. Only curated valid answers score:
          </p>
          <ul className="mt-6 space-y-2">
            {TIERS.map((t) => (
              <li
                key={t.name}
                className="rounded-xl border border-white/10 bg-[#14261a]/80 px-4 py-3"
              >
                <span className="font-semibold text-white">{t.name}</span>
                <span className="ml-2 text-amber-300">{t.pts} pts</span>
                <span className="mt-1 block text-sm text-slate-400">{t.note}</span>
              </li>
            ))}
          </ul>
          <ArticleShot
            src="/screenshots/great-ape-reveal.png?v=2"
            alt="Great Ape Krillion reveal showing rarity tier and points"
            caption="Reveal after a hit — rarity tier, points, and bonus breakdown."
          />
        </section>

        <section className="mt-12" aria-labelledby="categories-heading">
          <h3 id="categories-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Great ape game categories
          </h3>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {CATEGORIES.map((c) => (
              <li
                key={c.title}
                className="rounded-2xl border border-lime-500/25 bg-[#14261a]/80 p-5"
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
            <li>Seven-round challenge</li>
            <li>45-second timer per round</li>
            <li>Instant answer validation</li>
            <li>Rarity-based scoring</li>
            <li>Interactive rarity meter</li>
            <li>Increasingly challenging questions</li>
            <li>Final score and rank reveal</li>
            <li>Responsive desktop, tablet, and mobile gameplay</li>
          </ul>
          <ArticleShot
            src="/screenshots/great-ape-miss.png?v=2"
            alt="Great Ape Krillion miss screen with zero points"
            caption="Miss, pass, or timeout — +0, streak reset, then continue."
          />
        </section>

        <section className="mt-12" aria-labelledby="tips-heading">
          <h3 id="tips-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Tips to get rare answers
          </h3>
          <ul className={`${bodyFont.className} mt-4 list-disc space-y-2 pl-5 text-base text-slate-300`}>
            <li>Think beyond the most familiar great apes.</li>
            <li>Remember different species and recognized subspecies.</li>
            <li>Explore lesser-known habitats and scientific names.</li>
            <li>Avoid inventing species — only curated valid answers hit.</li>
            <li>Consider unusual but scientifically valid facts.</li>
            <li>Balance speed with answer accuracy.</li>
          </ul>
        </section>

        <section className="mt-12" aria-labelledby="ranks-heading">
          <h3 id="ranks-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Final results and player ranks
          </h3>
          <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
            At the end of seven rounds, see your total score, rundown of answers, and final rank.
          </p>
          <ul className="mt-6 space-y-2">
            {RANKS.map((r) => (
              <li
                key={r.name}
                className={`rounded-xl border px-4 py-3 ${
                  r.name === 'Great Ape Legend'
                    ? 'border-lime-400/40 bg-lime-500/10'
                    : 'border-white/10 bg-[#14261a]/80'
                }`}
              >
                <span className="font-semibold text-white">{r.name}</span>
                <span className="ml-2 text-sm text-slate-400">{r.note}</span>
              </li>
            ))}
          </ul>
          <ArticleShot
            src="/screenshots/great-ape-results.png?v=2"
            alt="Great Ape Krillion final results with rank, score, and rundown"
            caption="Final results — ape rank, score, prompt rundown, and Play Again."
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
                className="rounded-2xl border border-white/10 bg-[#14261a]/80 px-5 py-4 open:border-lime-400/30"
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
              <Link href="/krillion-animal" className="font-semibold text-lime-300 hover:underline">
                Animal Krillion
              </Link>
            </li>
            <li>
              <Link href="/science-krillion" className="font-semibold text-lime-300 hover:underline">
                Science Krillion
              </Link>
            </li>
            <li>
              <Link href="/medical-krillion" className="font-semibold text-lime-300 hover:underline">
                Medical Krillion
              </Link>
            </li>
            <li>
              <Link href="/farflung" className="font-semibold text-lime-300 hover:underline">
                Farflung
              </Link>
            </li>
            <li>
              <Link href="/wordplay-krillion" className="font-semibold text-lime-300 hover:underline">
                Wordplay Krillion
              </Link>
            </li>
            <li>
              <Link href="/one-in-a-krillion" className="font-semibold text-lime-300 hover:underline">
                One in a Krillion
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </article>
  );
}
