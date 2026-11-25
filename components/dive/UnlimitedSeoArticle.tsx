import Link from 'next/link';
import ArticleShot from '@/components/seo/ArticleShot';
import { bodyFont, displayFont, pixelFont } from '@/lib/fonts';
import { RELATED_GAMES } from '@/lib/game-pages';
import { cn } from '@/lib/utils';

const PLAY_STEPS = [
  {
    n: '1',
    title: 'Pick a charted dive',
    body: 'Choose any Endless Dive pack from the lobby. Fresh practice sets whenever you want — no daily wait.',
  },
  {
    n: '2',
    title: 'Answer in 20 seconds',
    body: 'Six prompts. Type one answer and submit. Pass if you’re stuck — zero for that prompt, dive continues.',
  },
  {
    n: '3',
    title: 'Chase rarity, not speed alone',
    body: 'Valid answers score by rarity. Common picks barely move you. Unusual valid picks sink you deeper.',
  },
  {
    n: '4',
    title: 'Surface, then dive again',
    body: 'Review your catch, then hit Next Dive for another pack. Unlimited is practice — Daily stays the shared event.',
  },
] as const;

const TIERS = [
  { name: 'Plankton', pts: 10, example: 'Crowd answer — spaghetti, gorilla, shark.' },
  { name: 'Too Clever', pts: 15, example: 'Clever, but a whole school still typed it.' },
  { name: 'Schooler', pts: 30, example: 'Specific and respectable — still shared water.' },
  { name: 'Rare', pts: 60, example: 'Genuinely uncommon — the “oh, good one.”' },
  { name: 'Deep Cut', pts: 85, example: 'Niche knowledge few divers reach.' },
  { name: 'One in a Krillion', pts: 100, example: 'Correct, and almost nobody else would type it first.' },
] as const;

const FAQS = [
  {
    q: 'What is Unlimited Krillion?',
    a: 'Unlimited Krillion (also called Krillion Unlimited) is KrillionPro’s practice mode: six open prompts, twenty seconds each, with the same rarity scoring as Daily Dive. Dive again anytime.',
  },
  {
    q: 'How is Unlimited different from Daily Challenge?',
    a: 'Daily = one shared eight-prompt set per UTC day for comparable scores. Unlimited = pick charted packs and replay for practice whenever you want.',
  },
  {
    q: 'How many questions is Unlimited?',
    a: 'Six prompts per dive, twenty seconds each. Rarer valid answers score more and push your depth.',
  },
  {
    q: 'Does Unlimited count for my daily streak?',
    a: 'No. Streak and today’s competitive board update when you finish the live Daily Dive, not Unlimited practice.',
  },
  {
    q: 'Can I choose which dive pack to play?',
    a: 'Yes. The lobby lets you pick among charted Endless Dive packs, then Begin Descent.',
  },
  {
    q: 'Is Unlimited free?',
    a: 'Yes. Unlimited Krillion runs in the browser on KrillionPro with no download required.',
  },
] as const;

const RELATED_CARDS = [
  {
    href: '/daily-challenge',
    title: 'Daily Dive',
    body: 'The shared ocean challenge of the day. Eight prompts. Compare depth with friends.',
  },
  {
    href: '/minecraft-krillion-game',
    title: 'Minecraft Krillion',
    body: 'Same rarity twist with Minecraft-themed prompts. Fan-made.',
  },
  {
    href: '/',
    title: 'KrillionPro home',
    body: 'How to play, tiers, and the full player guide.',
  },
  {
    href: '/games',
    title: 'Games hub',
    body: 'Browse modes and packs in one place.',
  },
] as const;

export const UNLIMITED_FAQ_ITEMS = FAQS;

export default function UnlimitedSeoArticle() {
  return (
    <article
      id="unlimited-guide"
      aria-labelledby="unlimited-seo-heading"
      className="scroll-mt-20 border-t border-[#67e8f9]/15 bg-[#030914] text-slate-200"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <header className="max-w-3xl">
          <p className={`${pixelFont.className} text-[8px] uppercase tracking-[0.16em] text-cyan-300 sm:text-[9px]`}>
            Unlimited Krillion · Player guide
          </p>
          <h2
            id="unlimited-seo-heading"
            className={`${displayFont.className} mt-3 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl`}
          >
            How Unlimited Krillion works on KrillionPro
          </h2>
          <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300 sm:text-lg`}>
            Done with today’s shared dive? Keep going. Six prompts. Twenty seconds each. Rare answers
            sink deeper — dive again anytime.
          </p>
        </header>

        <nav aria-label="Related games" className="mt-8">
          <p className={`${pixelFont.className} text-[8px] tracking-[0.18em] text-cyan-300`}>RELATED GAMES</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {RELATED_GAMES.map((game) => (
              <li key={game.id}>
                <Link
                  href={game.href}
                  aria-current={game.id === 'unlimited' ? 'page' : undefined}
                  className={cn(
                    pixelFont.className,
                    'inline-flex items-center rounded-full border px-3 py-1.5 text-[8px] tracking-wide transition-colors sm:text-[9px]',
                    game.id === 'unlimited'
                      ? 'border-cyan-400 bg-cyan-500/20 text-cyan-100'
                      : 'border-white/15 bg-black/30 text-slate-300 hover:border-cyan-400/50 hover:text-white'
                  )}
                >
                  {game.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ArticleShot
          src="/screenshots/unlimited-prompt.png?v=1"
          alt="Unlimited Krillion gameplay with prompt, countdown timer, answer field, Pass and Submit"
          caption="Live Unlimited dive — six prompts, 20-second timer, answer box, Pass, and Submit."
        />

        <section className="mt-4 max-w-3xl" aria-labelledby="what-unlimited-heading">
          <h3 id="what-unlimited-heading" className={`${displayFont.className} text-2xl font-bold text-white sm:text-3xl`}>
            What is Unlimited Krillion?
          </h3>
          <div className={`${bodyFont.className} mt-4 space-y-4 text-base leading-relaxed text-slate-300`}>
            <p>
              Unlimited is KrillionPro’s endless practice mode. Same rarity twist as the Daily Dive —
              open prompts, many valid answers, uncommon correct picks worth more — without the
              once-per-day shared set. If you searched for Krillion Unlimited, you are in the right
              place: one mode, two common names.
            </p>
            <p>
              Pick a charted Endless Dive pack, begin descent, and chase depth. When you surface, take
              the next pack immediately. That keeps skill sharp for tomorrow’s Daily without mixing
              practice scores into the competitive board.
            </p>
            <p>
              Prefer the shared ocean event? Play{' '}
              <Link href="/daily-challenge" className="font-semibold text-cyan-300 hover:underline">
                Daily Dive
              </Link>
              . Want a themed bank? Try{' '}
              <Link href="/minecraft-krillion-game" className="font-semibold text-cyan-300 hover:underline">
                Minecraft Krillion
              </Link>
              .
            </p>
          </div>
        </section>

        <ArticleShot
          src="/screenshots/unlimited-reveal.png?v=1"
          alt="Unlimited Krillion reveal showing rarity tier and points after a valid rare answer"
          caption="After you submit — rarity tier, points earned, and depth when an unusual valid answer lands."
        />

        <section className="mt-12" aria-labelledby="how-unlimited-play-heading">
          <h3 id="how-unlimited-play-heading" className={`${displayFont.className} text-2xl font-bold text-white sm:text-3xl`}>
            How to play Unlimited
          </h3>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2">
            {PLAY_STEPS.map((step) => (
              <li key={step.n} className="rounded-2xl border border-white/10 bg-[#07122b]/70 p-5">
                <p className={`${pixelFont.className} text-[8px] text-cyan-300`}>STEP {step.n}</p>
                <h4 className={`${displayFont.className} mt-2 text-xl font-bold text-white`}>{step.title}</h4>
                <p className={`${bodyFont.className} mt-2 text-sm leading-relaxed text-slate-300`}>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <ArticleShot
          src="/screenshots/unlimited-miss.png?v=1"
          alt="Unlimited Krillion miss reveal with Nothing landed, zero points, and Next"
          caption="Miss, pass, or time out for +0 — then Next. The dive keeps going either way."
        />

        <section className="mt-14" aria-labelledby="unlimited-tiers-heading">
          <h3 id="unlimited-tiers-heading" className={`${displayFont.className} text-2xl font-bold text-white sm:text-3xl`}>
            Scoring on Unlimited
          </h3>
          <p className={`${bodyFont.className} mt-4 max-w-3xl text-base leading-relaxed text-slate-300`}>
            Every point sinks you 10 metres. Wrong answers score zero for that prompt only — they do
            not erase earlier depth.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TIERS.map((t) => (
              <li key={t.name} className="rounded-2xl border border-white/10 bg-[#07122b]/75 p-4">
                <p className={`${displayFont.className} text-lg font-bold text-white`}>{t.name}</p>
                <p className={`${bodyFont.className} mt-1 text-sm text-cyan-300`}>+{t.pts} pts</p>
                <p className={`${bodyFont.className} mt-2 text-xs leading-relaxed text-slate-400`}>{t.example}</p>
              </li>
            ))}
          </ul>
        </section>

        <ArticleShot
          src="/screenshots/unlimited-results.png?v=1"
          alt="Unlimited Krillion results screen with score, depth, and answer rundown"
          caption="Surface screen — total score, final depth, prompt rundown, then Next Dive when you want more."
        />

        <section className="mt-14" aria-labelledby="unlimited-related-heading">
          <h3 id="unlimited-related-heading" className={`${displayFont.className} text-2xl font-bold text-white sm:text-3xl`}>
            Related games
          </h3>
          <p className={`${bodyFont.className} mt-3 max-w-3xl text-base leading-relaxed text-slate-300`}>
            Practice here, then take the shared Daily or a themed pack.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {RELATED_CARDS.map((m) => (
              <li key={m.href}>
                <Link
                  href={m.href}
                  className="block h-full rounded-2xl border border-[#67e8f9]/25 bg-[#07122b]/80 p-5 transition-colors hover:border-cyan-300/50 hover:bg-[#0a1a3a]"
                >
                  <p className={`${displayFont.className} text-lg font-bold text-white`}>{m.title}</p>
                  <p className={`${bodyFont.className} mt-2 text-sm leading-relaxed text-slate-300`}>{m.body}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14" aria-labelledby="unlimited-faq-heading">
          <h3 id="unlimited-faq-heading" className={`${displayFont.className} text-2xl font-bold text-white sm:text-3xl`}>
            Unlimited Krillion questions
          </h3>
          <div className="mt-6 space-y-3">
            {FAQS.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-white/10 bg-[#07122b]/70 px-5 py-4 open:border-cyan-400/30"
              >
                <summary className={`${bodyFont.className} cursor-pointer list-none text-base font-semibold text-white`}>
                  {item.q}
                </summary>
                <p className={`${bodyFont.className} mt-3 text-sm leading-relaxed text-slate-300`}>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <p className={`${bodyFont.className} mt-12 max-w-3xl text-xs leading-relaxed text-slate-500`}>
          KrillionPro is an independent browser games site. See{' '}
          <Link href="/about" className="text-cyan-400 hover:underline">
            About
          </Link>
          ,{' '}
          <Link href="/privacy" className="text-cyan-400 hover:underline">
            Privacy
          </Link>
          , and{' '}
          <Link href="/terms" className="text-cyan-400 hover:underline">
            Terms
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
