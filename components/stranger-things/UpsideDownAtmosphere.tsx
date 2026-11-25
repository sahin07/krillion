'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

type Props = {
  variant?: 'page' | 'viewport';
  className?: string;
  priority?: boolean;
};

/** Pure scenery — Hawkins / Upside Down art (no baked HUD). */
const ST_SCENE = '/stranger-things-krillion-scene.jpg';

const SPORES = [
  { left: '8%', delay: '0s', dur: '11s', size: 3 },
  { left: '16%', delay: '2.4s', dur: '13s', size: 2 },
  { left: '27%', delay: '1.1s', dur: '10s', size: 4 },
  { left: '39%', delay: '3.8s', dur: '14s', size: 2 },
  { left: '52%', delay: '0.7s', dur: '12s', size: 3 },
  { left: '63%', delay: '4.2s', dur: '11.5s', size: 5 },
  { left: '74%', delay: '1.9s', dur: '13.5s', size: 3 },
  { left: '84%', delay: '2.9s', dur: '10.5s', size: 2 },
  { left: '92%', delay: '0.4s', dur: '12.5s', size: 4 },
  { left: '48%', delay: '5.1s', dur: '15s', size: 3 },
] as const;

const EMBERS = [
  { left: '58%', top: '18%', delay: '0s', dur: '4.2s' },
  { left: '68%', top: '28%', delay: '1.1s', dur: '5s' },
  { left: '78%', top: '14%', delay: '0.5s', dur: '3.8s' },
  { left: '88%', top: '36%', delay: '2s', dur: '4.8s' },
  { left: '72%', top: '48%', delay: '1.6s', dur: '5.4s' },
  { left: '94%', top: '22%', delay: '0.9s', dur: '4s' },
] as const;

/**
 * Hawkins scene art + Upside Down motion — same pattern as DailyDiveAtmosphere.
 */
export default function UpsideDownAtmosphere({
  variant = 'page',
  className,
  priority = false,
}: Props) {
  const isPage = variant === 'page';

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden bg-[#05030a]',
        className
      )}
    >
      <div className="st-kenburns absolute inset-[-8%]">
        <Image
          src={ST_SCENE}
          alt=""
          fill
          priority={priority}
          sizes={isPage ? '100vw' : '(max-width: 1152px) 100vw, 1152px'}
          className="object-cover object-[center_42%]"
        />
      </div>

      {/* Red storm pulse (right / Mind Flayer sky) */}
      <div className="st-storm-pulse absolute inset-0" />

      {/* Blue moonlight wash (left) */}
      <div className="st-moon-wash absolute inset-0" />

      {/* Ground fog drift */}
      <div className="st-fog absolute inset-x-0 bottom-0 h-[45%]" />

      {/* Vine glow flicker on foreground */}
      <div className="st-vine-glow absolute inset-0" />

      {/* Falling Upside Down spores */}
      <div className="absolute inset-0">
        {SPORES.map((s) => (
          <span
            key={`${s.left}-${s.delay}`}
            className="st-spore absolute top-[-4%] rounded-full bg-red-200/70"
            style={{
              left: s.left,
              width: s.size,
              height: s.size,
              animationDuration: s.dur,
              animationDelay: s.delay,
              boxShadow: '0 0 6px rgba(248, 113, 113, 0.85)',
            }}
          />
        ))}
      </div>

      {/* Embers in the crimson sky */}
      <div className="absolute inset-0">
        {EMBERS.map((e) => (
          <span
            key={`${e.left}-${e.top}`}
            className="st-ember absolute h-1.5 w-1.5 rounded-full bg-orange-400/90"
            style={{
              left: e.left,
              top: e.top,
              animationDuration: e.dur,
              animationDelay: e.delay,
            }}
          />
        ))}
      </div>

      {/* Readability scrim — keep art visible in viewport */}
      <div
        className={cn(
          'absolute inset-0',
          isPage
            ? 'bg-gradient-to-b from-[#05030a]/55 via-[#05030a]/35 to-[#05030a]/88'
            : 'bg-gradient-to-b from-[#05030a]/25 via-[#0a0508]/30 to-[#05030a]/70'
        )}
      />

      {isPage && <div className="st-scan absolute inset-0 opacity-20" />}
    </div>
  );
}
