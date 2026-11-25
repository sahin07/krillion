'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

type Props = {
  /** Full page vs inset game viewport */
  variant?: 'page' | 'viewport';
  className?: string;
  priority?: boolean;
};

const BUBBLES = [
  { left: '8%', delay: '0s', dur: '9s', size: 4 },
  { left: '18%', delay: '2.2s', dur: '11s', size: 3 },
  { left: '32%', delay: '1.1s', dur: '10s', size: 5 },
  { left: '48%', delay: '3.4s', dur: '12s', size: 3 },
  { left: '61%', delay: '0.6s', dur: '8.5s', size: 4 },
  { left: '74%', delay: '4.1s', dur: '13s', size: 6 },
  { left: '86%', delay: '1.8s', dur: '9.5s', size: 3 },
  { left: '93%', delay: '2.8s', dur: '11.5s', size: 4 },
];

/**
 * Pixel deep-sea backdrop for Daily Challenge — art + light rays, bubbles, caustics.
 */
export default function DailyDiveAtmosphere({
  variant = 'page',
  className,
  priority = false,
}: Props) {
  const isPage = variant === 'page';

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden bg-[#020b1a]',
        className
      )}
    >
      <div className="daily-dive-kenburns absolute inset-[-6%]">
        <Image
          src="/daily-dive-bg.jpg"
          alt=""
          fill
          priority={priority}
          sizes={isPage ? '100vw' : '(max-width: 1152px) 100vw, 1152px'}
          className="object-cover object-[center_55%]"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>

      {/* God-ray pulse */}
      <div className="daily-dive-rays absolute inset-0" />

      {/* Water caustic shimmer */}
      <div className="daily-dive-caustics absolute inset-0 opacity-40" />

      {/* Rising bubbles */}
      <div className="absolute inset-0">
        {BUBBLES.map((b) => (
          <span
            key={`${b.left}-${b.delay}`}
            className="sea-bubble absolute bottom-[-4%] rounded-full border border-cyan-200/50 bg-cyan-100/25"
            style={{
              left: b.left,
              width: b.size,
              height: b.size,
              animationDuration: b.dur,
              animationDelay: b.delay,
            }}
          />
        ))}
      </div>

      {/* Readability scrim — stronger on page so text stays clear */}
      <div
        className={cn(
          'absolute inset-0',
          isPage
            ? 'bg-gradient-to-b from-[#040816]/55 via-[#040816]/45 to-[#040816]/88'
            : 'bg-gradient-to-b from-[#040816]/35 via-[#07122b]/50 to-[#020a14]/75'
        )}
      />

      {isPage && <div className="scanlines absolute inset-0 opacity-30" />}
    </div>
  );
}
