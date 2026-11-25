'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowUpRight,
  Compass,
  HelpCircle,
  Infinity as InfinityIcon,
  Layers,
  Trophy,
  X,
} from 'lucide-react';
import { displayFont, monoFont } from '@/lib/fonts';

interface KrillionMenuModalProps {
  open: boolean;
  onClose: () => void;
}

export default function KrillionMenuModal({
  open,
  onClose,
}: KrillionMenuModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="krillion-menu-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#030914]/80 p-4 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-lg rounded-2xl border border-sky-400/25 bg-[#081427] p-6 shadow-2xl shadow-black/60 sm:p-8">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className={`${monoFont.className} text-xs uppercase tracking-widest text-cyan-300`}>
              KrillionPro
            </p>
            <h2
              id="krillion-menu-title"
              className={`${displayFont.className} mt-1 text-2xl font-bold tracking-wider text-white [text-shadow:2px_2px_0px_#ff4d79]`}
            >
              MENU
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close KrillionPro menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-sky-400/25 bg-[#0C1D3A] text-slate-200 transition-colors duration-150 hover:border-cyan-400/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Dive In Grid */}
        <div className="mt-6">
          <p className={`${monoFont.className} mb-3 border-b border-dashed border-sky-400/25 pb-2 text-xs uppercase tracking-widest text-slate-400`}>
            Dive In
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link
              href="/daily-challenge"
              onClick={onClose}
              className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-[#ff4d79] bg-[#0B1C38] px-4 py-5 text-center transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#102549]"
            >
              <ArrowDown className="h-5 w-5 text-[#ff4d79]" aria-hidden="true" />
              <span className={`${monoFont.className} text-xs font-semibold uppercase tracking-wider text-[#ff6b91]`}>
                Daily Challenge
              </span>
            </Link>

            <Link
              href="/games"
              onClick={onClose}
              className="flex flex-col items-center justify-center gap-2 rounded-lg border border-sky-400/25 bg-[#0B1C38] px-4 py-5 text-center transition-all duration-150 hover:-translate-y-0.5 hover:border-cyan-400/50 hover:bg-[#102549]"
            >
              <InfinityIcon className="h-5 w-5 text-cyan-300" aria-hidden="true" />
              <span className={`${monoFont.className} text-xs font-semibold uppercase tracking-wider text-slate-100`}>
                Unlimited
              </span>
            </Link>

            <Link
              href="/games"
              onClick={onClose}
              className="flex flex-col items-center justify-center gap-2 rounded-lg border border-sky-400/25 bg-[#0B1C38] px-4 py-5 text-center transition-all duration-150 hover:-translate-y-0.5 hover:border-cyan-400/50 hover:bg-[#102549]"
            >
              <Layers className="h-5 w-5 text-sky-300" aria-hidden="true" />
              <span className={`${monoFont.className} text-xs font-semibold uppercase tracking-wider text-slate-100`}>
                All Games
              </span>
            </Link>

            <Link
              href="/leaderboards"
              onClick={onClose}
              className="flex flex-col items-center justify-center gap-2 rounded-lg border border-sky-400/25 bg-[#0B1C38] px-4 py-5 text-center transition-all duration-150 hover:-translate-y-0.5 hover:border-cyan-400/50 hover:bg-[#102549]"
            >
              <Trophy className="h-5 w-5 text-cyan-300" aria-hidden="true" />
              <span className={`${monoFont.className} text-xs font-semibold uppercase tracking-wider text-slate-100`}>
                Leaderboards
              </span>
            </Link>

            <Link
              href="/#how-to-play"
              onClick={onClose}
              className="flex flex-col items-center justify-center gap-2 rounded-lg border border-sky-400/25 bg-[#0B1C38] px-4 py-5 text-center transition-all duration-150 hover:-translate-y-0.5 hover:border-cyan-400/50 hover:bg-[#102549]"
            >
              <Compass className="h-5 w-5 text-sky-300" aria-hidden="true" />
              <span className={`${monoFont.className} text-xs font-semibold uppercase tracking-wider text-slate-100`}>
                How to Play
              </span>
            </Link>

            <Link
              href="/#faq"
              onClick={onClose}
              className="flex flex-col items-center justify-center gap-2 rounded-lg border border-sky-400/25 bg-[#0B1C38] px-4 py-5 text-center transition-all duration-150 hover:-translate-y-0.5 hover:border-cyan-400/50 hover:bg-[#102549]"
            >
              <HelpCircle className="h-5 w-5 text-cyan-300" aria-hidden="true" />
              <span className={`${monoFont.className} text-xs font-semibold uppercase tracking-wider text-slate-100`}>
                FAQ
              </span>
            </Link>
          </div>
        </div>

        {/* Highlighted Quick Link */}
        <div className="mt-5">
          <Link
            href="/#games"
            onClick={onClose}
            className="flex items-center justify-between rounded-lg border border-cyan-400/30 bg-[#0A1932] px-4 py-3.5 transition-colors duration-150 hover:border-cyan-300/60 hover:bg-[#0F2447]"
          >
            <div>
              <p className={`${monoFont.className} text-xs font-semibold uppercase tracking-wider text-cyan-300`}>
                Explore All Modes
              </p>
              <p className="mt-0.5 text-xs text-slate-300">
                Daily challenges, unlimited rounds, and themed trivia packs
              </p>
            </div>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
          </Link>
        </div>

        {/* Bottom Tagline */}
        <div className="mt-6 border-t border-dashed border-sky-400/20 pt-4 text-left">
          <p className={`${monoFont.className} text-xs text-slate-400`}>
            one in a krillion.
          </p>
        </div>
      </div>
    </div>
  );
}
