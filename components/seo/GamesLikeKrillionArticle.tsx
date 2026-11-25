import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { bodyFont, displayFont, pixelFont } from '@/lib/fonts';

const FAQS = [
  {
    q: 'What are the best games like Krillion?',
    a: 'Strong picks keep sessions short and answers open. On KrillionPro, that is Daily Dive and Unlimited. Nearby habits worth trying: Give or Take, Triviyeah, Wordle, Semantle, Globle, Worldle, and Warmer.',
  },
  {
    q: 'Are there Krillion alternatives with no daily limit?',
    a: 'Unlimited Krillion on KrillionPro refreshes prompts every dive with no once-a-day lock. Use Daily Dive when you want the shared set; Unlimited when you want another round.',
  },
  {
    q: 'What is the opposite of Krillion?',
    a: 'Noillirk (Reverse Krillion) on KrillionPro. Common correct answers score most — think like everybody instead of hunting deep cuts.',
  },
  {
    q: 'Is there a game like Krillion that I can play with friends?',
    a: 'Share Daily Dive results — everyone gets the same prompts. For a live lobby, Toyo Blitz works as a party trivia room. Native KrillionPro multiplayer is still planned.',
  },
  {
    q: 'Are there games like Krillion about one subject?',
    a: 'Minecraft Krillion keeps rarity scoring inside Minecraft-themed prompts. More single-topic packs can use the same format later.',
  },
  {
    q: 'What are some daily games like Krillion?',
    a: 'Daily Dive is our shared set. Elsewhere: Give or Take and Triviyeah for trivia, Wordle and Semantle for words, Globle, Worldle, and Warmer for maps.',
  },
  {
    q: 'Are there trivia games like Krillion?',
    a: 'Daily Dive and Unlimited are rarity trivia. Give or Take and Triviyeah cover a more classic daily quiz feel.',
  },
  {
    q: 'Are there word games like Krillion?',
    a: 'Wordle locks one five-letter answer; Semantle steers you with meaning distance. Both fit a short daily slot beside a Krillion dive.',
  },
  {
    q: 'What are good games like Krillion and Wordle?',
    a: 'Pair Daily Dive for open rarity with Wordle or Semantle for the word habit. Add Globle or Warmer if you prefer a map clue.',
  },
  {
    q: 'What are some games like One in a Krillion?',
    a: 'One in a Krillion is KrillionPro’s top rarity tier. The same family is Daily Dive, Unlimited, and Minecraft Krillion.',
  },
  {
    q: 'Are there more games like Krillion, or fun games like Krillion for a quick break?',
    a: 'A Daily Dive or Unlimited run is a few minutes. For a change of pace, open Give or Take, Wordle, or Globle — all free in the browser.',
  },
  {
    q: 'What counts as a Krillion style game?',
    a: 'Open prompts, more than one valid answer, and a score that favors uncommon correct picks. A timer and a shared daily set are common extras.',
  },
  {
    q: 'Are these games like Krillion free?',
    a: 'Everything linked here plays free in a modern browser. Daily Dive, Unlimited, and Minecraft Krillion do not require payment to start.',
  },
  {
    q: 'Do I need an account to play these Krillion alternatives?',
    a: 'No. KrillionPro and the external games listed open without signup.',
  },
  {
    q: 'What is KrillionPro?',
    a: 'KrillionPro is an independent rare-answer trivia site in the browser. It is not tied to other products that use the Krillion name.',
  },
] as const;

export const GAMES_LIKE_KRILLION_FAQS = FAQS;

type GameRow = {
  name: string;
  href: string;
  blurb: string;
  thumb: string;
  external?: boolean;
};

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className={`${pixelFont.className} text-[8px] uppercase tracking-[0.18em] text-cyan-300 sm:text-[9px]`}>
      {children}
    </p>
  );
}

function GameList({ games }: { games: GameRow[] }) {
  return (
    <ul className="mt-8 space-y-4">
      {games.map((game) => {
        const inner = (
          <>
            <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/40 sm:h-24 sm:w-24">
              <Image
                src={game.thumb}
                alt={`${game.name} thumbnail`}
                fill
                sizes="96px"
                className="object-cover"
              />
            </span>
            <span className="min-w-0 flex-1">
              <span className={`${displayFont.className} block text-lg font-bold text-white sm:text-xl`}>
                {game.name}
                {game.external ? (
                  <span className={`${bodyFont.className} ml-2 text-sm font-normal text-slate-500`}>↗</span>
                ) : null}
              </span>
              <span className={`${bodyFont.className} mt-1 block text-sm leading-relaxed text-slate-300`}>
                {game.blurb}
              </span>
            </span>
          </>
        );

        const className =
          'flex items-start gap-4 rounded-2xl border border-white/10 bg-[#07122b]/70 p-4 transition-colors hover:border-cyan-400/40 sm:p-5';

        return (
          <li key={game.href}>
            {game.external ? (
              <a href={game.href} target="_blank" rel="noopener noreferrer" className={className}>
                {inner}
              </a>
            ) : (
              <Link href={game.href} className={className}>
                {inner}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

const RARE_ANSWER_GAMES: GameRow[] = [
  {
    name: 'Daily Dive',
    href: '/daily-challenge',
    blurb:
      'Eight prompts. Twenty seconds. Depth climbs when your correct answer is uncommon — the daily rarity set on KrillionPro.',
    thumb: '/games-like/daily-dive.png',
  },
  {
    name: 'Unlimited Krillion',
    href: '/unlimited-krillion',
    blurb:
      'Practice lane with a new prompt set every run. Same rare-answer scoring, zero wait for tomorrow’s board.',
    thumb: '/games-like/daily-trivia.jpg',
  },
  {
    name: 'Minecraft Krillion',
    href: '/minecraft-krillion-game',
    blurb:
      'Rarity scoring inside Minecraft-flavoured questions — one theme, same “think uncommon” pressure.',
    thumb: '/screenshots/minecraft-prompt.png',
  },
];

const DAILY_TRIVIA: GameRow[] = [
  {
    name: 'Give or Take',
    href: 'https://give-or-take.com/',
    blurb: 'Five estimation questions a day. You set a range, not a rare name — still a sharp daily brain reset.',
    thumb: '/games-like/game-give-or-take.jpg',
    external: true,
  },
  {
    name: 'Triviyeah',
    href: 'https://www.triviyeah.com/',
    blurb: 'Mixed-category daily trivia when you want a classic quiz beat instead of rarity tiers.',
    thumb: '/games-like/game-triviyeah.jpg',
    external: true,
  },
];

const WORD_GAMES: GameRow[] = [
  {
    name: 'Wordle',
    href: 'https://www.nytimes.com/games/wordle/index.html',
    blurb: 'One five-letter target each day. Different win condition, similar “I’ll just play one” length.',
    thumb: '/games-like/game-wordle.jpg',
    external: true,
  },
  {
    name: 'Semantle',
    href: 'https://semantle.com/',
    blurb: 'Chase a hidden word by how close your guesses sit in meaning space — open typing, gradual feedback.',
    thumb: '/games-like/game-semantle.jpg',
    external: true,
  },
];

const GEO_GAMES: GameRow[] = [
  {
    name: 'Globle',
    href: 'https://globle-game.com/',
    blurb: 'Name the country. Temperature-style feedback replaces rarity, but the daily loop stays familiar.',
    thumb: '/games-like/game-globle.jpg',
    external: true,
  },
  {
    name: 'Worldle',
    href: 'https://worldle.teuteuf.fr/',
    blurb: 'Country outline on screen — place it, then refine from distance and direction hints.',
    thumb: '/games-like/game-worldle.jpg',
    external: true,
  },
  {
    name: 'Warmer',
    href: 'https://warmergames.com/',
    blurb: 'Hot-or-cold geography on a globe. Fast rounds that friends can compare after lunch.',
    thumb: '/games-like/game-warmer.jpg',
    external: true,
  },
];

const TOGETHER_GAMES: GameRow[] = [
  {
    name: 'Toyo Blitz',
    href: 'https://toyo.games/toyo-blitz',
    blurb: 'Live party trivia for small groups (roughly 2–20). Use it when everyone is online at once.',
    thumb: '/games-like/game-toyo-blitz.jpg',
    external: true,
  },
  {
    name: 'Daily Dive',
    href: '/daily-challenge',
    blurb: 'Async compare mode: same UTC set for all players, then trade depth scores in chat.',
    thumb: '/games-like/daily-dive.png',
  },
];

export default function GamesLikeKrillionArticle() {
  return (
    <article className="bg-[#040816] text-slate-200">
      <header className="border-b border-[#67e8f9]/15">
        <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <nav aria-label="Breadcrumb" className={`${bodyFont.className} text-sm text-slate-400`}>
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-cyan-300">
                  KrillionPro
                </Link>
              </li>
              <li aria-hidden="true" className="text-slate-600">
                /
              </li>
              <li className="text-cyan-200">Games like Krillion</li>
            </ol>
          </nav>

          <SectionEyebrow>Browse by vibe</SectionEyebrow>
          <h1
            className={`${displayFont.className} mt-3 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl`}
          >
            Looking for games like Krillion?
          </h1>
          <p className={`${bodyFont.className} mt-6 text-base leading-relaxed text-slate-300 sm:text-lg`}>
            Most people who search that phrase want a short browser challenge: type an answer, get scored,
            maybe brag a little. Rarity-based games add a twist — correct is good; uncommon-and-correct is
            better.
          </p>
          <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
            Below is a practical map of{' '}
            <strong className="text-white">Krillion-style options</strong> and nearby daily habits. We stick
            to games you can open now: KrillionPro modes first, then verified external titles. Nothing here
            needs an install or a login wall to start.
          </p>
          <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
            Choose by what hooked you. Chasing obscure-but-valid answers? Stay in the rarity section. Prefer
            the crowd favorite? Play{' '}
            <Link href="/noillirk" className="font-semibold text-cyan-300 hover:underline">
              Noillirk
            </Link>{' '}
            (Reverse Krillion). Prefer a fixed daily ritual? Jump to trivia, words, or maps.
          </p>
          <p className={`${bodyFont.className} mt-6 text-xs leading-relaxed text-slate-500`}>
            KrillionPro is independent. We are not affiliated with other brands using the Krillion name.
            Outside links are for discovery only.
          </p>
        </div>
      </header>

      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <section aria-labelledby="start-heading">
          <SectionEyebrow>Start here</SectionEyebrow>
          <h2 id="start-heading" className={`${displayFont.className} mt-2 text-2xl font-bold text-white sm:text-3xl`}>
            Play the rare-answer idea on KrillionPro
          </h2>
          <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
            New to the format?{' '}
            <Link href="/daily-challenge" className="font-semibold text-cyan-300 hover:underline">
              Daily Dive
            </Link>{' '}
            is the shared board: eight prompts, a tight clock, depth for uncommon hits. Already finished today
            and still hungry?{' '}
            <Link href="/unlimited-krillion" className="font-semibold text-cyan-300 hover:underline">
              Unlimited Krillion
            </Link>{' '}
            rolls another set immediately.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/daily-challenge"
              className={`${bodyFont.className} inline-flex min-h-12 items-center justify-center rounded-2xl border-2 border-[#e9d5ff] bg-gradient-to-r from-[#6d28d9] via-[#3730a3] to-[#0e7490] px-6 py-3 text-sm font-bold text-white shadow-[0_0_28px_rgba(192,132,252,0.35)] transition-transform hover:-translate-y-0.5`}
            >
              Play Daily Dive
            </Link>
            <Link
              href="/unlimited-krillion"
              className={`${bodyFont.className} inline-flex min-h-12 items-center justify-center rounded-2xl border border-cyan-300/50 bg-[#07122b]/85 px-6 py-3 text-sm font-semibold text-cyan-100 transition-colors hover:border-cyan-200 hover:text-white`}
            >
              Play Unlimited
            </Link>
          </div>
        </section>

        <section aria-labelledby="same-idea-heading" className="mt-16">
          <SectionEyebrow>Rarity first</SectionEyebrow>
          <h2
            id="same-idea-heading"
            className={`${displayFont.className} mt-2 text-2xl font-bold text-white sm:text-3xl`}
          >
            Rare-answer games on KrillionPro
          </h2>
          <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
            These modes keep the core pressure: many answers can be right, but the board pays more when fewer
            people typed yours. Theme and pace change; the scoring idea does not.
          </p>
          <GameList games={RARE_ANSWER_GAMES} />
          <p className={`${bodyFont.className} mt-6 text-base leading-relaxed text-slate-300`}>
            Want a single-subject flavour without leaving rarity? Open{' '}
            <Link href="/minecraft-krillion-game" className="font-semibold text-cyan-300 hover:underline">
              Minecraft Krillion
            </Link>
            , then browse the rest of the{' '}
            <Link href="/games" className="font-semibold text-cyan-300 hover:underline">
              games hub
            </Link>{' '}
            as more packs land.
          </p>
        </section>

        <section aria-labelledby="daily-trivia-heading" className="mt-16">
          <SectionEyebrow>Daily trivia</SectionEyebrow>
          <h2
            id="daily-trivia-heading"
            className={`${displayFont.className} mt-2 text-2xl font-bold text-white sm:text-3xl`}
          >
            Daily trivia when you want a different score
          </h2>
          <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
            Sometimes you still want a quiz, just not rarity tiers. These two keep a short daily cadence with
            their own rules.
          </p>
          <GameList games={DAILY_TRIVIA} />
        </section>

        <section aria-labelledby="word-heading" className="mt-16">
          <SectionEyebrow>Words</SectionEyebrow>
          <h2 id="word-heading" className={`${displayFont.className} mt-2 text-2xl font-bold text-white sm:text-3xl`}>
            Word puzzles that fill the same slot
          </h2>
          <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
            Letter grids and meaning chases scratch a different itch than open trivia, but they compete for
            the same five-minute window. Useful when you want a change after a dive.
          </p>
          <GameList games={WORD_GAMES} />
        </section>

        <section aria-labelledby="geo-heading" className="mt-16">
          <SectionEyebrow>Maps &amp; clues</SectionEyebrow>
          <h2 id="geo-heading" className={`${displayFont.className} mt-2 text-2xl font-bold text-white sm:text-3xl`}>
            Geography guessing after a Krillion dive
          </h2>
          <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
            These swap “name something rare” for “read the clue and place it.” Feedback is hotter/colder or
            outline-based, not crowd rarity — still bite-sized and easy to compare.
          </p>
          <GameList games={GEO_GAMES} />
        </section>

        <section aria-labelledby="everyday-heading" className="mt-16">
          <SectionEyebrow>Daily rhythm</SectionEyebrow>
          <h2
            id="everyday-heading"
            className={`${displayFont.className} mt-2 text-2xl font-bold text-white sm:text-3xl`}
          >
            Building a daily lineup
          </h2>
          <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
            A solid morning stack on KrillionPro is{' '}
            <Link href="/daily-challenge" className="font-semibold text-cyan-300 hover:underline">
              Daily Dive
            </Link>
            , then optional Wordle or Semantle, then a map game if you still have a minute. When the daily
            board is done and you want another rarity run, jump to{' '}
            <Link href="/unlimited-krillion" className="font-semibold text-cyan-300 hover:underline">
              Unlimited
            </Link>
            . All of the titles on this page stay free and browser-native.
          </p>
        </section>

        <section aria-labelledby="friends-heading" className="mt-16">
          <SectionEyebrow>Social</SectionEyebrow>
          <h2
            id="friends-heading"
            className={`${displayFont.className} mt-2 text-2xl font-bold text-white sm:text-3xl`}
          >
            Playing with friends
          </h2>
          <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
            You do not need a live room to make it social. Finish the same Daily Dive and compare depth later.
            When the group is online together, Toyo Blitz covers party trivia. Built-in KrillionPro lobbies are
            still ahead on the roadmap.
          </p>
          <GameList games={TOGETHER_GAMES} />
          <ul className={`${bodyFont.className} mt-6 space-y-3 text-sm text-slate-300`}>
            <li>
              <strong className="text-white">Daily Dive</strong> — shared prompts, async bragging rights.
            </li>
            <li>
              <strong className="text-white">Unlimited</strong> — practice any time; not limited to one board.
            </li>
            <li>
              <strong className="text-white">Toyo Blitz</strong> — live group trivia while you wait for native
              multiplayer.
            </li>
          </ul>
        </section>

        <section aria-labelledby="choosing-heading" className="mt-16">
          <SectionEyebrow>How to choose</SectionEyebrow>
          <h2
            id="choosing-heading"
            className={`${displayFont.className} mt-2 text-2xl font-bold text-white sm:text-3xl`}
          >
            Signals of a strong Krillion alternative
          </h2>
          <ul className={`${bodyFont.className} mt-6 space-y-5 text-base leading-relaxed text-slate-300`}>
            <li>
              <strong className="text-white">Room for more than one right answer</strong> — locked single
              solutions feel like a different genre.
            </li>
            <li>
              <strong className="text-white">Scores tied to real play patterns</strong> — rarity that moves with
              the crowd beats a fixed “cleverness” grade.
            </li>
            <li>
              <strong className="text-white">Finished in minutes</strong> — easy to repeat on a break without a
              long tutorial.
            </li>
          </ul>
          <p className={`${bodyFont.className} mt-6 text-base leading-relaxed text-slate-300`}>
            Everything listed here is free in the browser with no account required to begin. New to the format?
            Take one{' '}
            <Link href="/daily-challenge" className="font-semibold text-cyan-300 hover:underline">
              Daily Dive
            </Link>{' '}
            and you will feel the scoring in under ten minutes.
          </p>
        </section>

        <section aria-labelledby="faq-heading" className="mt-16">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h2 id="faq-heading" className={`${displayFont.className} mt-2 text-2xl font-bold text-white sm:text-3xl`}>
            Common questions
          </h2>
          <div className="mt-6 space-y-3">
            {FAQS.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-white/10 bg-[#07122b]/70 px-5 py-4 open:border-cyan-400/30"
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

        <section
          aria-labelledby="final-cta-heading"
          className="mt-16 border-t border-[#67e8f9]/15 pt-14 text-center"
        >
          <h2
            id="final-cta-heading"
            className={`${displayFont.className} text-2xl font-bold text-white sm:text-3xl`}
          >
            Jump into a dive
          </h2>
          <p className={`${bodyFont.className} mx-auto mt-3 max-w-xl text-base text-slate-300`}>
            Skip the clone hunt — play rarity scoring on KrillionPro and see how deep you get.
          </p>
          <Link
            href="/daily-challenge"
            className={`${bodyFont.className} mt-8 inline-flex min-h-12 items-center justify-center rounded-2xl border-2 border-[#e9d5ff] bg-gradient-to-r from-[#6d28d9] via-[#3730a3] to-[#0e7490] px-10 py-3.5 text-base font-bold text-white shadow-[0_0_32px_rgba(192,132,252,0.4)] transition-transform hover:-translate-y-0.5`}
          >
            Play Daily Dive
          </Link>
        </section>
      </div>
    </article>
  );
}
