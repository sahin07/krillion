'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

type Props = {
  variant?: 'page' | 'viewport';
  className?: string;
  priority?: boolean;
};

/** 1920×1080 plate — cover-scaled for responsive full-bleed */
const WP_SCENE = '/wordplay-wonder-1920.jpg';

const SPARKS = [
  { left: '12%', delay: '0s', dur: '11s', size: 3 },
  { left: '28%', delay: '1.6s', dur: '13s', size: 2 },
  { left: '44%', delay: '0.7s', dur: '12s', size: 4 },
  { left: '61%', delay: '2.4s', dur: '14s', size: 2 },
  { left: '76%', delay: '1.1s', dur: '11s', size: 3 },
  { left: '88%', delay: '3s', dur: '13s', size: 2 },
] as const;

/**
 * Full-bleed fantasy word wonderland — scene on the page layer only
 * (HUD floats on top; no second boxed copy of the art).
 */
export default function WordplayAtmosphere({
  variant = 'page',
  className,
  priority = false,
}: Props) {
  const isPage = variant === 'page';

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden bg-[#2a1a4a]',
        className
      )}
    >
      {isPage ? (
        <div className="wp-kenburns absolute inset-[-10%]">
          <Image
            src={WP_SCENE}
            alt=""
            fill
            priority={priority}
            sizes="100vw"
            className="object-cover object-[center_42%]"
          />
        </div>
      ) : null}

      {isPage ? <div className="wp-glow absolute inset-0" /> : null}

      <div className="absolute inset-0">
        {SPARKS.map((s) => (
          <span
            key={`${s.left}-${s.delay}`}
            className="wp-spark absolute top-[-3%] rounded-full bg-amber-100/90"
            style={{
              left: s.left,
              width: s.size,
              height: s.size,
              animationDuration: s.dur,
              animationDelay: s.delay,
              boxShadow: '0 0 10px rgba(253, 224, 71, 0.85)',
            }}
          />
        ))}
      </div>

      <div
        className={cn(
          'absolute inset-0',
          isPage
            ? 'bg-gradient-to-b from-[#2a1a4a]/25 via-transparent to-[#1a0f30]/65'
            : 'bg-black/15'
        )}
      />
    </div>
  );
}
