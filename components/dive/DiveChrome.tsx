'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowDown,
  ArrowUpDown,
  Boxes,
  Fish,
  HelpCircle,
  Infinity as InfinityIcon,
  LayoutGrid,
  Menu,
  Rocket,
  RotateCcw,
  Settings,
  Shirt,
  Target,
  User,
  Users,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { bodyFont, pixelFont } from '@/lib/fonts';
import { formatDepth } from '@/lib/dive/engine';
import type { PromptResult } from '@/lib/dive/types';
import { cn } from '@/lib/utils';

type MenuItem =
  | {
      kind: 'link';
      label: string;
      href: string;
      icon: ReactNode;
    }
  | {
      kind: 'soon';
      label: string;
      icon: ReactNode;
    };

const DIVE_MENU: MenuItem[] = [
  { kind: 'link', label: 'Daily Dive · 8×20', href: '/daily-challenge', icon: <ArrowDown className="h-5 w-5" /> },
  { kind: 'link', label: 'Unlimited Krillion · 6×20', href: '/unlimited-krillion', icon: <InfinityIcon className="h-5 w-5" /> },
  {
    kind: 'link',
    label: 'Noillirk / Reverse',
    href: '/reverse-krillion',
    icon: <ArrowUpDown className="h-5 w-5" />,
  },
  {
    kind: 'link',
    label: 'Pokémon Krillion',
    href: '/pokemon-krillion',
    icon: <Fish className="h-5 w-5" />,
  },
  {
    kind: 'link',
    label: 'Sports Krillion',
    href: '/sports-krillion',
    icon: <Shirt className="h-5 w-5" />,
  },
  {
    kind: 'link',
    label: 'Long Shot Krillion',
    href: '/long-shot-krillion',
    icon: <Target className="h-5 w-5" />,
  },
  {
    kind: 'link',
    label: 'Minecraft Krillion',
    href: '/minecraft-krillion-game',
    icon: <Boxes className="h-5 w-5" />,
  },
  {
    kind: 'link',
    label: 'Puffer Party Krillion',
    href: '/puffer-party-krillion',
    icon: <Fish className="h-5 w-5" />,
  },
  {
    kind: 'link',
    label: 'Cosmillion Moonshot',
    href: '/cosmillion',
    icon: <Rocket className="h-5 w-5" />,
  },
  { kind: 'link', label: 'Archive', href: '/games', icon: <RotateCcw className="h-5 w-5" /> },
  { kind: 'link', label: 'All games', href: '/games', icon: <LayoutGrid className="h-5 w-5" /> },
  { kind: 'soon', label: 'My Krillion', icon: <User className="h-5 w-5" /> },
  { kind: 'soon', label: 'Friends', icon: <Users className="h-5 w-5" /> },
  { kind: 'soon', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
  { kind: 'link', label: 'Too Clever tips', href: '/guides/too-clever', icon: <HelpCircle className="h-5 w-5" /> },
  { kind: 'link', label: 'FAQ', href: '/#faq', icon: <HelpCircle className="h-5 w-5" /> },
];

/** Pulse colors by score tier (reference-style rainbow track) */
function pulseColor(points: number | null, state: 'done' | 'active' | 'todo'): string {
  if (state === 'todo') return 'bg-slate-700/90 border-slate-600/50';
  if (state === 'active') {
    return 'bg-pink-400 border-pink-200 shadow-[0_0_12px_rgba(244,114,182,0.85)] scale-125 animate-pulse';
  }
  // done — color by points
  if (points === null || points <= 0) return 'bg-slate-500 border-slate-400/40';
  if (points <= 10) return 'bg-amber-400 border-amber-200/70 shadow-[0_0_8px_rgba(251,191,36,0.55)]';
  if (points <= 15) return 'bg-lime-400 border-lime-200/70 shadow-[0_0_8px_rgba(163,230,53,0.5)]';
  if (points <= 30) return 'bg-cyan-400 border-cyan-200/70 shadow-[0_0_8px_rgba(34,211,238,0.55)]';
  if (points <= 60) return 'bg-violet-400 border-violet-200/70 shadow-[0_0_8px_rgba(167,139,250,0.55)]';
  if (points <= 85) return 'bg-fuchsia-500 border-fuchsia-300/70 shadow-[0_0_8px_rgba(217,70,239,0.55)]';
  return 'bg-rose-400 border-white/50 shadow-[0_0_12px_rgba(251,113,133,0.75)]';
}

type DiveTopBarProps = {
  soundOn: boolean;
  onToggleSound: () => void;
  menuOpen: boolean;
  onToggleMenu: () => void;
};

export function DiveTopBar({ soundOn, onToggleSound, menuOpen, onToggleMenu }: DiveTopBarProps) {
  const pathname = usePathname();

  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between p-3 sm:p-4">
        <button
          type="button"
          onClick={onToggleMenu}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-[#07122b]/90 text-slate-100 shadow-lg backdrop-blur-sm transition-colors hover:border-cyan-300/40 hover:text-cyan-200"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <button
          type="button"
          onClick={onToggleSound}
          aria-label={soundOn ? 'Turn sound off' : 'Turn sound on'}
          aria-pressed={soundOn}
          className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-[#07122b]/90 text-slate-100 shadow-lg backdrop-blur-sm transition-colors hover:border-cyan-300/40 hover:text-cyan-200"
        >
          {soundOn ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5 text-slate-400" />}
        </button>
      </div>

      {/* Backdrop */}
      <button
        type="button"
        aria-label="Dismiss menu"
        onClick={onToggleMenu}
        className={cn(
          'absolute inset-0 z-40 bg-[#020617]/55 backdrop-blur-[2px] transition-opacity',
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      />

      {/* Left drawer sidebar */}
      <nav
        aria-label="Dive menu"
        aria-hidden={!menuOpen}
        className={cn(
          'absolute inset-y-0 left-0 z-50 flex w-[min(17.5rem,86vw)] flex-col border-r border-white/10 bg-[#07122b] shadow-2xl transition-transform duration-300 ease-out',
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3.5">
          <div>
            <p className={`${pixelFont.className} text-[7px] tracking-[0.16em] text-slate-500`}>
              KRILLIONPRO
            </p>
            <p className={`${pixelFont.className} mt-1 text-[10px] tracking-wider text-cyan-300`}>
              DIVE IN
            </p>
          </div>
          <button
            type="button"
            onClick={onToggleMenu}
            aria-label="Close menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-slate-200 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <ul className="flex-1 space-y-0.5 overflow-y-auto px-2 py-3">
          {DIVE_MENU.map((item) => {
            if (item.kind === 'soon') {
              return (
                <li key={item.label}>
                  <div
                    className={`${bodyFont.className} flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-500`}
                    title="Coming soon"
                  >
                    <span className="opacity-45">{item.icon}</span>
                    <span className="flex-1 text-sm font-medium">{item.label}</span>
                    <span className="text-[10px] uppercase tracking-wider text-slate-600">Soon</span>
                  </div>
                </li>
              );
            }

            const active =
              item.href === '/unlimited-krillion'
                ? pathname.startsWith('/unlimited-krillion')
                : item.href.startsWith('/#')
                  ? false
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={onToggleMenu}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    `${bodyFont.className} flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors`,
                    active
                      ? 'bg-pink-500/15 text-pink-200'
                      : 'text-slate-200 hover:bg-white/5 hover:text-cyan-100'
                  )}
                >
                  <span className={active ? 'text-pink-300' : 'text-cyan-200/75'}>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

      </nav>
    </>
  );
}

type DiveHudProps = {
  depthMeters: number;
  score: number;
  promptIndex: number;
  total: number;
  results: PromptResult[];
};

export function DiveHud({ depthMeters, score, promptIndex, total, results }: DiveHudProps) {
  return (
    <div className="relative z-20 flex w-full items-start justify-between gap-2 px-1 pt-12 sm:gap-3 sm:pt-14">
      <div className="min-w-[4.5rem] rounded-xl border border-cyan-400/35 bg-[#07122b]/90 px-2.5 py-2 text-center backdrop-blur-sm sm:min-w-[5.5rem] sm:px-3">
        <p className={`${pixelFont.className} text-[6px] tracking-wider text-slate-400 sm:text-[7px]`}>
          DEPTH
        </p>
        <p className={`${bodyFont.className} mt-0.5 text-base font-bold text-cyan-300 sm:text-lg`}>
          {formatDepth(depthMeters)}
        </p>
      </div>

      <div className="flex flex-col items-center gap-2 pt-1">
        <div className="flex items-end gap-1 sm:gap-1.5" aria-hidden="true">
          {Array.from({ length: total }).map((_, i) => {
            const done = i < results.length;
            const active = i === promptIndex && !done;
            const points = done ? results[i]?.points ?? 0 : null;
            const state = done ? 'done' : active ? 'active' : 'todo';
            return (
              <span
                key={i}
                className={cn(
                  'h-2.5 w-2.5 rounded-[3px] border transition-all duration-300 sm:h-3 sm:w-3',
                  pulseColor(points, state)
                )}
              />
            );
          })}
        </div>
        <p className={`${pixelFont.className} text-[6px] tracking-wider text-pink-300/90 sm:text-[7px]`}>
          PROMPT {Math.min(promptIndex + 1, total)} OF {total}
        </p>
      </div>

      <div className="min-w-[4.5rem] rounded-xl border border-fuchsia-400/35 bg-[#07122b]/90 px-2.5 py-2 text-center backdrop-blur-sm sm:min-w-[5.5rem] sm:px-3">
        <p className={`${pixelFont.className} text-[6px] tracking-wider text-slate-400 sm:text-[7px]`}>
          SCORE
        </p>
        <p className={`${bodyFont.className} mt-0.5 text-base font-bold text-pink-300 sm:text-lg`}>
          {score}
        </p>
      </div>
    </div>
  );
}

/** Right-edge depth ticks like the reference */
export function DiveDepthRail({ depthMeters }: { depthMeters: number }) {
  const markers = [0, 100, 200, 500, 1000, 2000, 4000, 7000];
  const max = 7000;
  const youPct = Math.min(98, (depthMeters / max) * 100);

  return (
    <div
      aria-hidden="true"
      className={`${pixelFont.className} pointer-events-none absolute right-1 top-24 bottom-28 z-10 hidden w-10 flex-col justify-between text-[6px] text-sky-200/40 sm:right-2 sm:flex`}
    >
      {markers.map((m) => (
        <div key={m} className="flex items-center justify-end gap-1">
          <span>{m === 0 ? '0m' : `-${m}m`}</span>
          <span className="h-px w-2 bg-sky-300/35" />
        </div>
      ))}
      <span
        className="absolute right-0 flex -translate-y-1/2 items-center gap-1 text-[6px] text-pink-300"
        style={{ top: `${youPct}%` }}
      >
        YOU
        <span className="h-1.5 w-1.5 rounded-full bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.9)]" />
      </span>
    </div>
  );
}
