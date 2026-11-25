import Link from 'next/link';
import ArticleShot from '@/components/seo/ArticleShot';
import { bodyFont, displayFont, pixelFont } from '@/lib/fonts';

const FAQS = [
  {
    q: 'What is Cosmillion?',
    a: 'Cosmillion (Moonshot) is KrillionPro’s free browser space trivia game. You select every answer that fits a timed prompt. Rare correct picks among the eight-player crew score more than popular ones.',
  },
  {
    q: 'Can you play Cosmillion online?',
    a: 'Yes. Open /cosmillion on KrillionPro, pick a mode, and tap Jump In. No download is required.',
  },
  {
    q: 'Is Cosmillion free?',
    a: 'Yes. Cosmillion Moonshot on KrillionPro is free to play in the browser.',
  },
  {
    q: 'Can you play Cosmillion on mobile?',
    a: 'Yes in a mobile browser. The layout is responsive with tap-friendly answer chips. A native app is not required.',
  },
  {
    q: 'How does rare-answer scoring work?',
    a: 'After each prompt locks, KrillionPro counts how many of the eight crew members selected each correct option. Fewer crew mates on a correct pick means a rarer band and more points for you.',
  },
  {
    q: 'Is Cosmillion multiplayer?',
    a: 'The field is built for eight astronauts. Right now the crew is filled with simulated bots so you can play anytime. Live rooms are not shipping yet.',
  },
  {
    q: 'What Cosmillion modes are there?',
    a: 'Classic Moonshot (ten prompts, highest score), Space Survival (wrong picks destroy your platform; last standing wins), and Rare Answer Hunt (crystals and multipliers from rare and ultra corrects).',
  },
] as const;

export const COSMILLION_FAQ_ITEMS = FAQS;

export default function CosmillionSeoArticle() {
  return (
    <article
      aria-labelledby="cosmillion-seo-heading"
      className="border-t border-violet-400/20 bg-[#050816] text-slate-200"
    >
      <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <p
          className={`${pixelFont.className} text-[8px] uppercase tracking-[0.18em] text-violet-300 sm:text-[9px]`}
        >
          Cosmillion game guide · Play online
        </p>
        <h2
          id="cosmillion-seo-heading"
          className={`${displayFont.className} mt-3 text-3xl font-bold text-white sm:text-4xl`}
        >
          Cosmillion / Moonshot Game Guide
        </h2>
        <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
          Cosmillion / Moonshot is a free space trivia game on KrillionPro. Timed multi-fit prompts,
          rare-answer scoring, and three modes — Classic, Space Survival, and Rare Answer Hunt — live
          in the player above. This guide covers how to play, features, and tips.
        </p>
        <p className="mt-5">
          <a
            href="#cosmillion-play"
            className={`${bodyFont.className} inline-flex min-h-11 items-center justify-center rounded-full border-2 border-violet-200/70 bg-violet-600 px-6 py-2.5 text-sm font-bold text-white`}
          >
            Play Cosmillion Online
          </a>
        </p>

        <section className="mt-12" aria-labelledby="how-heading">
          <h3 id="how-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            How to Play Cosmillion
          </h3>
          <ol
            className={`${bodyFont.className} mt-4 list-decimal space-y-3 pl-5 text-base leading-relaxed text-slate-300`}
          >
            <li>Choose Classic Moonshot, Space Survival, or Rare Answer Hunt in the lobby.</li>
            <li>Tap Jump In to fill an eight-player crew (you plus bots).</li>
            <li>Read the prompt and select every answer that fits.</li>
            <li>Beat the countdown — or lock early when you are ready.</li>
            <li>Earn points from rare correct picks, streaks, crystals (Hunt), or stay alive (Survival).</li>
          </ol>
          <ArticleShot
            src="/screenshots/cosmillion-prompt.png?v=2"
            alt="Cosmillion Moonshot prompt with multi-fit answer grid and timer"
            caption="Play Cosmillion online — timer, multi-fit grid, mute sound and music in the HUD."
          />
        </section>

        <section className="mt-12" aria-labelledby="what-heading">
          <h3 id="what-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            What Is Cosmillion / Moonshot?
          </h3>
          <p className={`${bodyFont.className} mt-3 text-base leading-relaxed text-slate-300`}>
            Cosmillion is a space-themed trivia challenge. Each Moonshot prompt shows a question and a
            grid of options. Your job is to mark every option that fits — not just one letter. When the
            clock locks, the crew’s picks appear. Correct answers that few others chose pay more than
            popular corrects. That rare-answer twist is the core hook.
          </p>
          <p className={`${bodyFont.className} mt-3 text-base leading-relaxed text-slate-300`}>
            The main objective depends on mode: top the scoreboard, be the last astronaut standing, or
            bank cosmic crystals. Across all modes, reading carefully and chasing uncommon correct
            fits is what makes Cosmillion feel different from a standard online trivia quiz.
          </p>
          <ArticleShot
            src="/screenshots/cosmillion-reveal.png?v=2"
            alt="Cosmillion reveal showing correct options and pick percentages"
            caption="Reveal — correct fits, pick %, and rarity bands after the crew locks."
          />
        </section>

        <section className="mt-12" aria-labelledby="features-heading">
          <h3 id="features-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Cosmillion Game Features
          </h3>
          <ul className={`${bodyFont.className} mt-4 list-disc space-y-2 pl-5 text-base text-slate-300`}>
            <li>Space-themed HUD with timer bar, streak, and crew chips</li>
            <li>Multi-fit answer grids (select all that apply)</li>
            <li>Rare-answer scoring from live pick share among eight players</li>
            <li>Timed prompts with optional early lock</li>
            <li>In-round crew leaderboard and end-of-run ranking</li>
            <li>Three game modes from one lobby</li>
            <li>Sound and music toggles (mute stops audio only)</li>
          </ul>
        </section>

        <section className="mt-12" aria-labelledby="modes-heading">
          <h3 id="modes-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Cosmillion Game Modes
          </h3>
          <div className={`${bodyFont.className} mt-4 space-y-4 text-base leading-relaxed text-slate-300`}>
            <div>
              <p className="font-semibold text-white">Classic Moonshot</p>
              <p className="mt-1">
                Ten prompts. Highest score wins. Rare correct picks and streak bonuses push the board.
                Recommended first mode.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">Space Survival</p>
              <p className="mt-1">
                Any wrong pick — or locking with nothing selected — destroys your platform. Last
                astronaut standing wins. Survive clean locks across the run.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">Rare Answer Hunt</p>
              <p className="mt-1">
                Chase uncommon correct answers to collect cosmic crystals. Crystals raise your score
                multiplier so rare and ultra hits pay even more.
              </p>
            </div>
          </div>
          <ArticleShot
            src="/screenshots/cosmillion-miss.png?v=2"
            alt="Cosmillion round with low score after wrong or thin picks"
            caption="Survival / miss beat — wrong chips or skipped fits cost the round."
          />
        </section>

        <section className="mt-12" aria-labelledby="tips-heading">
          <h3 id="tips-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Tips and Strategies to Win
          </h3>
          <ul className={`${bodyFont.className} mt-4 list-disc space-y-2 pl-5 text-base text-slate-300`}>
            <li>Read the full prompt — multi-fit means more than one option can be correct.</li>
            <li>In Survival, never guess a chip you are unsure about; one wrong pick ends your run.</li>
            <li>In Hunt, prioritize rare and ultra bands over stacking popular corrects.</li>
            <li>Watch the timer bar and lock when your set feels clean instead of rushing every chip.</li>
            <li>Build a rare-answer streak in Classic for the streak bonus.</li>
          </ul>
        </section>

        <section className="mt-12" aria-labelledby="controls-heading">
          <h3 id="controls-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Controls and Instructions
          </h3>
          <ul className={`${bodyFont.className} mt-4 list-disc space-y-2 pl-5 text-base text-slate-300`}>
            <li>
              <span className="font-semibold text-white">Mouse / trackpad:</span> click mode cards,
              Jump In, answer chips, Lock answers, and Next prompt.
            </li>
            <li>
              <span className="font-semibold text-white">Touch:</span> same actions via tap on phones
              and tablets in the mobile browser.
            </li>
            <li>
              <span className="font-semibold text-white">Audio:</span> use the speaker and music icons
              in the HUD or lobby — mute stops audio only.
            </li>
          </ul>
        </section>

        <section className="mt-12" aria-labelledby="mobile-heading">
          <h3 id="mobile-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Is Cosmillion Available on Mobile?
          </h3>
          <p className={`${bodyFont.className} mt-3 text-base leading-relaxed text-slate-300`}>
            Cosmillion runs in the browser on phone, tablet, and desktop. There is no separate app
            install. Larger screens show the two-column prompt layout; smaller screens stack the
            question and answer grid. Use a modern mobile browser for the best experience.
          </p>
        </section>

        <section className="mt-12" aria-labelledby="similar-heading">
          <h3 id="similar-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Similar Games You May Like
          </h3>
          <ul className={`${bodyFont.className} mt-4 space-y-2 text-base text-slate-300`}>
            <li>
              <Link href="/daily-challenge" className="font-semibold text-violet-300 hover:underline">
                Daily Dive
              </Link>{' '}
              — typed rare-answer ocean trivia
            </li>
            <li>
              <Link href="/puffer-party-krillion" className="font-semibold text-violet-300 hover:underline">
                Puffer Party
              </Link>{' '}
              — Don’t Fall party survival
            </li>
            <li>
              <Link href="/long-shot-krillion" className="font-semibold text-violet-300 hover:underline">
                Long Shot Krillion
              </Link>{' '}
              — longer clock, uncommon answers score more
            </li>
            <li>
              <Link href="/games-like-krillion" className="font-semibold text-violet-300 hover:underline">
                Games like Krillion
              </Link>{' '}
              — more trivia and party-style picks
            </li>
            <li>
              <Link href="/games" className="font-semibold text-violet-300 hover:underline">
                Krillion Games hub
              </Link>
            </li>
          </ul>
          <ArticleShot
            src="/screenshots/cosmillion-results.png?v=2"
            alt="Cosmillion results with score and crew leaderboard"
            caption="Results — placement, score, rare streak, and Play again."
          />
        </section>

        <section className="mt-12" aria-labelledby="faq-heading">
          <h3 id="faq-heading" className={`${displayFont.className} text-2xl font-bold text-white`}>
            Frequently Asked Questions
          </h3>
          <div className="mt-6 space-y-3">
            {FAQS.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-white/10 bg-[#0b1028]/80 px-5 py-4 open:border-violet-400/35"
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
          className="mt-12 rounded-2xl border border-violet-400/30 bg-[#0b1028]/90 p-6 text-center"
          aria-labelledby="cta-heading"
        >
          <h3 id="cta-heading" className={`${displayFont.className} text-xl font-bold text-white`}>
            Ready to play Cosmillion?
          </h3>
          <p className={`${bodyFont.className} mt-2 text-sm text-slate-300`}>
            Jump back to the player above, pick a mode, and start a Moonshot.
          </p>
          <a
            href="#cosmillion-play"
            className={`${bodyFont.className} mt-5 inline-flex min-h-11 items-center justify-center rounded-full border-2 border-white bg-violet-600 px-8 py-2.5 text-sm font-bold text-white`}
          >
            Play Cosmillion Online
          </a>
        </section>
      </div>
    </article>
  );
}
