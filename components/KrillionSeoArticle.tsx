import Link from 'next/link';
import { bodyFont, displayFont, pixelFont } from '@/lib/fonts';

const PLAY_STEPS = [
  {
    title: 'Read the prompt',
    body: 'You get open prompts such as “Name something found in the ocean.” Bracket rules (when present) decide what counts.',
  },
  {
    title: 'Answer in time',
    body: 'Daily Dive: 8 prompts · 20 seconds each. Unlimited: 6 prompts · 20 seconds each. Type one answer and submit.',
  },
  {
    title: 'Sink through the tiers',
    body: 'A correct answer lands in a rarity tier. Common picks barely move you; obscure valid picks pull you deeper.',
  },
  {
    title: 'Surface and review',
    body: 'After the last prompt, see your catch: points, depth, and what landed on each question.',
  },
] as const;

const RULE_NOTES = [
  {
    title: 'Depth math',
    body: 'Every point sinks you 10 metres. A strong dive stacks rare hits into thousands of metres of depth.',
  },
  {
    title: 'No penalty pile-on',
    body: 'Wrong answers score zero for that prompt. They do not subtract earlier points — they only cost the clock.',
  },
  {
    title: 'Pass or time out',
    body: 'Running out of time (or skipping where available) scores zero for that prompt and moves you on.',
  },
  {
    title: 'Aliases welcome',
    body: 'Common spellings and short forms are accepted when they match the curated answer bank.',
  },
] as const;

const TIERS = [
  {
    name: 'Plankton',
    pts: '10',
    depth: '100 m',
    example: 'The crowd answer — fish for an ocean find, blue for a color.',
  },
  {
    name: 'Too Clever',
    pts: '15',
    depth: '150 m',
    example: 'A slight swerve many players still share.',
  },
  {
    name: 'Schooler',
    pts: '30',
    depth: '300 m',
    example: 'Respectable and specific, but not truly rare.',
  },
  {
    name: 'Rare',
    pts: '60',
    depth: '600 m',
    example: 'Genuinely uncommon — the “oh, good one” pick.',
  },
  {
    name: 'Deep Cut',
    pts: '85',
    depth: '850 m',
    example: 'Niche knowledge few divers reach on the first try.',
  },
  {
    name: 'One in a Krillion',
    pts: '100',
    depth: '1,000 m',
    example: 'Correct, and almost nobody else would type it first.',
  },
] as const;

const RARITY_NOTES = [
  {
    title: 'Curated banks first',
    body: 'On KrillionPro, each prompt ships with a curated answer list and tier. That keeps scoring fair before huge play volume exists.',
  },
  {
    title: 'Rarity is the point',
    body: 'Two answers can both be correct. The uncommon one is worth more points and more depth.',
  },
  {
    title: 'Results show the label',
    body: 'After each hit you see the accepted label, tier name, and points so you learn what “deep” looks like.',
  },
] as const;

const DEEP_TIPS = [
  {
    title: 'Pick the smallest valid example',
    body: 'Wide categories reward specific names. “Fish” floats; a precise species or deep-sea feature sinks further.',
  },
  {
    title: 'Think past the school answer',
    body: 'The clever dodge everyone also thought of is still Too Clever. Go one step further out.',
  },
  {
    title: 'Use the edge of the rule',
    body: 'Answers that still fit the prompt but sit at its edge are exactly what rarity scoring rewards.',
  },
  {
    title: 'Don’t only race the clock',
    body: 'Speed alone earns nothing. A few seconds of thinking often beats an instant plankton hit.',
  },
  {
    title: 'Spell it close',
    body: 'Type your best guess. Matching aliases cover many common variants.',
  },
  {
    title: 'Read the whole prompt',
    body: '“Hostile mob” is not “any mob.” Narrow wording is a hint, not decoration.',
  },
] as const;

const DEPTH_ZONES = [
  { depth: '0 m', title: 'Sunlit shallows', body: 'Early plankton hits — island light, coral, kelp vibes.' },
  { depth: '200 m', title: 'Twilight zone', body: 'Light fades as schooler and rare answers stack.' },
  { depth: '1,000 m', title: 'Midnight zone', body: 'Deep cuts start to matter; the easy answers are behind you.' },
  { depth: '3,800 m', title: 'The wreck', body: 'A strong mixed dive — rares and deep cuts together.' },
  { depth: '6,000 m+', title: 'Hadal / trench', body: 'Near-perfect rarity runs push toward the trench floor.' },
] as const;

const ARTICLE_FAQS = [
  {
    q: 'What is Krillion?',
    a: 'Krillion is a rare-answer trivia game. Prompts have many correct answers; uncommon correct answers score more. On KrillionPro your score also becomes ocean depth.',
  },
  {
    q: 'How do you play the Krillion game on KrillionPro?',
    a: 'Open Daily Dive for eight shared prompts (20 seconds each) or Unlimited for six practice prompts (20 seconds each). Type one answer per prompt. Correct answers land in rarity tiers from Plankton (10 pts) to One in a Krillion (100 pts).',
  },
  {
    q: 'What does “one in a krillion” mean?',
    a: 'It is the top tier: a correct answer almost nobody else would give first. It is worth 100 points — ten times a basic plankton hit.',
  },
  {
    q: 'Is KrillionPro free?',
    a: 'Yes. The core Daily Dive, Unlimited, and Minecraft Krillion experiences run in the browser with no download required to play.',
  },
  {
    q: 'Is there a Krillion app?',
    a: 'No installable app is required. KrillionPro runs in modern mobile and desktop browsers. You can bookmark or add the page to your home screen.',
  },
  {
    q: 'Can I play past daily dives?',
    a: 'Archive replay is on the roadmap. Today, play the current Daily Dive and use Unlimited or themed games like Minecraft Krillion for more rounds.',
  },
  {
    q: 'Is Minecraft Krillion the same as Krillion Minecraft?',
    a: 'Yes — both phrases describe Minecraft-themed rare-answer trivia. On KrillionPro that game lives at /minecraft-krillion-game.',
  },
  {
    q: 'Is KrillionPro affiliated with other Krillion sites?',
    a: 'KrillionPro is an independent project. Other sites may use similar gameplay ideas; we are not those sites and we build our own packs, UI, and rules here.',
  },
] as const;

const THEMED = [
  {
    title: 'Minecraft Krillion',
    href: '/minecraft-krillion-game',
    body: 'Mobs, biomes, blocks, enchantments, Nether finds, and structures — same rarity twist.',
  },
  {
    title: 'Daily Dive',
    href: '/daily-challenge',
    body: 'The shared ocean challenge of the day. Eight prompts. Compare depth with friends.',
  },
  {
    title: 'Unlimited',
    href: '/unlimited-krillion',
    body: 'Practice dives anytime. Six prompts, twenty seconds, no daily wait.',
  },
] as const;

export default function KrillionSeoArticle() {
  return (
    <article
      id="krillion-guide"
      aria-labelledby="krillion-seo-heading"
      className="scroll-mt-20 border-t border-[#67e8f9]/15 bg-[#030914] text-slate-200"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <header className="max-w-3xl">
          <p
            className={`${pixelFont.className} text-[8px] uppercase tracking-[0.16em] text-cyan-300 sm:text-[9px]`}
          >
            KrillionPro · Player Guide
          </p>
          <h2
            id="krillion-seo-heading"
            className={`${displayFont.className} mt-3 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl`}
          >
            Unlimited Krillion: Name What Nobody Else Names
          </h2>
          <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300 sm:text-lg`}>
            The free rare-answer trivia game where uncommon correct answers score more. The rarer
            your valid answer, the deeper you sink. Play the Daily Dive on KrillionPro in about four
            minutes — no download, no install.
          </p>
        </header>

        {/* What is */}
        <section className="mt-12" aria-labelledby="what-is-krillion-heading">
          <h3
            id="what-is-krillion-heading"
            className={`${displayFont.className} text-2xl font-bold text-white sm:text-3xl`}
          >
            What is Krillion?
          </h3>
          <div className={`${bodyFont.className} mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-slate-300`}>
            <p>
              Krillion turns a normal quiz upside down. It does not only ask whether you know{' '}
              <em>an</em> answer — it asks whether you know an answer other people are less likely
              to type. The best hits feel like one in a krillion: correct, and almost nobody else
              said it.
            </p>
            <p>
              Every prompt is open. “Name a bird,” “Name a river,” “Name something found in the
              ocean.” Hundreds of answers can be valid, but they are not worth the same. Say a crowd
              favorite and you float with everyone else. Say a precise, uncommon valid name and you
              drop through the sunlit shallows toward the trench.
            </p>
            <p>
              On <strong className="text-white">KrillionPro</strong>, the main ocean game is the{' '}
              <Link href="/daily-challenge" className="font-semibold text-cyan-300 hover:underline">
                Daily Dive
              </Link>{' '}
              (8 prompts · 20 seconds) plus{' '}
              <Link href="/unlimited-krillion" className="font-semibold text-cyan-300 hover:underline">
                Unlimited
              </Link>{' '}
              practice (6 · 20). Themed games such as{' '}
              <Link
                href="/minecraft-krillion-game"
                className="font-semibold text-cyan-300 hover:underline"
              >
                Minecraft Krillion
              </Link>{' '}
              use the same rarity idea in a different world.
            </p>
          </div>

          <aside className="mt-8 max-w-3xl rounded-2xl border border-cyan-400/25 bg-[#07122b]/80 p-5 sm:p-6">
            <p className={`${pixelFont.className} text-[8px] tracking-wider text-fuchsia-300`}>
              WHY “KRILLION”?
            </p>
            <p className={`${bodyFont.className} mt-3 text-sm leading-relaxed text-slate-300`}>
              Krill — the tiny creatures drifting through every ocean — plus a zillion. Your score
              becomes a depth: common answers float near the surface; rare ones sink you toward the
              trench floor.
            </p>
          </aside>
        </section>

        {/* How to play */}
        <section className="mt-14" aria-labelledby="how-to-play-krillion-heading">
          <h3
            id="how-to-play-krillion-heading"
            className={`${displayFont.className} text-2xl font-bold text-white sm:text-3xl`}
          >
            How to play the Krillion game
          </h3>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2">
            {PLAY_STEPS.map((step, i) => (
              <li key={step.title} className="rounded-2xl border border-white/10 bg-[#07122b]/70 p-5">
                <p className={`${pixelFont.className} text-[8px] text-cyan-300`}>STEP {i + 1}</p>
                <h4 className={`${displayFont.className} mt-2 text-xl font-bold text-white`}>
                  {step.title}
                </h4>
                <p className={`${bodyFont.className} mt-2 text-sm leading-relaxed text-slate-300`}>
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {RULE_NOTES.map((n) => (
              <li
                key={n.title}
                className="rounded-xl border border-[#67e8f9]/20 bg-[#07122b]/60 px-4 py-3"
              >
                <p className={`${displayFont.className} text-sm font-bold text-cyan-200`}>{n.title}</p>
                <p className={`${bodyFont.className} mt-1.5 text-xs leading-relaxed text-slate-400`}>
                  {n.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Tiers */}
        <section className="mt-14" aria-labelledby="tiers-heading">
          <h3
            id="tiers-heading"
            className={`${displayFont.className} text-2xl font-bold text-white sm:text-3xl`}
          >
            The six Krillion tiers
          </h3>
          <p className={`${bodyFont.className} mt-4 max-w-3xl text-base leading-relaxed text-slate-300`}>
            From the answer the whole ocean says to the one almost nobody reaches. Each point is 10
            metres of depth on KrillionPro.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TIERS.map((t) => (
              <li
                key={t.name}
                className="rounded-2xl border border-white/10 bg-[#07122b]/75 p-4"
              >
                <p className={`${displayFont.className} text-lg font-bold text-white`}>{t.name}</p>
                <p className={`${bodyFont.className} mt-1 text-sm text-cyan-300`}>
                  {t.pts} pts · sink {t.depth}
                </p>
                <p className={`${bodyFont.className} mt-2 text-xs leading-relaxed text-slate-400`}>
                  {t.example}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* How rarity works */}
        <section className="mt-14" aria-labelledby="rarity-heading">
          <h3
            id="rarity-heading"
            className={`${displayFont.className} text-2xl font-bold text-white sm:text-3xl`}
          >
            How KrillionPro decides what is rare
          </h3>
          <p className={`${bodyFont.className} mt-4 max-w-3xl text-base leading-relaxed text-slate-300`}>
            Rarity is the scoring twist. Being correct gets you on the board; being uncommon moves
            the depth meter. Here is how we handle that today:
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {RARITY_NOTES.map((n) => (
              <li key={n.title} className="rounded-2xl border border-cyan-400/20 bg-[#07122b]/70 p-5">
                <h4 className={`${displayFont.className} text-base font-bold text-cyan-200`}>
                  {n.title}
                </h4>
                <p className={`${bodyFont.className} mt-2 text-sm leading-relaxed text-slate-300`}>
                  {n.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Tips */}
        <section className="mt-14" aria-labelledby="deep-tips-heading">
          <h3
            id="deep-tips-heading"
            className={`${displayFont.className} text-2xl font-bold text-white sm:text-3xl`}
          >
            How to find a one-in-a-krillion answer
          </h3>
          <p className={`${bodyFont.className} mt-4 max-w-3xl text-base leading-relaxed text-slate-300`}>
            Go specific, then go sideways. The first answer that comes to mind came to everyone&apos;s
            mind. The second clever swerve came to a whole school. The points live one step further
            out.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DEEP_TIPS.map((tip) => (
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
          <p className={`${bodyFont.className} mt-6 text-sm text-slate-400`}>
            Full top-tier guide:{' '}
            <Link href="/one-in-a-krillion" className="font-semibold text-cyan-300 hover:underline">
              One in a Krillion
            </Link>
            .
          </p>
        </section>

        {/* Ocean map */}
        <section className="mt-14" aria-labelledby="ocean-heading">
          <h3
            id="ocean-heading"
            className={`${displayFont.className} text-2xl font-bold text-white sm:text-3xl`}
          >
            The ocean you sink through
          </h3>
          <p className={`${bodyFont.className} mt-4 max-w-3xl text-base leading-relaxed text-slate-300`}>
            Every KrillionPro dive starts at the waterline. Your depth on that map is your score —
            a story of how rare your answers were, not how fast you typed.
          </p>
          <ol className="mt-6 space-y-3">
            {DEPTH_ZONES.map((z) => (
              <li
                key={z.depth}
                className="flex flex-col gap-1 rounded-xl border border-white/10 bg-[#07122b]/65 px-4 py-3 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <span className={`${pixelFont.className} shrink-0 text-[8px] text-cyan-300`}>
                  {z.depth}
                </span>
                <div>
                  <p className={`${displayFont.className} font-bold text-white`}>{z.title}</p>
                  <p className={`${bodyFont.className} text-sm text-slate-400`}>{z.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Themed */}
        <section className="mt-14" aria-labelledby="modes-heading">
          <h3
            id="modes-heading"
            className={`${displayFont.className} text-2xl font-bold text-white sm:text-3xl`}
          >
            Play more on KrillionPro
          </h3>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {THEMED.map((m) => (
              <li key={m.href}>
                <Link
                  href={m.href}
                  className="block h-full rounded-2xl border border-[#67e8f9]/25 bg-[#07122b]/80 p-5 transition-colors hover:border-cyan-300/50 hover:bg-[#0a1a3a]"
                >
                  <p className={`${displayFont.className} text-lg font-bold text-white`}>{m.title}</p>
                  <p className={`${bodyFont.className} mt-2 text-sm leading-relaxed text-slate-300`}>
                    {m.body}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Article FAQ — substantial Q&A for AdSense/content quality */}
        <section className="mt-14" aria-labelledby="guide-faq-heading">
          <h3
            id="guide-faq-heading"
            className={`${displayFont.className} text-2xl font-bold text-white sm:text-3xl`}
          >
            Krillion questions
          </h3>
          <div className="mt-6 space-y-3">
            {ARTICLE_FAQS.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-white/10 bg-[#07122b]/70 px-5 py-4 open:border-cyan-400/30"
              >
                <summary
                  className={`${bodyFont.className} cursor-pointer list-none text-base font-semibold text-white`}
                >
                  {item.q}
                </summary>
                <p className={`${bodyFont.className} mt-3 text-sm leading-relaxed text-slate-300`}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        <p className={`${bodyFont.className} mt-12 max-w-3xl text-xs leading-relaxed text-slate-500`}>
          KrillionPro is an independent browser games site. Themed experiences that reference other
          franchises (such as Minecraft) are fan-made trivia and are not affiliated with or endorsed
          by those trademark owners.           See{' '}
          <Link href="/about" className="text-cyan-400 hover:underline">
            About
          </Link>
          ,{' '}
          <Link href="/privacy" className="text-cyan-400 hover:underline">
            Privacy Policy
          </Link>
          ,{' '}
          <Link href="/terms" className="text-cyan-400 hover:underline">
            Terms of Use
          </Link>
          , and{' '}
          <Link href="/contact" className="text-cyan-400 hover:underline">
            Contact
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
