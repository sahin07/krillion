import Link from 'next/link';
import ArticleShot from '@/components/seo/ArticleShot';
import { bodyFont, displayFont, pixelFont } from '@/lib/fonts';
import { MEDICAL_CONFIG } from '@/lib/dive/medical';

const TIERS = [
  { name: 'Common Knowledge', pts: '10', note: 'Textbook favorite' },
  { name: 'Medical Student', pts: '20', note: 'Solid first-year recall' },
  { name: 'Uncommon Finding', pts: '40', note: 'Specific and less shared' },
  { name: 'Rare Discovery', pts: '60', note: 'Uncommon · +10 rare bonus' },
  { name: 'Specialist Knowledge', pts: '80', note: 'Niche · +15 rare bonus' },
  { name: 'Medical Legend', pts: '100', note: 'Almost nobody else · +20 rare bonus' },
] as const;

const RANKS = [
  { name: 'Medical Rookie', note: 'Beginner' },
  { name: 'Anatomy Explorer', note: 'Intermediate' },
  { name: 'Clinical Thinker', note: 'Advanced' },
  { name: 'Medical Specialist', note: 'Expert' },
  { name: 'Medical Legend', note: 'Highest rank' },
] as const;

const CATEGORIES = [
  {
    title: 'Human Anatomy',
    body: 'Bones, muscles, organs, nerves and body structures.',
  },
  {
    title: 'Physiology and Biology',
    body: 'Body functions, hormones, cells and biological processes.',
  },
  {
    title: 'Medical Tests and Instruments',
    body: 'Diagnostic tests, imaging equipment and clinical instruments.',
  },
  {
    title: 'Pharmacology',
    body: 'Drug classes, medication names and pharmaceutical terminology.',
  },
  {
    title: 'Diseases and Medical Specialties',
    body: 'Medical conditions, specialties, symptoms and healthcare terminology.',
  },
] as const;

const FAQS = [
  {
    q: 'What is Medical Krillion?',
    a: 'Medical Krillion is an original medical-themed rare-answer game on KrillionPro. You answer seven medical prompts with curated correct answers; uncommon accepted findings score more. It is a recreational vocabulary and knowledge game — not a diagnostic tool or substitute for medical education.',
  },
  {
    q: 'Is Medical Krillion free to play?',
    a: 'Yes. Play Medical Krillion free in your browser on KrillionPro — no download required.',
  },
  {
    q: 'How do you play Medical Krillion?',
    a: `Start your challenge, read each medical prompt, type a medically correct answer within ${MEDICAL_CONFIG.promptSeconds} seconds, and Submit. Complete seven rounds for your final medical rank.`,
  },
  {
    q: 'How does medical rarity scoring work?',
    a: 'Accepted answers land in bands from Common Knowledge (10) to Medical Legend (100). Rare Discovery and above also get rare-answer bonuses. Consecutive hits add streak bonuses. Rarity is separate from correctness — wrong answers never score.',
  },
  {
    q: 'What medical topics are included?',
    a: 'Human anatomy, physiology and biology, medical tests and instruments, pharmacology, and diseases / medical specialties — each dive mixes fields across seven rounds.',
  },
  {
    q: 'Can I play Medical Krillion on mobile?',
    a: 'Yes in a mobile browser. Type with the on-screen keyboard. No separate app is required.',
  },
  {
    q: 'Are alternative medical terms accepted?',
    a: 'Yes. Common names, standard medical names, and recognized synonyms are accepted when they match the curated bank for that prompt. Related but different structures still miss.',
  },
  {
    q: 'How many rounds are in the game?',
    a: `Seven rounds, ${MEDICAL_CONFIG.promptSeconds} seconds each.`,
  },
  {
    q: 'Is Medical Krillion useful for medical students?',
    a: 'It can be a fun way to practice recalling terminology and less common structures. It is not a study curriculum, exam prep course, or clinical reference.',
  },
  {
    q: 'How can I earn the highest score?',
    a: 'Think beyond common textbook examples, use precise medical terms, aim for Specialist Knowledge and Medical Legend hits, and protect your streak.',
  },
] as const;

export const MEDICAL_FAQ_ITEMS = FAQS;

export default function MedicalSeoArticle() {
  return (
    <article
      aria-labelledby="med-seo-heading"
      className="border-t border-sky-500/25 bg-[#020810] text-slate-200"
    >
      <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <p
          className={`${pixelFont.className} text-[8px] uppercase tracking-[0.18em] text-sky-300 sm:text-[9px]`}
        >
          Medical Krillion · Think rarer. Know more.
        </p>
        <h2
          id="med-seo-heading"
          className={`${displayFont.className} mt-3 text-3xl font-bold text-white sm:text-4xl`}
        >
          Medical Krillion — rare-answer research guide
        </h2>
        <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
          Test your medical knowledge. Discover uncommon answers. Earn your medical rank. The
          interface above is the full playable mode — this guide covers scoring, categories, ranks,
          and tips.
        </p>
        <p className={`${bodyFont.className} mt-3 text-sm leading-relaxed text-slate-400`}>
          Recreational medical vocabulary game only — not a diagnostic tool, treatment guide, or
          substitute for professional medical education.
        </p>
        <p className="mt-5">
          <a
            href="#med-play"
            className={`${bodyFont.className} inline-flex min-h-11 items-center justify-center rounded-full border-2 border-sky-300/70 bg-gradient-to-r from-sky-500 to-teal-700 px-6 py-2.5 text-sm font-bold text-white`}
          >
            Play Now
          </a>
        </p>

        <section className="mt-12" aria-labelledby="what-heading">
          <h3 id="what-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            What is Medical Krillion?
          </h3>
          <div className={`${bodyFont.className} mt-4 space-y-4 text-base leading-relaxed text-slate-300`}>
            <p>
              A medical knowledge and <strong className="text-white">rare-answer challenge</strong>.
              Players receive open-ended medical questions. Multiple answers may be correct.
            </p>
            <p>
              Less common correct answers earn more points. The objective is to complete seven rounds
              with the highest score and medical rank.
            </p>
          </div>
        </section>

        <section className="mt-12" aria-labelledby="how-heading">
          <h3 id="how-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            How to play Medical Krillion
          </h3>
          <ol className={`${bodyFont.className} mt-4 list-decimal space-y-3 pl-5 text-base text-slate-300`}>
            <li>Start your medical challenge.</li>
            <li>Read the medical prompt.</li>
            <li>Think of a medically correct answer.</li>
            <li>Enter your answer before the timer expires ({MEDICAL_CONFIG.promptSeconds}s).</li>
            <li>Submit and discover its rarity score.</li>
            <li>Complete all seven rounds.</li>
            <li>Review your final score and medical rank.</li>
          </ol>
          <ArticleShot
            src="/screenshots/medical-prompt.png?v=1"
            alt="Medical Krillion prompt with rarity meter, timer, answer field, and Submit"
            caption="Playable interface — medical question card, countdown, answer field, Submit / Pass."
          />
        </section>

        <section className="mt-12" aria-labelledby="scoring-heading">
          <h3 id="scoring-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Medical rarity scoring system
          </h3>
          <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
            Every accepted finding lands in a rarity band. Only curated medically correct answers
            (with aliases) score — obscure-sounding terms that are wrong still earn zero:
          </p>
          <ul className="mt-6 space-y-2">
            {TIERS.map((t) => (
              <li
                key={t.name}
                className="rounded-xl border border-white/10 bg-[#04121f]/80 px-4 py-3"
              >
                <span className="font-semibold text-white">{t.name}</span>
                <span className="ml-2 text-amber-300">{t.pts} pts</span>
                <span className="mt-1 block text-sm text-slate-400">{t.note}</span>
              </li>
            ))}
          </ul>
          <ArticleShot
            src="/screenshots/medical-reveal.png?v=1"
            alt="Medical Krillion reveal showing rarity tier and points"
            caption="Reveal after a hit — rarity tier, points, and bonus breakdown."
          />
        </section>

        <section className="mt-12" aria-labelledby="categories-heading">
          <h3 id="categories-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Explore medical question categories
          </h3>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {CATEGORIES.map((c) => (
              <li
                key={c.title}
                className="rounded-2xl border border-sky-500/25 bg-[#04121f]/80 p-5"
              >
                <h4 className={`${displayFont.className} text-base font-bold text-sky-200`}>
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
            <li>Seven-round medical challenge</li>
            <li>Multiple medical question categories</li>
            <li>Rare-answer scoring</li>
            <li>Medical rarity meter</li>
            <li>Countdown timer</li>
            <li>Alternative accepted medical terms</li>
            <li>Streak bonuses</li>
            <li>Final score and achievement ranks</li>
            <li>Replay functionality</li>
          </ul>
          <ArticleShot
            src="/screenshots/medical-miss.png?v=1"
            alt="Medical Krillion miss screen with zero points"
            caption="Miss, pass, or timeout — +0, streak reset, then continue."
          />
        </section>

        <section className="mt-12" aria-labelledby="tips-heading">
          <h3 id="tips-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Tips for finding rare medical answers
          </h3>
          <ul className={`${bodyFont.className} mt-4 list-disc space-y-2 pl-5 text-base text-slate-300`}>
            <li>Think beyond common textbook examples.</li>
            <li>Remember anatomical structures with less familiar names.</li>
            <li>Explore different medical specialties.</li>
            <li>Consider specific instruments and diagnostic terminology.</li>
            <li>Use correct medical terminology and accepted synonyms.</li>
            <li>Make sure your answer actually fits the question.</li>
          </ul>
        </section>

        <section className="mt-12" aria-labelledby="ranks-heading">
          <h3 id="ranks-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Final results and medical ranks
          </h3>
          <ul className="mt-6 space-y-2">
            {RANKS.map((r) => (
              <li
                key={r.name}
                className={`rounded-xl border px-4 py-3 ${
                  r.name === 'Medical Legend'
                    ? 'border-sky-400/40 bg-sky-500/10'
                    : 'border-white/10 bg-[#04121f]/80'
                }`}
              >
                <span className="font-semibold text-white">{r.name}</span>
                <span className="ml-2 text-sm text-slate-400">{r.note}</span>
              </li>
            ))}
          </ul>
          <ArticleShot
            src="/screenshots/medical-results.png?v=1"
            alt="Medical Krillion final results with rank, score, and rundown"
            caption="Final results — medical rank, score, prompt rundown, and Play Again."
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
                className="rounded-2xl border border-white/10 bg-[#04121f]/80 px-5 py-4 open:border-sky-400/30"
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
              <Link href="/" className="font-semibold text-sky-300 hover:underline">
                Krillion
              </Link>
            </li>
            <li>
              <Link href="/science-krillion" className="font-semibold text-sky-300 hover:underline">
                Science Krillion
              </Link>
            </li>
            <li>
              <Link href="/krillion-animal" className="font-semibold text-sky-300 hover:underline">
                Animal Krillion
              </Link>
            </li>
            <li>
              <Link href="/wordplay-krillion" className="font-semibold text-sky-300 hover:underline">
                Wordplay Krillion
              </Link>
            </li>
            <li>
              <Link href="/one-in-a-krillion" className="font-semibold text-sky-300 hover:underline">
                One in a Krillion
              </Link>
            </li>
            <li>
              <Link href="/farflung" className="font-semibold text-sky-300 hover:underline">
                Farflung
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </article>
  );
}
