'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

type Props = {
  variant?: 'page' | 'viewport';
  className?: string;
  priority?: boolean;
};

/** 1920×1080 plate — cover-scaled for responsive full-bleed */
const GA_SCENE = '/great-ape-1920.jpg';

const LEAVES = [
  { left: '8%', delay: '0s', dur: '16s', size: 10, rot: '12deg' },
  { left: '24%', delay: '2.2s', dur: '18s', size: 8, rot: '-18deg' },
  { left: '41%', delay: '1.1s', dur: '15s', size: 12, rot: '25deg' },
  { left: '58%', delay: '3.4s', dur: '17s', size: 9, rot: '-10deg' },
  { left: '72%', delay: '0.6s', dur: '19s', size: 11, rot: '8deg' },
  { left: '86%', delay: '2.8s', dur: '16s', size: 7, rot: '-22deg' },
] as const;

/**
 * Full-bleed great-ape jungle — scene on the page layer only
 * (HUD floats on top; no second boxed copy of the art).
 */
export default function GreatApeAtmosphere({
  variant = 'page',
  className,
  priority = false,
}: Props) {
  const isPage = variant === 'page';

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden bg-[#1a3a28]',
        className
      )}
    >
      {isPage ? (
        <div className="ak-kenburns absolute inset-[-10%]">
          <Image
            src={GA_SCENE}
            alt=""
            fill
            priority={priority || isPage}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      ) : null}

      {isPage ? <div className="ak-sunhaze absolute inset-0 opacity-45" /> : null}
      {isPage ? <div className="ak-canopy absolute inset-0 opacity-35" /> : null}

      <div className="absolute inset-0">
        {LEAVES.map((leaf) => (
          <span
            key={`${leaf.left}-${leaf.delay}`}
            className="ak-leaf absolute top-[-4%] rounded-[40%_60%_55%_45%] bg-emerald-400/50"
            style={{
              left: leaf.left,
              width: leaf.size,
              height: leaf.size * 1.4,
              animationDuration: leaf.dur,
              animationDelay: leaf.delay,
              transform: `rotate(${leaf.rot})`,
              boxShadow: '0 0 6px rgba(52, 211, 153, 0.3)',
            }}
          />
        ))}
      </div>

      <div
        className={cn(
          'absolute inset-0',
          isPage
            ? 'bg-gradient-to-b from-emerald-950/25 via-transparent to-emerald-950/60'
            : 'bg-black/20'
        )}
      />
    </div>
  );
}
