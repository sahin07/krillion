import Link from 'next/link';
import ArticleShot from '@/components/seo/ArticleShot';
import { bodyFont, displayFont, pixelFont } from '@/lib/fonts';

const FAQS = [
  {
    q: 'What is Krillion Puffer Party?',
    a: 'Puffer Party Krillion on KrillionPro is a Don’t Fall party mode: jump across hex tiles, survive dropping floors, and outlast other puffers across three rounds.',
  },
  {
    q: 'Is Puffer Party multiplayer?',
    a: 'The party arena is built for a crowded field of puffers. The KrillionPro version runs a local party field with sixteen starters — Jump to stay alive when tiles drop.',
  },
  {
    q: 'Can you play Puffer Party with friends?',
    a: 'You can play the party mode anytime on KrillionPro. Pass-and-play or take turns on the same device while the arena drops tiles each round.',
  },
  {
    q: 'How does the Puffer Party timer work?',
    a: 'Each round has a one-minute clock. Tiles flash danger and fall; if you are still standing on a falling tile, you are out. Survive to the next round.',
  },
  {
    q: 'Is Puffer Party different from Daily Dive?',
    a: 'Yes. Daily Dive is rare-answer trivia with depth scoring. Puffer Party is an action party survival mode — Jump, Don’t Fall, players left — not typed answers.',
  },
] as const;

export const PUFFER_PARTY_FAQ_ITEMS = FAQS;

export default function PufferPartySeoArticle() {
  return (
    <article
      aria-labelledby="puffer-party-seo-heading"
      className="border-t border-sky-400/20 bg-[#031018] text-slate-200"
    >
      <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <p
          className={`${pixelFont.className} text-[8px] uppercase tracking-[0.18em] text-sky-300 sm:text-[9px]`}
        >
          Krillion game guide · Party mode
        </p>
        <h2
          id="puffer-party-seo-heading"
          className={`${displayFont.className} mt-3 text-3xl font-bold text-white sm:text-4xl`}
        >
          Krillion Puffer Party: How Does It Work?
        </h2>
        <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
          Discover KrillionPro’s Puffer Party mode — a bright hex-arena survival party where you Jump,
          dodge falling tiles, and try not to splash. Different from Daily Dive trivia: here the skill
          is staying on the board.
        </p>
        <p className="mt-4">
          <Link
            href="/games"
            className={`${bodyFont.className} inline-flex min-h-11 items-center justify-center rounded-full border-2 border-sky-200/70 bg-sky-500 px-6 py-2.5 text-sm font-bold text-white`}
          >
            Explore KrillionPro Games
          </Link>
        </p>

        <section className="mt-12" aria-labelledby="intro-heading">
          <h3 id="intro-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Introduction
          </h3>
          <p className={`${bodyFont.className} mt-3 text-base leading-relaxed text-slate-300`}>
            Puffer Party Krillion is KrillionPro’s party-survival game. You control a puffer on a
            colorful hex platform over open water. Rounds tick down, tiles drop, and the last puffers
            swimming advance. It is built for quick, social energy — not rare-answer scoring.
          </p>
          <ArticleShot
            src="/screenshots/puffer-party-prompt.png?v=1"
            alt="Puffer Party Krillion gameplay HUD with Don’t Fall timer and Jump"
            caption="Gameplay HUD — round, Don’t Fall, timer, players left, Jump."
          />
        </section>

        <section className="mt-12" aria-labelledby="what-heading">
          <h3 id="what-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            What is Krillion Puffer Party?
          </h3>
          <p className={`${bodyFont.className} mt-3 text-base leading-relaxed text-slate-300`}>
            A Don’t Fall arena: sixteen puffers start on hex tiles. The floor warns, then drops. Jump
            to a safe neighbor tile. Get caught on a falling hex and you are out. Three rounds, one
            minute each — the HUD tracks round number, clock, players left, and score. Survive time,
            outlast other puffers, and clear rounds for points; music and SFX match other KrillionPro
            games (mute stops audio only).
          </p>
        </section>

        <section className="mt-12" aria-labelledby="how-heading">
          <h3 id="how-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            How to play Puffer Party
          </h3>
          <ol
            className={`${bodyFont.className} mt-4 list-decimal space-y-3 pl-5 text-base leading-relaxed text-slate-300`}
          >
            <li>Tap Start Party to load the hex arena.</li>
            <li>Watch the round timer and Don’t Fall callout.</li>
            <li>Hit Jump to hop to a neighboring live tile.</li>
            <li>Leave tiles that flash danger before they drop.</li>
            <li>Survive the round to keep swimming into the next one.</li>
          </ol>
          <ArticleShot
            src="/screenshots/puffer-party-reveal.png?v=1"
            alt="Puffer Party arena mid-round with hex tiles and puffers"
            caption="Round clear — survivors keep swimming; Next round continues the party."
          />
        </section>

        <section className="mt-12" aria-labelledby="vs-heading">
          <h3 id="vs-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Puffer Party vs Daily Dive
          </h3>
          <div className="mt-4 overflow-x-auto">
            <table className={`${bodyFont.className} w-full min-w-[28rem] border-collapse text-left text-sm`}>
              <thead>
                <tr className="border-b border-white/15 text-sky-200">
                  <th className="py-2 pr-4 font-semibold">Feature</th>
                  <th className="py-2 pr-4 font-semibold">Puffer Party</th>
                  <th className="py-2 font-semibold">Daily Dive</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-4 font-medium text-white">Core skill</td>
                  <td className="py-3 pr-4">Jump / survive tiles</td>
                  <td className="py-3">Type rare valid answers</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-4 font-medium text-white">Pace</td>
                  <td className="py-3 pr-4">Real-time rounds</td>
                  <td className="py-3">Timed trivia prompts</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-4 font-medium text-white">Win feel</td>
                  <td className="py-3 pr-4">Players left / don’t fall</td>
                  <td className="py-3">Depth &amp; rarity tiers</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-white">Vibe</td>
                  <td className="py-3 pr-4">Bright party arena</td>
                  <td className="py-3">Ocean dive HUD</td>
                </tr>
              </tbody>
            </table>
          </div>
          <ArticleShot
            src="/screenshots/puffer-party-miss.png?v=1"
            alt="Puffer Party Jump control while tiles drop mid-round"
            caption="Mid-round Jump — leave danger tiles or you splash out."
          />
        </section>

        <section className="mt-12" aria-labelledby="why-heading">
          <h3 id="why-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Why play multiplayer-style party games?
          </h3>
          <p className={`${bodyFont.className} mt-3 text-base leading-relaxed text-slate-300`}>
            Short rounds, readable stakes, and a crowded board make party modes easy to cheer for —
            even on one device. Puffer Party gives KrillionPro a social, physical contrast to the
            thinking pace of Daily Dive and Unlimited.
          </p>
          <ArticleShot
            src="/screenshots/puffer-party-results.png?v=1"
            alt="Puffer Party results after surviving or falling"
            caption="Results — survive the party or splash out, then play again."
          />
        </section>

        <section className="mt-12" aria-labelledby="related-heading">
          <h3 id="related-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Related games
          </h3>
          <ul className={`${bodyFont.className} mt-4 space-y-2 text-base text-slate-300`}>
            <li>
              <Link href="/games-like-krillion" className="font-semibold text-sky-300 hover:underline">
                Games like Krillion
              </Link>
            </li>
            <li>
              <Link href="/daily-challenge" className="font-semibold text-sky-300 hover:underline">
                Daily Dive
              </Link>
            </li>
            <li>
              <Link href="/games" className="font-semibold text-sky-300 hover:underline">
                Krillion Games hub
              </Link>
            </li>
            <li>
              <Link href="/" className="font-semibold text-sky-300 hover:underline">
                Homepage
              </Link>
            </li>
          </ul>
        </section>

        <section className="mt-12" aria-labelledby="faq-heading">
          <h3 id="faq-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Frequently asked questions
          </h3>
          <div className="mt-6 space-y-3">
            {FAQS.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-white/10 bg-[#062033]/80 px-5 py-4 open:border-sky-400/35"
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

        <section
          className="mt-12 rounded-2xl border border-sky-400/30 bg-[#062033]/90 p-6 text-center"
          aria-labelledby="cta-heading"
        >
          <h3 id="cta-heading" className={`${displayFont.className} text-xl font-bold text-white`}>
            Explore more on KrillionPro
          </h3>
          <p className={`${bodyFont.className} mt-2 text-sm text-slate-300`}>
            Jump back into party rounds, or switch to rare-answer dives when you want a brain break.
          </p>
          <Link
            href="/games"
            className={`${bodyFont.className} mt-5 inline-flex min-h-11 items-center justify-center rounded-full border-2 border-white bg-sky-500 px-8 py-2.5 text-sm font-bold text-white`}
          >
            Explore KrillionPro Games
          </Link>
        </section>
      </div>
    </article>
  );
}
