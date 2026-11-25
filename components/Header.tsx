'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowUpDown,
  Boxes,
  Infinity as InfinityIcon,
  LayoutGrid,
  Fish,
  Atom,
  BookOpen,
  HeartPulse,
  PawPrint,
  Trees,
  Rocket,
  Sparkles,
  Target,
  Trophy,
} from 'lucide-react';
import { bodyFont, pixelFont } from '@/lib/fonts';
import { PixelSquidLogo } from '@/components/PixelOceanArt';
import { cn } from '@/lib/utils';

type MegaGame = {
  name: string;
  href: string;
  icon: ReactNode;
};

const MEGA_GAMES: MegaGame[] = [
  {
    name: 'Krillion Games Hub',
    href: '/games',
    icon: <LayoutGrid className="h-4 w-4" />,
  },
  {
    name: 'Daily Dive',
    href: '/daily-challenge',
    icon: <ArrowDown className="h-4 w-4" />,
  },
  {
    name: 'Unlimited Krillion',
    href: '/unlimited-krillion',
    icon: <InfinityIcon className="h-4 w-4" />,
  },
  {
    name: 'Noillirk / Reverse',
    href: '/reverse-krillion',
    icon: <ArrowUpDown className="h-4 w-4" />,
  },
  {
    name: 'Pokémon Krillion',
    href: '/pokemon-krillion',
    icon: <Sparkles className="h-4 w-4" />,
  },
  {
    name: 'Sports Krillion',
    href: '/sports-krillion',
    icon: <Trophy className="h-4 w-4" />,
  },
  {
    name: 'Long Shot Krillion',
    href: '/long-shot-krillion',
    icon: <Target className="h-4 w-4" />,
  },
  {
    name: 'Puffer Party Krillion',
    href: '/puffer-party-krillion',
    icon: <Fish className="h-4 w-4" />,
  },
  {
    name: 'Cosmillion Moonshot',
    href: '/cosmillion',
    icon: <Rocket className="h-4 w-4" />,
  },
  {
    name: 'Farflung',
    href: '/farflung',
    icon: <Sparkles className="h-4 w-4" />,
  },
  {
    name: 'Animal Krillion',
    href: '/krillion-animal',
    icon: <PawPrint className="h-4 w-4" />,
  },
  {
    name: 'Wordplay Krillion',
    href: '/wordplay-krillion',
    icon: <BookOpen className="h-4 w-4" />,
  },
  {
    name: 'Science Krillion',
    href: '/science-krillion',
    icon: <Atom className="h-4 w-4" />,
  },
  {
    name: 'Medical Krillion',
    href: '/medical-krillion',
    icon: <HeartPulse className="h-4 w-4" />,
  },
  {
    name: 'Great Ape Krillion',
    href: '/great-ape-krillion',
    icon: <Trees className="h-4 w-4" />,
  },
  {
    name: 'Minecraft Krillion',
    href: '/minecraft-krillion-game',
    icon: <Boxes className="h-4 w-4" />,
  },
  {
    name: 'Leaderboards',
    href: '/leaderboards',
    icon: <Trophy className="h-4 w-4" />,
  },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <header className="relative z-50 border-b border-slate-200/80 bg-white text-slate-800">
      <div
        ref={rootRef}
        className="relative mx-auto flex h-11 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          className={`${bodyFont.className} inline-flex min-w-0 items-center gap-2 text-base font-semibold text-slate-800 transition-colors hover:text-slate-950`}
          onClick={() => setOpen(false)}
        >
          <PixelSquidLogo className="w-6 shrink-0 sm:w-7" />
          <span className="truncate">KrillionPro</span>
        </Link>

        <button
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label="Krillion Games menu"
          aria-haspopup="true"
          onClick={() => setOpen((v) => !v)}
          className={`${pixelFont.className} inline-flex shrink-0 items-center gap-1.5 border border-slate-300 bg-slate-50 px-3 py-1.5 text-[8px] text-slate-700 transition-colors hover:border-slate-400 hover:bg-white sm:text-[9px]`}
        >
          Krillion Games {open ? '−' : '+'}
        </button>

        {open && (
          <div
            id={menuId}
            role="menu"
            aria-label="Krillion Games"
            className="absolute right-4 top-[calc(100%+0.5rem)] z-50 w-[min(100vw-2rem,16rem)] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_14px_32px_rgba(15,23,42,0.14)] sm:right-6 lg:right-8"
          >
            <ul className="p-1.5">
              {MEGA_GAMES.map((game) => (
                <li key={game.href}>
                  <Link
                    href={game.href}
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className={cn(
                      bodyFont.className,
                      'flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50'
                    )}
                  >
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-cyan-700">
                      {game.icon}
                    </span>
                    <span>{game.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
