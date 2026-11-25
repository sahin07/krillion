import Link from 'next/link';
import ArticleShot from '@/components/seo/ArticleShot';
import { bodyFont, displayFont, pixelFont } from '@/lib/fonts';

const FAQS = [
  {
    q: 'What is the opposite of Krillion?',
    a: 'The opposite of Krillion is Reverse Krillion (also called Noillirk): same open prompts, but common correct answers score most instead of rare ones. Play it free on KrillionPro.',
  },
  {
    q: 'What is the Krillion backwards game?',
    a: 'The Krillion backwards game is Noillirk — Krillion spelled backwards. It is Reverse Krillion: think like the crowd, and popular valid answers win.',
  },
  {
    q: 'What is Noillirk?',
    a: 'Noillirk is Krillion spelled backwards — Reverse Krillion on KrillionPro. Same open prompts, flipped scoring: common correct answers score most and raise your altitude.',
  },
  {
    q: 'What is Reverse Krillion?',
    a: 'Reverse Krillion is the opposite of rare-answer Krillion. You still type one valid answer per prompt, but crowd favorites earn the high tiers instead of deep cuts.',
  },
  {
    q: 'Is “krillion opposite” or “opposite krillion” the same mode?',
    a: 'Yes. Krillion opposite, opposite Krillion, and opposite of Krillion all mean this mode — common answers win.',
  },
  {
    q: 'How is Noillirk different from Daily Dive?',
    a: 'Daily Dive rewards uncommon correct answers and sinks you deeper. Noillirk rewards popular correct answers and lifts you higher. Many players warm up on one, then switch to the other.',
  },
  {
    q: 'Do I need an account to play Noillirk?',
    a: 'No. Open Reverse Krillion or Noillirk on KrillionPro in a browser and start an ascent. No signup required.',
  },
  {
    q: 'Is there a daily Noillirk?',
    a: 'This release is practice-style: pick a prompt set and ascend anytime. Pair it with Daily Dive when you want the rare-answer shared board.',
  },
] as const;

export const REVERSE_FAQ_ITEMS = FAQS;

const TIERS = [
  { name: 'Crowd Hit', pts: '100', note: 'What almost everyone types' },
  { name: 'Popular', pts: '85', note: 'Very common, still valid' },
  { name: 'Familiar', pts: '60', note: 'Widely known' },
  { name: 'Niche', pts: '30', note: 'Fewer people pick it' },
  { name: 'Obscure / Lonely', pts: '10–15', note: 'Correct but rare — low score here' },
] as const;

export default function ReverseSeoArticle() {
  return (
    <article
      aria-labelledby="reverse-krillion-seo-heading"
      className="border-t border-amber-400/20 bg-[#0c0618] text-slate-200"
    >
      <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <p className={`${pixelFont.className} text-[8px] uppercase tracking-[0.18em] text-amber-300 sm:text-[9px]`}>
          Guide · Reverse scoring
        </p>
        <h2
          id="reverse-krillion-seo-heading"
          className={`${displayFont.className} mt-3 text-3xl font-bold text-white sm:text-4xl`}
        >
          Opposite of Krillion: the Krillion backwards game
        </h2>
        <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
          Searching for the <strong className="text-white">opposite of Krillion</strong> or a{' '}
          <strong className="text-white">Krillion backwards game</strong>? That is{' '}
          <strong className="text-white">Noillirk / Reverse Krillion</strong> on KrillionPro. Prompts stay
          open — many answers can be right — but the scoreboard pays for what the crowd would type first.
        </p>

        <section className="mt-12" aria-labelledby="opposite-heading">
          <h3 id="opposite-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            What is the opposite of Krillion?
          </h3>
          <p className={`${bodyFont.className} mt-3 text-base leading-relaxed text-slate-300`}>
            Classic Krillion rewards rare correct answers. The <strong className="text-white">opposite of
            Krillion</strong> flips that: common correct answers score most. Same timed loop as Unlimited
            (six prompts, twenty seconds each) — scoring inverts so crowd picks become Crowd Hits and deep
            cuts become Lonely Picks.
          </p>
        </section>

        <section className="mt-12" aria-labelledby="backwards-heading">
          <h3 id="backwards-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            What is the Krillion backwards game?
          </h3>
          <p className={`${bodyFont.className} mt-3 text-base leading-relaxed text-slate-300`}>
            The <strong className="text-white">Krillion backwards game</strong> is{' '}
            <Link href="/noillirk" className="font-semibold text-amber-300 hover:underline">
              Noillirk
            </Link>{' '}
            — Krillion spelled backwards. It is the same mode as{' '}
            <Link href="/reverse-krillion" className="font-semibold text-amber-300 hover:underline">
              Reverse Krillion
            </Link>
            : think like everybody, not like nobody. Altitude rises with consensus instead of depth rising
            with rarity.
          </p>
        </section>

        <section className="mt-12" aria-labelledby="how-heading">
          <h3 id="how-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            How to play
          </h3>
          <ol className={`${bodyFont.className} mt-4 list-decimal space-y-3 pl-5 text-base leading-relaxed text-slate-300`}>
            <li>Hit Begin Ascent and read the open prompt.</li>
            <li>Type the answer you think most people would give — still must be valid.</li>
            <li>Submit before the clock ends, or Pass if you are stuck.</li>
            <li>See your tier (Crowd Hit through Lonely Pick), then Ascend to the next prompt.</li>
            <li>Review The Crowd at the end — altitude and points from consensus hits.</li>
          </ol>
          <ArticleShot
            src="/screenshots/reverse-prompt.png?v=1"
            alt="Noillirk Reverse Krillion prompt screen with timer and answer field"
            caption="Prompt phase — type the crowd answer before the clock runs out."
          />
        </section>

        <section className="mt-12" aria-labelledby="scoring-heading">
          <h3 id="scoring-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Scoring tiers (common wins)
          </h3>
          <p className={`${bodyFont.className} mt-3 text-base leading-relaxed text-slate-300`}>
            Correct answers still matter. Wrong, blank, timeout, and pass score zero. Among valid hits,
            popularity is inverted from classic Krillion:
          </p>
          <ul className="mt-6 space-y-3">
            {TIERS.map((t) => (
              <li
                key={t.name}
                className="rounded-xl border border-white/10 bg-[#1a0f2e]/70 px-4 py-3"
              >
                <p className={`${displayFont.className} text-sm font-semibold text-white`}>
                  {t.name}{' '}
                  <span className={`${bodyFont.className} text-amber-300`}>{t.pts} pts</span>
                </p>
                <p className={`${bodyFont.className} mt-1 text-xs text-slate-400`}>{t.note}</p>
              </li>
            ))}
          </ul>
          <ArticleShot
            src="/screenshots/reverse-reveal.png?v=1"
            alt="Noillirk reveal showing Crowd Hit tier and points"
            caption="Reveal — a Crowd Hit lands high points and lifts altitude."
          />
          <ArticleShot
            src="/screenshots/reverse-miss.png?v=1"
            alt="Noillirk miss screen when nothing lands"
            caption="Miss — no consensus this round; +0 and continue."
          />
        </section>

        <section className="mt-12" aria-labelledby="tips-heading">
          <h3 id="tips-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Tips for Noillirk
          </h3>
          <ul className={`${bodyFont.className} mt-4 space-y-4 text-base leading-relaxed text-slate-300`}>
            <li>
              <strong className="text-white">Trust the first thought</strong> — the answer that pops up
              first is often the Crowd Hit.
            </li>
            <li>
              <strong className="text-white">Avoid clever traps</strong> — the deep cut that wins Daily Dive
              is a Lonely Pick here.
            </li>
            <li>
              <strong className="text-white">Pair the modes</strong> — warm up on Noillirk, then switch to{' '}
              <Link href="/daily-challenge" className="font-semibold text-amber-300 hover:underline">
                Daily Dive
              </Link>{' '}
              to hunt rares.
            </li>
          </ul>
          <ArticleShot
            src="/screenshots/reverse-results.png?v=1"
            alt="Noillirk ascent complete results with altitude and rundown"
            caption="Results — ascent complete with altitude, points, and prompt rundown."
          />
        </section>

        <section className="mt-12" aria-labelledby="related-heading">
          <h3 id="related-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Related games
          </h3>
          <ul className={`${bodyFont.className} mt-4 space-y-2 text-base text-slate-300`}>
            <li>
              <Link href="/daily-challenge" className="font-semibold text-amber-300 hover:underline">
                Daily Dive
              </Link>{' '}
              — rare answers win
            </li>
            <li>
              <Link href="/unlimited-krillion" className="font-semibold text-amber-300 hover:underline">
                Unlimited Krillion
              </Link>{' '}
              — rare practice, no daily cap
            </li>
            <li>
              <Link href="/games-like-krillion" className="font-semibold text-amber-300 hover:underline">
                Games like Krillion
              </Link>{' '}
              — more daily habits
            </li>
          </ul>
        </section>

        <section className="mt-12" aria-labelledby="faq-heading">
          <h3 id="faq-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            FAQ
          </h3>
          <div className="mt-6 space-y-3">
            {FAQS.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-white/10 bg-[#1a0f2e]/70 px-5 py-4 open:border-amber-400/30"
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
