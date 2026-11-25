'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

type Props = {
  variant?: 'page' | 'viewport';
  className?: string;
  priority?: boolean;
};

const FF_SCENE = '/farflung-scene.jpg';

const STARS = [
  { left: '10%', delay: '0s', dur: '12s', size: 2 },
  { left: '22%', delay: '1.8s', dur: '14s', size: 3 },
  { left: '38%', delay: '0.9s', dur: '11s', size: 2 },
  { left: '54%', delay: '3.2s', dur: '13s', size: 4 },
  { left: '68%', delay: '0.4s', dur: '15s', size: 2 },
  { left: '79%', delay: '2.5s', dur: '12s', size: 3 },
  { left: '91%', delay: '1.4s', dur: '14s', size: 2 },
] as const;

/**
 * Cosmic exploration backdrop — scenery art + nebula / star motion.
 */
export default function FarflungAtmosphere({
  variant = 'page',
  className,
  priority = false,
}: Props) {
  const isPage = variant === 'page';

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden bg-[#0a0618]',
        className
      )}
    >
      <div className="ff-kenburns absolute inset-[-8%]">
        <Image
          src={FF_SCENE}
          alt=""
          fill
          priority={priority}
          sizes={isPage ? '100vw' : '(max-width: 1152px) 100vw, 1152px'}
          className="object-cover object-[center_40%]"
        />
      </div>

      <div className="ff-nebula absolute inset-0" />
      <div className="ff-glow absolute inset-0" />

      <div className="absolute inset-0">
        {STARS.map((s) => (
          <span
            key={`${s.left}-${s.delay}`}
            className="ff-star absolute top-[-3%] rounded-full bg-cyan-100/90"
            style={{
              left: s.left,
              width: s.size,
              height: s.size,
              animationDuration: s.dur,
              animationDelay: s.delay,
              boxShadow: '0 0 8px rgba(165, 243, 252, 0.9)',
            }}
          />
        ))}
      </div>

      <div
        className={cn(
          'absolute inset-0',
          isPage
            ? 'bg-gradient-to-b from-[#0a0618]/50 via-[#0a0618]/30 to-[#0a0618]/88'
            : 'bg-gradient-to-b from-[#0a0618]/20 via-[#12082a]/30 to-[#0a0618]/65'
        )}
      />
    </div>
  );
}
