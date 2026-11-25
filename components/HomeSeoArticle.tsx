import Link from 'next/link';
import ArticleShot from '@/components/seo/ArticleShot';
import { bodyFont, displayFont, pixelFont } from '@/lib/fonts';
import { RELATED_GAMES } from '@/lib/game-pages';
import { cn } from '@/lib/utils';

const PLAY_STEPS = [
  {
    n: '1',
    title: 'Begin the dive',
    body: 'Hit Today’s Dive (or open Daily Challenge). You get 8 open prompts — things like “Name a bird” or “Name something found in the ocean.”',
  },
  {
    n: '2',
    title: 'Type one answer',
    body: 'Twenty seconds each. Type it, hit Submit (Enter works too), or Pass if you’re stuck — zero points, no drama.',
  },
  {
    n: '3',
    title: 'See the reveal',
    body: 'A correct answer lands in a rarity tier. Common picks barely nudge you. Unusual valid picks pull you deeper.',
  },
  {
    n: '4',
    title: 'Finish the dive',
    body: 'After the eighth prompt you see depth, points, what landed, and your rarest hit of the dive.',
  },
] as const;

const RULE_CARDS = [
  {
    title: 'Perfect-dive math',
    body: 'Every point sinks you 10 m. Stack rare hits and you can drop thousands of metres in a single daily run.',
  },
  {
    title: 'No penalty pile-on',
    body: 'A wrong answer scores zero for that prompt. It does not erase earlier points — it only costs the seconds you spent.',
  },
  {
    title: 'Aliases welcome',
    body: 'Common spellings and short forms are accepted when they match the answer bank. Type your best guess.',
  },
  {
    title: 'Pass or time out',
    body: 'Pass skips for +0. Running out of time does the same. Either way, the dive continues.',
  },
] as const;

const FEATURES = [
  'Open prompts with curated answer banks and rarity tiers',
  'Daily Dive: 8 shared prompts · 20 seconds each',
  'Unlimited practice packs anytime',
  'Themed games (Minecraft, Pokémon, NBA, and more)',
  'Depth HUD and ocean zones as you sink',
  'Sound and music toggles — mute stops audio only',
] as const;

const TIERS = [
  { name: 'Plankton', pts: 10, depth: '100 m', example: 'The crowd answer — fish for an ocean find, blue for a color.' },
  { name: 'Too Clever', pts: 15, depth: '150 m', example: 'A clever dodge a whole school still picked, like flamingo for a bird.' },
  { name: 'Schooler', pts: 30, depth: '300 m', example: 'Respectable and specific, but still shared water.' },
  { name: 'Rare', pts: 60, depth: '600 m', example: 'Genuinely uncommon — the “oh, good one” pick.' },
  { name: 'Deep Cut', pts: 85, depth: '850 m', example: 'Real obscurity few players reach on the first try.' },
  { name: 'One in a Krillion', pts: 100, depth: '1,000 m', example: 'Correct, and almost nobody else would type it first.' },
] as const;

const TIPS = [
  {
    title: 'Pick the smallest valid example',
    body: 'For a country in Africa, Egypt floats; São Tomé and Príncipe sinks. Specificity is depth.',
  },
  {
    title: 'Think in another country',
    body: 'A river most people never learned at school, a cheese from one valley, a sport that is huge somewhere else.',
  },
  {
    title: 'Skip the crowd, then the clever dodge',
    body: 'The first thought is Plankton. The second clever swerve is often Too Clever. Go one step further out.',
  },
  {
    title: 'Don’t only race the clock',
    body: 'Speed earns nothing by itself. Twenty seconds of thinking beats a three-second plankton hit.',
  },
  {
    title: 'Spell it close enough',
    body: 'Unsure of the spelling? Type your best guess — matching aliases cover a lot of ground.',
  },
  {
    title: 'Read the whole prompt',
    body: 'Narrow wording is a hint, not decoration. “Hostile mob” is not the same as “any mob.”',
  },
] as const;

const ZONES = [
  { depth: '0 m', title: 'Sunlit shallows', body: 'The island light, coral and kelp vibes — early plankton hits live here.' },
  { depth: '200 m', title: 'Twilight zone', body: 'The light fades. Schooler and rare answers start to stack.' },
  { depth: '1,000 m', title: 'Midnight zone', body: 'Deep cuts matter now. The easy answers are behind you.' },
  { depth: '3,800 m', title: 'The wreck', body: 'A strong mixed dive — rares and deep cuts together.' },
  { depth: '6,000 m+', title: 'Hadal / trench', body: 'Near-perfect rarity runs push toward the trench floor.' },
] as const;

const SIMILAR = [
  { href: '/daily-challenge', title: 'Daily Dive', body: 'One shared dive a day. Same eight prompts for everyone.' },
  { href: '/unlimited-krillion', title: 'Unlimited Krillion', body: 'Fresh practice sets anytime — no daily wait.' },
  { href: '/puffer-party-krillion', title: 'Puffer Party', body: 'Don’t Fall hex party survival — action, not typed trivia.' },
  { href: '/cosmillion', title: 'Cosmillion', body: 'Space multi-fit trivia with rare-answer scoring.' },
  { href: '/reverse-krillion', title: 'Reverse / Noillirk', body: 'Opposite of Krillion — common correct answers win.' },
  { href: '/minecraft-krillion-game', title: 'Minecraft Krillion', body: 'Fan-made rare-answer Minecraft trivia. Same rarity twist.' },
  { href: '/games-like-krillion', title: 'Games like Krillion', body: 'More daily habits and similar free browser games.' },
  { href: '/games', title: 'Games hub', body: 'Browse every Krillion mode and pack in one place.' },
] as const;

const FAQS = [
  {
    q: 'What is Krillion?',
    a: 'Krillion is rare-answer trivia: many answers can be valid, and uncommon correct ones score more. On KrillionPro that score becomes ocean depth — Daily Dive, Unlimited, or themed packs in the browser.',
  },
  {
    q: 'What is a Krillion game?',
    a: 'A Krillion game is rare-answer trivia with open prompts. Correct uncommon answers score more. Play Daily Krillion, Unlimited, or themed packs free on KrillionPro.',
  },
  {
    q: 'Can I play Krillion online?',
    a: 'Yes. Play free in your browser on KrillionPro — start from the homepage Hero or open Daily Challenge / Unlimited. No download.',
  },
  {
    q: 'Is the Krillion game free?',
    a: 'Yes. Daily Dive, Unlimited, themed packs, and party modes run in the browser with no purchase required to play.',
  },
  {
    q: 'How do you play / control Krillion?',
    a: 'Type one answer per prompt, then Submit (or Enter). Use Pass to skip. Mute toggles sound and music only — they do not pause the dive.',
  },
  {
    q: 'Can I play Krillion on mobile?',
    a: 'Yes in a mobile or tablet browser. Use the on-screen keyboard to type. No separate app is required — bookmark or add to home screen.',
  },
  {
    q: 'Is Krillion multiplayer?',
    a: 'Daily Dive is a shared daily set — everyone gets the same prompts. Live rooms and 1v1 are not shipping yet. Puffer Party and Cosmillion are separate party-style modes (Cosmillion uses bots for the crew today).',
  },
  {
    q: 'What does “one in a krillion” mean?',
    a: 'It is the top tier: a correct answer almost nobody else would give first. Worth 100 points — ten times a basic plankton hit.',
  },
  {
    q: 'Is there a Krillion app?',
    a: 'No installable app is required. KrillionPro works in modern mobile and desktop browsers.',
  },
  {
    q: 'Can I play past Krillion dives?',
    a: 'Yes. On the Daily Challenge page, the archive lets you practice earlier shared days. Practice runs do not replace today’s board.',
  },
  {
    q: 'What happens if my answer is not accepted?',
    a: 'That prompt scores zero and you move on. Earlier points stay. Try a closer spelling next time, or go more specific.',
  },
  {
    q: 'Is Krillion AI?',
    a: 'Judging uses curated answer lists and rarity tiers — not a chatbot inventing scores on the fly.',
  },
  {
    q: 'Is it spelled Krillion, Krilion or Kirllion?',
    a: 'Krillion. Close typos still show up in search; if you land here looking for those, you’re in the right ocean.',
  },
] as const;

export default function HomeSeoArticle() {
  return (
    <article
      id="krillion-guide"
      aria-labelledby="home-seo-heading"
      className="scroll-mt-20 border-t border-[#67e8f9]/15 bg-[#030914] text-slate-200"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        {/* 1 — Intro */}
        <header className="max-w-3xl">
          <p className={`${pixelFont.className} text-[8px] uppercase tracking-[0.16em] text-cyan-300 sm:text-[9px]`}>
            Krillion game guide · Play online
          </p>
          <h2
            id="home-seo-heading"
            className={`${displayFont.className} mt-3 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl`}
          >
            Play Krillion online — rare-answer trivia
          </h2>
          <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300 sm:text-lg`}>
            Krillion is rare-answer trivia — not a single-correct quiz. Type one valid answer per prompt; the less
            common your correct pick, the more you score. The best hits feel like one in a krillion: right, and almost
            nobody else said it.
          </p>
        </header>

        {/* 2 — Play online (player is above the fold; article points back up) */}
        <section className="mt-10 max-w-3xl" aria-labelledby="play-online-heading">
          <h3 id="play-online-heading" className={`${displayFont.className} text-2xl font-bold text-white sm:text-3xl`}>
            Play Krillion online
          </h3>
          <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
            The game player sits above this guide. Start from the Hero (“Today’s Dive”), or open{' '}
            <Link href="/daily-challenge" className="font-semibold text-cyan-300 hover:underline">
              Daily Challenge
            </Link>{' '}
            /{' '}
            <Link href="/unlimited-krillion" className="font-semibold text-cyan-300 hover:underline">
              Unlimited Krillion
            </Link>
            . Use the speaker and music icons to mute — mute stops audio only; the dive keeps going.
          </p>
          <p className="mt-5">
            <a
              href="#top"
              className={`${bodyFont.className} inline-flex min-h-11 items-center justify-center rounded-full border-2 border-cyan-200/70 bg-cyan-600 px-6 py-2.5 text-sm font-bold text-white`}
            >
              Play Krillion Online
            </a>
          </p>
        </section>

        <ArticleShot
          src="/screenshots/daily-prompt.png"
          alt="Daily Dive gameplay with prompt, countdown timer, answer field, Pass and Submit"
          caption="In-game Daily Dive — open prompt, ticking timer, answer box, Pass, and Submit."
        />

        {/* 3 — What is Krillion? */}
        <section className="mt-12 max-w-3xl" aria-labelledby="what-heading">
          <h3 id="what-heading" className={`${displayFont.className} text-2xl font-bold text-white sm:text-3xl`}>
            What is Krillion?
          </h3>
          <div className={`${bodyFont.className} mt-4 space-y-4 text-base leading-relaxed text-slate-300`}>
            <p>
              Every prompt is open. “Name a bird.” “Name a river.” “Name a James Bond film.” Hundreds of answers can be
              valid, but they are not worth the same. Say “eagle” and you float with the crowd. Say something precise and
              uncommon — still valid — and you drop through the sunlit shallows toward the trench.
            </p>
            <p>
              A full Daily Dive on KrillionPro takes a few minutes, needs no account, and plays the same on a phone as on a
              laptop. Common answers barely leave the surface. Rare ones take you past the wreck and down into deep water.
            </p>
          </div>
          <aside className="mt-6 rounded-2xl border border-cyan-400/25 bg-[#07122b]/80 p-5 sm:p-6">
            <p className={`${pixelFont.className} text-[8px] tracking-wider text-fuchsia-300`}>WHY “KRILLION”?</p>
            <p className={`${bodyFont.className} mt-3 text-sm leading-relaxed text-slate-300`}>
              Krill — those tiny creatures drifting through every ocean — plus a zillion. Your score is a depth: common
              answers float, rare ones sink you toward the trench floor.
            </p>
          </aside>
        </section>

        <ArticleShot
          src="/screenshots/daily-reveal.png"
          alt="Daily Dive reveal showing Deep Cut rarity and plus 85 points after a rare valid answer"
          caption="Reveal after a hit — rarity tier, points, and depth when an unusual valid answer lands."
        />

        {/* 4 — How to play */}
        <section className="mt-12" aria-labelledby="how-to-play-heading">
          <h3 id="how-to-play-heading" className={`${displayFont.className} text-2xl font-bold text-white sm:text-3xl`}>
            How to play Krillion
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
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {RULE_CARDS.map((card) => (
              <li key={card.title} className="rounded-xl border border-[#67e8f9]/20 bg-[#07122b]/60 px-4 py-3">
                <p className={`${displayFont.className} text-sm font-bold text-cyan-200`}>{card.title}</p>
                <p className={`${bodyFont.className} mt-1.5 text-xs leading-relaxed text-slate-400`}>{card.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <ArticleShot
          src="/screenshots/daily-miss.png"
          alt="Daily Dive miss reveal with Nothing Landed, zero points, and Next Question"
          caption="Miss or time out for +0 — then Next Question. The dive continues either way."
        />

        {/* 5 — Features (+ existing tiers / rarity / ocean) */}
        <section className="mt-14" aria-labelledby="features-heading">
          <h3 id="features-heading" className={`${displayFont.className} text-2xl font-bold text-white sm:text-3xl`}>
            Krillion game features
          </h3>
          <ul className={`${bodyFont.className} mt-4 list-disc space-y-2 pl-5 text-base text-slate-300`}>
            {FEATURES.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </section>

        <section className="mt-14" aria-labelledby="tiers-heading">
          <h3 id="tiers-heading" className={`${displayFont.className} text-2xl font-bold text-white sm:text-3xl`}>
            The six Krillion tiers
          </h3>
          <p className={`${bodyFont.className} mt-4 max-w-3xl text-base leading-relaxed text-slate-300`}>
            From the answer the whole ocean says to the one almost nobody reaches. Each point is 10 metres of depth on
            KrillionPro.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TIERS.map((t) => (
              <li key={t.name} className="rounded-2xl border border-white/10 bg-[#07122b]/75 p-4">
                <p className={`${displayFont.className} text-lg font-bold text-white`}>{t.name}</p>
                <p className={`${bodyFont.className} mt-1 text-sm text-cyan-300`}>
                  {t.pts} pts · sink {t.depth}
                </p>
                <p className={`${bodyFont.className} mt-2 text-xs leading-relaxed text-slate-400`}>{t.example}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14" aria-labelledby="rarity-heading">
          <h3 id="rarity-heading" className={`${displayFont.className} text-2xl font-bold text-white sm:text-3xl`}>
            How KrillionPro decides what is rare
          </h3>
          <div className={`${bodyFont.className} mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-slate-300`}>
            <p>
              Rarity is the whole point of the game. Being correct gets you on the board. Being uncommon moves the depth
              meter.
            </p>
            <p>
              On KrillionPro, each prompt ships with a curated answer bank and tier labels. That keeps scoring fair and
              readable: after a hit you see the accepted label, the tier name, and the points — so you learn what “deep”
              looks like without a spoiler dump of today’s answers.
            </p>
            <p>
              Two answers can both be valid. The uncommon one is worth more. That is the Krillion twist — measured by
              how obscure the pick is in the bank, not by how fast you typed.
            </p>
          </div>
        </section>

        <ArticleShot
          src="/screenshots/daily-results.png"
          alt="Daily Dive results with total score, final depth, rarest answer, Share results and Play Unlimited"
          caption="End-of-dive results — score, depth, rarest catch, Share results, then Unlimited if you want more."
        />

        {/* 6 — Controls (new) */}
        <section className="mt-14 max-w-3xl" aria-labelledby="controls-heading">
          <h3 id="controls-heading" className={`${displayFont.className} text-2xl font-bold text-white sm:text-3xl`}>
            Krillion controls
          </h3>
          <ul className={`${bodyFont.className} mt-4 list-disc space-y-2 pl-5 text-base text-slate-300`}>
            <li>
              <strong className="text-white">Keyboard:</strong> type in the answer field, Enter to submit, Tab to reach
              Pass / Submit.
            </li>
            <li>
              <strong className="text-white">Mouse:</strong> click Begin Descent, Pass, Submit, Continue, and the mute
              icons.
            </li>
            <li>
              <strong className="text-white">Mobile:</strong> tap and type with the on-screen keyboard — same Pass /
              Submit flow. No WASD or gamepad required.
            </li>
          </ul>
        </section>

        {/* 7 — Tips */}
        <section className="mt-14" aria-labelledby="strategy-heading">
          <h3 id="strategy-heading" className={`${displayFont.className} text-2xl font-bold text-white sm:text-3xl`}>
            Tips and tricks to win Krillion
          </h3>
          <p className={`${bodyFont.className} mt-4 max-w-3xl text-base leading-relaxed text-slate-300`}>
            Go specific, then go sideways. The first answer that comes to mind came to everyone’s mind. The second clever
            swerve came to a whole school. The points live one step further out.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TIPS.map((tip) => (
              <li key={tip.title} className="rounded-2xl border border-white/10 bg-[#07122b]/70 p-5">
                <h4 className={`${displayFont.className} text-base font-bold text-fuchsia-200`}>{tip.title}</h4>
                <p className={`${bodyFont.className} mt-2 text-sm leading-relaxed text-slate-300`}>{tip.body}</p>
              </li>
            ))}
          </ul>
          <p className={`${bodyFont.className} mt-6 text-sm text-slate-400`}>
            Full top-tier guide:{' '}
            <Link href="/one-in-a-krillion" className="font-semibold text-cyan-300 hover:underline">
              One in a Krillion
            </Link>
            . Stuck mid-tier? Read the{' '}
            <Link href="/guides/too-clever" className="font-semibold text-cyan-300 hover:underline">
              Too Clever scoring guide
            </Link>
            . Looking for today’s answers? We don’t publish spoilers — only{' '}
            <Link href="/guides/answers-today" className="font-semibold text-cyan-300 hover:underline">
              fair-play hints
            </Link>
            .
          </p>
        </section>

        {/* keep ocean map — existing strength */}
        <section className="mt-14" aria-labelledby="ocean-heading">
          <h3 id="ocean-heading" className={`${displayFont.className} text-2xl font-bold text-white sm:text-3xl`}>
            The ocean you sink through
          </h3>
          <p className={`${bodyFont.className} mt-4 max-w-3xl text-base leading-relaxed text-slate-300`}>
            Every KrillionPro dive starts near the waterline. Your depth on that map is your score — a story of how rare
            your answers were, not how fast you mashed Submit.
          </p>
          <ol className="mt-6 space-y-3">
            {ZONES.map((z) => (
              <li
                key={z.depth}
                className="flex flex-col gap-1 rounded-xl border border-white/10 bg-[#07122b]/65 px-4 py-3 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <span className={`${pixelFont.className} shrink-0 text-[8px] text-cyan-300`}>{z.depth}</span>
                <div>
                  <p className={`${displayFont.className} font-bold text-white`}>{z.title}</p>
                  <p className={`${bodyFont.className} text-sm text-slate-400`}>{z.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* 8 — Mobile (new) */}
        <section className="mt-14 max-w-3xl" aria-labelledby="mobile-heading">
          <h3 id="mobile-heading" className={`${displayFont.className} text-2xl font-bold text-white sm:text-3xl`}>
            Is Krillion available on mobile?
          </h3>
          <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
            Yes — play Krillion free in a smartphone or tablet browser. Nothing to download or install. Bookmark the site
            or add it to your home screen for quick access. A modern mobile browser works best.
          </p>
        </section>

        {/* 9 — Similar / related */}
        <section className="mt-14" aria-labelledby="related-games-heading">
          <h3 id="related-games-heading" className={`${displayFont.className} text-2xl font-bold text-white sm:text-3xl`}>
            Games similar to Krillion
          </h3>
          <p className={`${bodyFont.className} mt-3 max-w-3xl text-base leading-relaxed text-slate-300`}>
            Same KrillionPro ocean — different modes. Party games and reverse scoring sit next to classic rare-answer
            dives.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {SIMILAR.map((m) => (
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
          <ul className="mt-5 flex flex-wrap gap-2">
            {RELATED_GAMES.map((game) => (
              <li key={`related-footer-${game.id}`}>
                <Link
                  href={game.href}
                  className={cn(
                    pixelFont.className,
                    'inline-flex items-center rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-[8px] tracking-wide text-slate-300 transition-colors hover:border-cyan-400/50 hover:text-white sm:text-[9px]'
                  )}
                >
                  {game.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 10 — FAQ */}
        <section className="mt-14" aria-labelledby="home-faq-heading">
          <h3 id="home-faq-heading" className={`${displayFont.className} text-2xl font-bold text-white sm:text-3xl`}>
            Frequently asked questions
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
          KrillionPro is an independent browser games site. Themed experiences that reference other franchises (such as
          Minecraft) are fan-made trivia and are not affiliated with or endorsed by those trademark owners. See{' '}
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
