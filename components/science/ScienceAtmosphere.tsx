'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

type Props = {
  variant?: 'page' | 'viewport';
  className?: string;
  priority?: boolean;
};

/** 1920×1080 plate — cover-scaled for responsive full-bleed */
const SCI_SCENE = '/science-lab-1920.jpg';

const PARTICLES = [
  { left: '10%', delay: '0s', dur: '12s', size: 3 },
  { left: '26%', delay: '1.5s', dur: '14s', size: 2 },
  { left: '48%', delay: '0.8s', dur: '11s', size: 4 },
  { left: '64%', delay: '2.6s', dur: '13s', size: 2 },
  { left: '78%', delay: '1.2s', dur: '12s', size: 3 },
  { left: '90%', delay: '3.1s', dur: '14s', size: 2 },
] as const;

/**
 * Full-bleed futuristic lab — scene on the page layer only
 * (HUD floats on top; no second boxed copy of the art).
 */
export default function ScienceAtmosphere({
  variant = 'page',
  className,
  priority = false,
}: Props) {
  const isPage = variant === 'page';

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden bg-[#061428]',
        className
      )}
    >
      {isPage ? (
        <div className="sci-kenburns absolute inset-[-10%]">
          <Image
            src={SCI_SCENE}
            alt=""
            fill
            priority={priority}
            sizes="100vw"
            className="object-cover object-[center_40%]"
          />
        </div>
      ) : null}

      {isPage ? <div className="sci-glow absolute inset-0" /> : null}

      <div className="absolute inset-0">
        {PARTICLES.map((p) => (
          <span
            key={`${p.left}-${p.delay}`}
            className="sci-particle absolute top-[-3%] rounded-full bg-cyan-200/90"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDuration: p.dur,
              animationDelay: p.delay,
              boxShadow: '0 0 10px rgba(34, 211, 238, 0.85)',
            }}
          />
        ))}
      </div>

      <div
        className={cn(
          'absolute inset-0',
          isPage
            ? 'bg-gradient-to-b from-[#061428]/30 via-transparent to-[#020810]/70'
            : 'bg-black/20'
        )}
      />
    </div>
  );
}
