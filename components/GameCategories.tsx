import Link from 'next/link';
import { displayFont } from '@/lib/fonts';
import { GAME_CATEGORIES } from '@/lib/site-data';

export default function GameCategories() {
  return (
    <section
      id="games"
      className="scroll-mt-20 border-t border-[#67e8f9]/15 bg-[#040816] py-14 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className={`${displayFont.className} text-xs font-semibold uppercase tracking-[0.18em] text-[#7dd3fc]`}
          >
            Krillion Games · Choose Your Mode
          </p>
          <h2
            className={`${displayFont.className} mt-3 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl`}
          >
            Explore Krillion Games
          </h2>
          <p className={`${displayFont.className} mt-3 text-base leading-relaxed text-slate-300`}>
            Daily Krillion, Unlimited practice, themed packs, and leaderboards —
            the same rare-answer twist across every Krillion game on KrillionPro.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GAME_CATEGORIES.map((category) => (
            <article
              key={category.id}
              id={category.id === 'krillion-games' ? 'games-hub' : undefined}
              className="scroll-mt-24 flex flex-col justify-between border border-[#67e8f9]/45 bg-[#07122b]/85 p-5 transition-colors hover:border-cyan-200/70 hover:bg-[#0a1a38]/9"
            >
              <div>
                <p
                  className={`${displayFont.className} text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400`}
                >
                  {category.kicker}
                </p>
                <h3
                  className={`${displayFont.className} mt-2 text-xl font-bold tracking-tight text-white`}
                >
                  {category.title}
                </h3>
                <p className={`${displayFont.className} mt-3 text-sm leading-relaxed text-slate-300`}>
                  {category.description}
                </p>
              </div>

              <div className="mt-6">
                <Link
                  href={category.href}
                  className={`${displayFont.className} inline-flex min-h-11 w-full items-center justify-center border border-[#67e8f9]/50 bg-[#071428] px-4 text-sm font-semibold uppercase tracking-[0.12em] text-cyan-100 transition-colors hover:border-cyan-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400`}
                >
                  Explore →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
