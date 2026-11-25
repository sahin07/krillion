'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

type Props = {
  variant?: 'page' | 'viewport';
  className?: string;
  priority?: boolean;
};

/** 1920×1080 plate — cover-scaled for responsive full-bleed */
const MED_SCENE = '/medical-lab-1920.jpg';

const PARTICLES = [
  { left: '12%', delay: '0s', dur: '13s', size: 3 },
  { left: '28%', delay: '1.4s', dur: '15s', size: 2 },
  { left: '46%', delay: '0.7s', dur: '12s', size: 4 },
  { left: '62%', delay: '2.4s', dur: '14s', size: 2 },
  { left: '76%', delay: '1.1s', dur: '13s', size: 3 },
  { left: '88%', delay: '2.9s', dur: '15s', size: 2 },
] as const;

/**
 * Full-bleed futuristic medical lab — scene on the page layer only
 * (HUD floats on top; no second boxed copy of the art).
 */
export default function MedicalAtmosphere({
  variant = 'page',
  className,
  priority = false,
}: Props) {
  const isPage = variant === 'page';

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden bg-[#04121f]',
        className
      )}
    >
      {isPage ? (
        <div className="med-kenburns absolute inset-[-10%]">
          <Image
            src={MED_SCENE}
            alt=""
            fill
            priority={priority || isPage}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      ) : null}

      {isPage ? <div className="med-glow absolute inset-0" /> : null}

      <div className="absolute inset-0">
        {PARTICLES.map((p) => (
          <span
            key={`${p.left}-${p.delay}`}
            className="med-particle absolute top-[-3%] rounded-full bg-sky-200/90"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDuration: p.dur,
              animationDelay: p.delay,
              boxShadow: '0 0 10px rgba(56, 189, 248, 0.85)',
            }}
          />
        ))}
      </div>

      <div
        className={cn(
          'absolute inset-0',
          isPage
            ? 'bg-gradient-to-b from-[#04121f]/35 via-transparent to-[#020810]/72'
            : 'bg-black/20'
        )}
      />
    </div>
  );
}
