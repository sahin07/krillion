import Link from 'next/link';
import { displayFont } from '@/lib/fonts';

export default function FeaturedDailyChallenge() {
  return (
    <section
      id="daily-challenge"
      className="scroll-mt-20 border-t border-[#67e8f9]/15 bg-[#040816] py-14 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative border border-[#67e8f9]/45 bg-[#07122b]/85 p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p
                className={`${displayFont.className} text-xs font-semibold uppercase tracking-[0.18em] text-[#7dd3fc]`}
              >
                Featured · Daily Krillion
              </p>

              <h2
                className={`${displayFont.className} mt-3 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl`}
              >
                Daily Krillion Challenge
              </h2>

              <p className={`${displayFont.className} mt-4 max-w-2xl text-base leading-relaxed text-slate-300`}>
                Today’s shared Daily Dive — eight prompts, twenty seconds each. Valid
                answers score by rarity; a one in a krillion hit sinks you deepest.
                Same dive for everyone that UTC day.
              </p>

              <ul className={`${displayFont.className} mt-6 space-y-2.5 text-sm text-slate-200`}>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#67e8f9]" aria-hidden="true" />
                  <span>Eight shared prompts · twenty seconds each</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#67e8f9]" aria-hidden="true" />
                  <span>Rarity scoring from Plankton to One in a Krillion</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#67e8f9]" aria-hidden="true" />
                  <span>Free in the browser — then keep going in Unlimited</span>
                </li>
              </ul>

              <div className="mt-8">
                <Link
                  href="/daily-challenge"
                  className={`${displayFont.className} inline-flex min-h-12 items-center justify-center gap-2 border-2 border-[#67e8f9] bg-[#071428] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_0_22px_rgba(34,211,238,0.25)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300`}
                >
                  <span aria-hidden="true">▼</span>
                  <span>Play Now</span>
                  <span aria-hidden="true">▼</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div
                role="img"
                aria-label="Daily Challenge dive board"
                className="relative flex aspect-[4/3] w-full flex-col justify-between border border-[#67e8f9]/35 bg-gradient-to-b from-[#0d3a6e]/80 to-[#040d21] p-5"
              >
                <div className={`${displayFont.className} flex items-center justify-between text-xs`}>
                  <span className="font-semibold uppercase tracking-wider text-cyan-200">
                    Daily Dive Board
                  </span>
                  <span className="uppercase tracking-wider text-sky-300/80">Today</span>
                </div>

                <div className="my-auto text-center">
                  <p
                    className={`${displayFont.className} text-4xl font-bold text-white [text-shadow:2px_0_0_#fb7185,-2px_0_0_#67e8f9]`}
                  >
                    ONE SET
                  </p>
                  <p className={`${displayFont.className} mt-2 text-sm text-slate-300`}>
                    Shared prompts for every player
                  </p>
                </div>

                <div
                  className={`${displayFont.className} grid grid-cols-3 gap-2 border-t border-[#67e8f9]/20 pt-3 text-center text-[11px] uppercase tracking-wider text-slate-300`}
                >
                  <div className="border border-[#67e8f9]/25 bg-[#091830]/80 py-2">Read</div>
                  <div className="border border-[#67e8f9]/25 bg-[#091830]/80 py-2">Guess</div>
                  <div className="border border-[#67e8f9]/25 bg-[#091830]/80 py-2">Sink</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
