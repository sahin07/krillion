import Link from 'next/link';
import { bodyFont, pixelFont } from '@/lib/fonts';
import { RELATED_GAMES } from '@/lib/game-pages';
import { cn } from '@/lib/utils';

type Props = {
  title: string;
  description: string;
  activeId: string;
  /** ocean / minecraft / cinematic / cosmic / jungle / wordplay / science / medical — pixel H1; tone changes accent color */
  tone?: 'ocean' | 'minecraft' | 'cinematic' | 'cosmic' | 'jungle' | 'wordplay' | 'science' | 'medical';
};

export default function GamePageIntro({ title, description, activeId, tone = 'ocean' }: Props) {
  const pillActive =
    tone === 'minecraft'
      ? 'border-emerald-400 bg-emerald-500/20 text-emerald-100'
      : tone === 'cinematic'
        ? 'border-red-400 bg-red-500/20 text-red-100'
        : tone === 'cosmic'
          ? 'border-fuchsia-400 bg-fuchsia-500/20 text-fuchsia-100'
          : tone === 'jungle'
            ? 'border-lime-400 bg-lime-500/20 text-lime-100'
            : tone === 'wordplay'
              ? 'border-violet-400 bg-violet-500/20 text-violet-100'
              : tone === 'science'
                ? 'border-cyan-300 bg-cyan-500/20 text-cyan-100'
                : tone === 'medical'
                  ? 'border-sky-300 bg-sky-500/20 text-sky-100'
                  : 'border-cyan-400 bg-cyan-500/15 text-cyan-100';
  const pillIdle =
    tone === 'minecraft'
      ? 'border-white/15 bg-black/30 text-slate-300 hover:border-emerald-400/50 hover:text-white'
      : tone === 'cinematic'
        ? 'border-white/15 bg-black/30 text-slate-300 hover:border-red-400/50 hover:text-white'
        : tone === 'cosmic'
          ? 'border-white/15 bg-black/30 text-slate-300 hover:border-fuchsia-400/50 hover:text-white'
          : tone === 'jungle'
            ? 'border-white/15 bg-black/30 text-slate-300 hover:border-lime-400/50 hover:text-white'
            : tone === 'wordplay'
              ? 'border-white/15 bg-black/30 text-slate-300 hover:border-violet-400/50 hover:text-white'
              : tone === 'science'
                ? 'border-white/15 bg-black/30 text-slate-300 hover:border-cyan-300/50 hover:text-white'
                : tone === 'medical'
                  ? 'border-white/15 bg-black/30 text-slate-300 hover:border-sky-300/50 hover:text-white'
                  : 'border-white/15 bg-black/30 text-slate-300 hover:border-cyan-400/50 hover:text-white';

  const titleShadow =
    tone === 'minecraft'
      ? '[text-shadow:4px_0_0_#166534,-3px_0_0_#4ade80,0_0_28px_rgba(74,222,128,0.3)]'
      : tone === 'cinematic'
        ? '[text-shadow:3px_0_0_#7f1d1d,-2px_0_0_#ef4444,0_0_28px_rgba(239,68,68,0.4)]'
        : tone === 'cosmic'
          ? '[text-shadow:3px_0_0_#7c3aed,-2px_0_0_#22d3ee,0_0_28px_rgba(217,70,239,0.4)]'
          : tone === 'jungle'
            ? '[text-shadow:3px_0_0_#3f6212,-2px_0_0_#eab308,0_0_28px_rgba(132,204,22,0.35)]'
            : tone === 'wordplay'
              ? '[text-shadow:3px_0_0_#5b21b6,-2px_0_0_#fbbf24,0_0_28px_rgba(167,139,250,0.4)]'
              : tone === 'science'
                ? '[text-shadow:3px_0_0_#0369a1,-2px_0_0_#22d3ee,0_0_28px_rgba(34,211,238,0.4)]'
                : tone === 'medical'
                  ? '[text-shadow:3px_0_0_#0e7490,-2px_0_0_#38bdf8,0_0_28px_rgba(56,189,248,0.4)]'
                  : '[text-shadow:4px_0_0_#7c3aed,-3px_0_0_#22d3ee,0_0_28px_rgba(167,139,250,0.35)]';

  // Same pixel hero as Daily Dive / OIK / Cosmillion — tone only changes accent color
  const titleFont = pixelFont.className;
  const titleSize = 'text-[clamp(1.15rem,3.8vw,2.2rem)]';
  const pillFont = pixelFont.className;
  const pillSize = 'px-3 py-1.5 text-[8px] tracking-wide sm:text-[9px]';

  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-8 pb-4 text-center sm:px-6 sm:pt-10 lg:px-8">
      <h1 className={`${titleFont} text-balance leading-tight text-white ${titleSize} ${titleShadow}`}>
        {title}
      </h1>
      <p
        className={`${bodyFont.className} mx-auto mt-3.5 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base`}
      >
        {description}
      </p>

      <nav aria-label="Related games" className="mt-6 overflow-x-auto pb-1">
        <ul className="mx-auto flex w-max max-w-full flex-wrap justify-center gap-2 px-1">
          {RELATED_GAMES.map((game) => {
            const active = game.id === activeId;
            return (
              <li key={game.id}>
                <Link
                  href={game.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    pillFont,
                    'inline-flex items-center rounded-full border transition-colors',
                    pillSize,
                    active ? pillActive : pillIdle
                  )}
                >
                  {game.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </section>
  );
}
