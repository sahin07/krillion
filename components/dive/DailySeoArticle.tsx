import Link from 'next/link';
import ArticleShot from '@/components/seo/ArticleShot';
import { bodyFont, displayFont, pixelFont } from '@/lib/fonts';
import { RELATED_GAMES } from '@/lib/game-pages';
import { cn } from '@/lib/utils';

const PLAY_STEPS = [
  {
    n: '1',
    title: 'Open today’s challenge',
    body: 'Everyone gets the same eight prompts on the UTC day. Hit Start today’s challenge when you’re ready.',
  },
  {
    n: '2',
    title: 'Answer in 20 seconds',
    body: 'One answer per prompt. Type it and submit. Pass if you’re stuck — zero points, dive continues.',
  },
  {
    n: '3',
    title: 'Watch rarity pull you deeper',
    body: 'Valid answers score by rarity. Common picks barely move you. Unusual valid picks sink you further.',
  },
  {
    n: '4',
    title: 'Surface, share, come back tomorrow',
    body: 'See depth, score, rarest hit, and post to today’s device board. A new shared dive lands tomorrow.',
  },
] as const;

const TIERS = [
  { name: 'Plankton', pts: 10, example: 'Crowd answer — fish, blue, chess.' },
  { name: 'Too Clever', pts: 15, example: 'Clever, but a whole school still typed it.' },
  { name: 'Schooler', pts: 30, example: 'Specific and respectable — still shared water.' },
  { name: 'Rare', pts: 60, example: 'Genuinely uncommon — the “oh, good one.”' },
  { name: 'Deep Cut', pts: 85, example: 'Niche knowledge few divers reach.' },
  { name: 'One in a Krillion', pts: 100, example: 'Correct, and almost nobody else would type it first.' },
] as const;

const FAQS = [
  {
    q: 'Is Daily Challenge the same for everyone?',
    a: 'Yes. One shared prompt set per UTC day so scores are comparable on today’s board.',
  },
  {
    q: 'How many questions is the Daily Dive?',
    a: 'Eight prompts, twenty seconds each. Rarer valid answers score more and push your depth.',
  },
  {
    q: 'Can I replay today’s dive?',
    a: 'You can practice from the archive. Today’s competitive board keeps your best score under your diver name on this device.',
  },
  {
    q: 'Where are today’s answers?',
    a: 'We don’t publish spoiler lists. Use How scoring works for tips — keep the dive fair.',
  },
  {
    q: 'How is Daily different from Unlimited?',
    a: 'Daily = same eight for everyone, once a day. Unlimited = new question sets whenever you want.',
  },
  {
    q: 'Does practice count for my streak?',
    a: 'Streak and today’s board update when you finish the live daily (not archive practice dates).',
  },
] as const;

const RELATED_CARDS = [
  {
    href: '/unlimited-krillion',
    title: 'Unlimited Krillion',
    body: 'Done with today? Keep diving with fresh practice sets anytime.',
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

export default function DailySeoArticle() {
  return (
    <article
      id="daily-guide"
      aria-labelledby="daily-seo-heading"
      className="scroll-mt-20 border-t border-[#67e8f9]/15 bg-[#030914] text-slate-200"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <header className="max-w-3xl">
          <p className={`${pixelFont.className} text-[8px] uppercase tracking-[0.16em] text-cyan-300 sm:text-[9px]`}>
            Daily Challenge · Player guide
          </p>
          <h2
            id="daily-seo-heading"
            className={`${displayFont.className} mt-3 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl`}
          >
            How the Daily Dive works on KrillionPro
          </h2>
          <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300 sm:text-lg`}>
            One shared challenge for everyone. Eight questions. Twenty seconds each. Rare answers take you deeper —
            then come back tomorrow for a new dive.
          </p>
        </header>

        <nav aria-label="Related games" className="mt-8">
          <p className={`${pixelFont.className} text-[8px] tracking-[0.18em] text-cyan-300`}>RELATED GAMES</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {RELATED_GAMES.map((game) => (
              <li key={game.id}>
                <Link
                  href={game.href}
                  aria-current={game.id === 'daily' ? 'page' : undefined}
                  className={cn(
                    pixelFont.className,
                    'inline-flex items-center rounded-full border px-3 py-1.5 text-[8px] tracking-wide transition-colors sm:text-[9px]',
                    game.id === 'daily'
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
          src="/screenshots/daily-prompt.png"
          alt="Daily Dive gameplay with prompt, countdown timer, answer field, Pass and Submit"
          caption="Live Daily Dive — question counter, 20-second timer, answer box, Pass, and Submit."
        />

        <section className="mt-4 max-w-3xl" aria-labelledby="what-daily-heading">
          <h3 id="what-daily-heading" className={`${displayFont.className} text-2xl font-bold text-white sm:text-3xl`}>
            What is the Daily Challenge?
          </h3>
          <div className={`${bodyFont.className} mt-4 space-y-4 text-base leading-relaxed text-slate-300`}>
            <p>
              The Daily Dive is KrillionPro’s main event: the same eight open prompts for every player on that UTC day.
              You are not hunting the only correct answer — you are hunting an answer other people are less likely to
              type.
            </p>
            <p>
              Say a crowd favorite and you float near the surface. Say something specific and still valid, and you drop
              through the zones toward the trench. Finish the dive, share your depth, and check today’s device
              leaderboard.
            </p>
            <p>
              Want endless practice after you surface?{' '}
              <Link href="/unlimited-krillion" className="font-semibold text-cyan-300 hover:underline">
                Unlimited Krillion
              </Link>{' '}
              stays separate on purpose — daily competition and unlimited entertainment are two different reasons to
              return.
            </p>
          </div>
        </section>

        <ArticleShot
          src="/screenshots/daily-reveal.png"
          alt="Daily Dive reveal showing Deep Cut rarity tier and plus 85 points after a valid answer"
          caption="After you submit — rarity tier, points earned, and depth update when a rare answer lands."
        />

        <section className="mt-12" aria-labelledby="how-daily-play-heading">
          <h3 id="how-daily-play-heading" className={`${displayFont.className} text-2xl font-bold text-white sm:text-3xl`}>
            How to play today’s Daily Dive
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
          src="/screenshots/daily-miss.png"
          alt="Daily Dive miss reveal with Nothing Landed, zero points, and Next Question"
          caption="Miss, pass, or time out for +0 — then Next Question and the dive keeps going."
        />

        <section className="mt-14" aria-labelledby="daily-tiers-heading">
          <h3 id="daily-tiers-heading" className={`${displayFont.className} text-2xl font-bold text-white sm:text-3xl`}>
            Scoring on the Daily Dive
          </h3>
          <p className={`${bodyFont.className} mt-4 max-w-3xl text-base leading-relaxed text-slate-300`}>
            Every point sinks you 10 metres. Wrong answers score zero for that prompt only — they do not erase earlier
            depth.
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
          src="/screenshots/daily-results.png"
          alt="Daily Dive results screen with total score, depth, rarest answer, and Share results"
          caption="Surface screen — total score, final depth, rarest hit, rundown, Share results, and Unlimited."
        />

        <section className="mt-14" aria-labelledby="daily-related-heading">
          <h3 id="daily-related-heading" className={`${displayFont.className} text-2xl font-bold text-white sm:text-3xl`}>
            Related games
          </h3>
          <p className={`${bodyFont.className} mt-3 max-w-3xl text-base leading-relaxed text-slate-300`}>
            Finished today’s dive? Keep the streak energy going in another mode.
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

        <section className="mt-14" aria-labelledby="daily-faq-heading">
          <h3 id="daily-faq-heading" className={`${displayFont.className} text-2xl font-bold text-white sm:text-3xl`}>
            Daily Challenge questions
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
