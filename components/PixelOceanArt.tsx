'use client';

import { motion } from 'motion/react';
import { monoFont } from '@/lib/fonts';

export function PixelSquidLogo({ className = 'w-8' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none select-none ${className}`}>
      <div className="grid grid-cols-8 gap-0">
        <div className="col-span-3 h-1" />
        <div className="col-span-2 h-1 bg-[#c084fc]" />
        <div className="col-span-3 h-1" />

        <div className="col-span-2 h-1" />
        <div className="col-span-4 h-1 bg-[#a855f7]" />
        <div className="col-span-2 h-1" />

        <div className="col-span-1 h-1" />
        <div className="col-span-6 h-1 bg-[#9333ea]" />
        <div className="col-span-1 h-1" />

        <div className="col-span-1 h-1" />
        <div className="col-span-1 h-1 bg-[#9333ea]" />
        <div className="col-span-1 h-1 bg-white" />
        <div className="col-span-2 h-1 bg-[#9333ea]" />
        <div className="col-span-1 h-1 bg-white" />
        <div className="col-span-1 h-1 bg-[#9333ea]" />
        <div className="col-span-1 h-1" />

        <div className="col-span-1 h-1" />
        <div className="col-span-6 h-1 bg-[#7e22ce]" />
        <div className="col-span-1 h-1" />

        <div className="col-span-1 h-1.5 bg-[#a855f7]" />
        <div className="col-span-1 h-1.5" />
        <div className="col-span-1 h-1.5 bg-[#a855f7]" />
        <div className="col-span-2 h-1.5" />
        <div className="col-span-1 h-1.5 bg-[#a855f7]" />
        <div className="col-span-1 h-1.5" />
        <div className="col-span-1 h-1.5 bg-[#a855f7]" />
      </div>
    </div>
  );
}

export function PixelSquidMascot({ happy = false }: { happy?: boolean }) {
  return (
    <motion.div
      aria-hidden="true"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      className="pointer-events-none select-none"
    >
      <div className="grid w-16 grid-cols-12 gap-0">
        {/* Top mantle tip */}
        <div className="col-span-5 h-1.5" />
        <div className="col-span-2 h-1.5 bg-[#d8b4fe]" />
        <div className="col-span-5 h-1.5" />

        <div className="col-span-4 h-1.5" />
        <div className="col-span-4 h-1.5 bg-[#c084fc]" />
        <div className="col-span-4 h-1.5" />

        <div className="col-span-3 h-1.5" />
        <div className="col-span-6 h-1.5 bg-[#a855f7]" />
        <div className="col-span-3 h-1.5" />

        {/* Side fins */}
        <div className="col-span-1 h-1.5" />
        <div className="col-span-10 h-1.5 bg-[#9333ea]" />
        <div className="col-span-1 h-1.5" />

        <div className="col-span-2 h-1.5" />
        <div className="col-span-8 h-1.5 bg-[#a855f7]" />
        <div className="col-span-2 h-1.5" />

        {/* Eyes row */}
        <div className="col-span-2 h-2" />
        <div className="col-span-1 h-2 bg-[#9333ea]" />
        <div className="col-span-2 h-2 bg-white" />
        <div className="col-span-2 h-2 bg-[#9333ea]" />
        <div className="col-span-2 h-2 bg-white" />
        <div className="col-span-1 h-2 bg-[#9333ea]" />
        <div className="col-span-2 h-2" />

        {/* Pupils / happy eyes row */}
        <div className="col-span-2 h-1.5" />
        <div className="col-span-1 h-1.5 bg-[#7e22ce]" />
        <div className="col-span-1 h-1.5 bg-white" />
        <div className="col-span-1 h-1.5 bg-[#0f172a]" />
        <div className="col-span-2 h-1.5 bg-[#7e22ce]" />
        <div className="col-span-1 h-1.5 bg-[#0f172a]" />
        <div className="col-span-1 h-1.5 bg-white" />
        <div className="col-span-1 h-1.5 bg-[#7e22ce]" />
        <div className="col-span-2 h-1.5" />

        {/* Cheeks / collar */}
        <div className="col-span-3 h-1.5" />
        <div className="col-span-1 h-1.5 bg-[#f472b6]" />
        <div className="col-span-4 h-1.5 bg-[#7e22ce]" />
        <div className="col-span-1 h-1.5 bg-[#f472b6]" />
        <div className="col-span-3 h-1.5" />

        {happy && (
          <>
            <div className="col-span-4 h-1" />
            <div className="col-span-4 h-1 bg-[#f9a8d4]" />
            <div className="col-span-4 h-1" />
          </>
        )}

        {/* Tentacles upper */}
        <div className="col-span-2 h-2" />
        <div className="col-span-1 h-2 bg-[#a855f7]" />
        <div className="col-span-1 h-2" />
        <div className="col-span-1 h-2 bg-[#c084fc]" />
        <div className="col-span-2 h-2" />
        <div className="col-span-1 h-2 bg-[#c084fc]" />
        <div className="col-span-1 h-2" />
        <div className="col-span-1 h-2 bg-[#a855f7]" />
        <div className="col-span-2 h-2" />

        {/* Tentacles lower */}
        <div className="col-span-1 h-2" />
        <div className="col-span-1 h-2 bg-[#9333ea]" />
        <div className="col-span-2 h-2" />
        <div className="col-span-1 h-2 bg-[#a855f7]" />
        <div className="col-span-2 h-2" />
        <div className="col-span-1 h-2 bg-[#a855f7]" />
        <div className="col-span-2 h-2" />
        <div className="col-span-1 h-2 bg-[#9333ea]" />
        <div className="col-span-1 h-2" />
      </div>
    </motion.div>
  );
}

export function PixelCloud({ compact = false }: { compact?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none opacity-75 ${compact ? 'w-28' : 'w-40'}`}
    >
      <div className="grid grid-cols-12 gap-0">
        <div className="col-span-5 h-2" />
        <div className="col-span-3 h-2 bg-[#93c5fd]/70" />
        <div className="col-span-4 h-2" />

        <div className="col-span-3 h-2" />
        <div className="col-span-6 h-2 bg-[#bfdbfe]/80" />
        <div className="col-span-3 h-2" />

        <div className="col-span-1 h-2" />
        <div className="col-span-10 h-2 bg-[#dbeafe]/85" />
        <div className="col-span-1 h-2" />

        <div className="col-span-12 h-2 bg-[#93c5fd]/65" />
      </div>
    </div>
  );
}

export function PixelMoon() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none rounded-full shadow-[0_0_32px_rgba(253,230,138,0.35)]"
    >
      <div className="grid w-16 grid-cols-8 gap-0 sm:w-20">
        <div className="col-span-2 h-2 sm:h-2.5" />
        <div className="col-span-4 h-2 bg-[#fef08a] sm:h-2.5" />
        <div className="col-span-2 h-2 sm:h-2.5" />

        <div className="col-span-1 h-2 sm:h-2.5" />
        <div className="col-span-6 h-2 bg-[#fde68a] sm:h-2.5" />
        <div className="col-span-1 h-2 sm:h-2.5" />

        <div className="col-span-2 h-2 bg-[#fef08a] sm:h-2.5" />
        <div className="col-span-1 h-2 bg-[#fcd34d] sm:h-2.5" />
        <div className="col-span-5 h-2 bg-[#fde68a] sm:h-2.5" />

        <div className="col-span-4 h-2 bg-[#fde68a] sm:h-2.5" />
        <div className="col-span-1 h-2 bg-[#f59e0b]/45 sm:h-2.5" />
        <div className="col-span-3 h-2 bg-[#fde68a] sm:h-2.5" />

        <div className="col-span-8 h-2 bg-[#fcd34d] sm:h-2.5" />

        <div className="col-span-1 h-2 sm:h-2.5" />
        <div className="col-span-6 h-2 bg-[#fde68a] sm:h-2.5" />
        <div className="col-span-1 h-2 sm:h-2.5" />

        <div className="col-span-2 h-2 sm:h-2.5" />
        <div className="col-span-4 h-2 bg-[#fcd34d] sm:h-2.5" />
        <div className="col-span-2 h-2 sm:h-2.5" />
      </div>
    </div>
  );
}

export function PixelTrawlerBoat({ float = true }: { float?: boolean }) {
  const hull = (
    <div className="grid w-24 grid-cols-[repeat(16,minmax(0,1fr))] gap-0 sm:w-28">
      <div className="col-span-7 h-1.5" />
      <div className="col-span-1 h-1.5 bg-[#050e1c]" />
      <div className="col-span-3 h-1.5 bg-[#a855f7]" />
      <div className="col-span-5 h-1.5" />

      <div className="col-span-7 h-1.5" />
      <div className="col-span-1 h-1.5 bg-[#050e1c]" />
      <div className="col-span-4 h-1.5 bg-[#c084fc]" />
      <div className="col-span-4 h-1.5" />

      <div className="col-span-7 h-1.5" />
      <div className="col-span-1 h-1.5 bg-[#050e1c]" />
      <div className="col-span-8 h-1.5" />

      <div className="col-span-5 h-1.5" />
      <div className="col-span-5 h-1.5 bg-[#0b1930]" />
      <div className="col-span-6 h-1.5" />

      <div className="col-span-5 h-1.5" />
      <div className="col-span-1 h-1.5 bg-[#050e1c]" />
      <div className="col-span-2 h-1.5 bg-[#38bdf8]" />
      <div className="col-span-2 h-1.5 bg-[#050e1c]" />
      <div className="col-span-1 h-1.5" />
      <div className="col-span-1 h-1.5 bg-[#0b1930]" />
      <div className="col-span-4 h-1.5" />

      <div className="col-span-4 h-1.5" />
      <div className="col-span-8 h-1.5 bg-[#050e1c]" />
      <div className="col-span-4 h-1.5" />

      <div className="col-span-1 h-2" />
      <div className="col-span-14 h-2 bg-[#040c18]" />
      <div className="col-span-1 h-2" />

      <div className="col-span-2 h-2" />
      <div className="col-span-12 h-2 bg-[#020812]" />
      <div className="col-span-2 h-2" />
    </div>
  );

  if (!float) {
    return (
      <div aria-hidden="true" className="pointer-events-none select-none">
        {hull}
      </div>
    );
  }

  return (
    <motion.div
      aria-hidden="true"
      animate={{ y: [0, -2.5, 0], rotate: [-0.7, 0.7, -0.7] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      className="pointer-events-none select-none"
    >
      {hull}
    </motion.div>
  );
}

export function PixelStopwatchGraphic() {
  return (
    <div aria-hidden="true" className="pointer-events-none flex flex-col items-center select-none">
      {/* Pixel crown / button */}
      <div className="grid w-10 grid-cols-6 gap-0">
        <div className="col-span-2 h-1.5" />
        <div className="col-span-2 h-1.5 bg-[#c084fc]" />
        <div className="col-span-2 h-1.5" />
        <div className="col-span-1 h-1.5" />
        <div className="col-span-4 h-1.5 bg-[#a855f7]" />
        <div className="col-span-1 h-1.5" />
      </div>
      <div className="h-1.5 w-2 bg-[#7e22ce]" />
      {/* Double ring face */}
      <div className="relative mt-0.5 flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-full border-[3px] border-[#38bdf8] bg-[#07152e] shadow-[0_0_22px_rgba(56,189,248,0.35),0_0_18px_rgba(168,85,247,0.3)]">
        <div className="flex h-[3.6rem] w-[3.6rem] items-center justify-center rounded-full border-2 border-[#c084fc]/80 bg-[#0a1a38]">
          <span className={`${monoFont.className} text-[1.65rem] font-bold leading-none text-[#e879f9] tabular-nums [text-shadow:0_0_12px_rgba(232,121,249,0.55)]`}>
            20
          </span>
        </div>
        {/* tick marks */}
        <span className="absolute top-1.5 left-1/2 h-1.5 w-0.5 -translate-x-1/2 bg-[#67e8f9]/80" />
        <span className="absolute bottom-1.5 left-1/2 h-1.5 w-0.5 -translate-x-1/2 bg-[#67e8f9]/50" />
        <span className="absolute top-1/2 left-1.5 h-0.5 w-1.5 -translate-y-1/2 bg-[#67e8f9]/50" />
        <span className="absolute top-1/2 right-1.5 h-0.5 w-1.5 -translate-y-1/2 bg-[#67e8f9]/50" />
      </div>
    </div>
  );
}

/** Chunky pixel chevron used under the squid in step 1 */
export function PixelArrowDown() {
  return (
    <div aria-hidden="true" className="grid w-6 grid-cols-5 gap-0">
      <div className="col-span-2 h-1.5" />
      <div className="col-span-1 h-1.5 bg-[#c4b5fd]" />
      <div className="col-span-2 h-1.5" />
      <div className="col-span-1 h-1.5" />
      <div className="col-span-3 h-1.5 bg-[#a78bfa]" />
      <div className="col-span-1 h-1.5" />
      <div className="col-span-5 h-1.5 bg-[#8b5cf6]" />
    </div>
  );
}

export function PixelShipwreck() {
  return (
    <div aria-hidden="true" className="pointer-events-none select-none opacity-70">
      <div className="grid w-36 grid-cols-14 gap-0 sm:w-44">
        <div className="col-span-4 h-1.5" />
        <div className="col-span-2 h-1.5 bg-[#64748b]" />
        <div className="col-span-8 h-1.5" />

        <div className="col-span-3 h-1.5" />
        <div className="col-span-1 h-1.5 bg-[#475569]" />
        <div className="col-span-2 h-1.5 bg-[#94a3b8]" />
        <div className="col-span-1 h-1.5 bg-[#475569]" />
        <div className="col-span-7 h-1.5" />

        <div className="col-span-2 h-2" />
        <div className="col-span-8 h-2 bg-[#334155]" />
        <div className="col-span-4 h-2" />

        <div className="col-span-1 h-2" />
        <div className="col-span-10 h-2 bg-[#1e293b]" />
        <div className="col-span-3 h-2" />

        <div className="col-span-12 h-2 bg-[#0f172a]" />
        <div className="col-span-2 h-2" />
      </div>
    </div>
  );
}

export function PixelLightbulbGraphic() {
  return (
    <div aria-hidden="true" className="pointer-events-none select-none">
      <div className="grid w-10 grid-cols-8 gap-0">
        <div className="col-span-2 h-1.5" />
        <div className="col-span-4 h-1.5 bg-[#f9a8d4]" />
        <div className="col-span-2 h-1.5" />

        <div className="col-span-1 h-2" />
        <div className="col-span-6 h-2 bg-[#e879f9]" />
        <div className="col-span-1 h-2" />

        <div className="col-span-1 h-2" />
        <div className="col-span-2 h-2 bg-[#f0abfc]" />
        <div className="col-span-2 h-2 bg-white/90" />
        <div className="col-span-2 h-2 bg-[#e879f9]" />
        <div className="col-span-1 h-2" />

        <div className="col-span-2 h-1.5" />
        <div className="col-span-4 h-1.5 bg-[#c084fc]" />
        <div className="col-span-2 h-1.5" />

        <div className="col-span-3 h-1.5" />
        <div className="col-span-2 h-1.5 bg-[#67e8f9]" />
        <div className="col-span-3 h-1.5" />

        <div className="col-span-3 h-1.5" />
        <div className="col-span-2 h-1.5 bg-[#38bdf8]" />
        <div className="col-span-3 h-1.5" />
      </div>
    </div>
  );
}

export function PixelFishPair() {
  return (
    <motion.div
      aria-hidden="true"
      animate={{ x: [0, 10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className="pointer-events-none flex items-center gap-4 select-none opacity-80"
    >
      <div className="grid w-8 grid-cols-6 gap-0">
        <div className="col-span-2 h-1" />
        <div className="col-span-3 h-1 bg-[#a855f7]" />
        <div className="col-span-1 h-1" />
        <div className="col-span-1 h-1 bg-[#7e22ce]" />
        <div className="col-span-4 h-1 bg-[#c084fc]" />
        <div className="col-span-1 h-1 bg-[#0f172a]" />
        <div className="col-span-2 h-1" />
        <div className="col-span-3 h-1 bg-[#9333ea]" />
        <div className="col-span-1 h-1" />
      </div>
      <div className="mt-3 grid w-6 grid-cols-6 gap-0">
        <div className="col-span-2 h-1" />
        <div className="col-span-3 h-1 bg-[#818cf8]" />
        <div className="col-span-1 h-1" />
        <div className="col-span-5 h-1 bg-[#a78bfa]" />
        <div className="col-span-1 h-1 bg-[#0f172a]" />
      </div>
    </motion.div>
  );
}

export function PixelCoralReefCorners() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between overflow-hidden select-none">
      {/* Left Coral & Kelp */}
      <div className="flex items-end">
        <div className="h-24 w-8 rounded-tr-lg bg-[#2e1065]/75" />
        <div className="h-16 w-12 rounded-t-md bg-[#3b0764]/80" />
        <div className="h-10 w-10 rounded-tr-lg bg-[#1e1b4b]/85" />
        <div className="h-6 w-14 rounded-tr-md bg-[#312e81]/60" />
      </div>

      {/* Right Coral & Kelp */}
      <div className="flex items-end">
        <div className="h-6 w-14 rounded-tl-md bg-[#312e81]/60" />
        <div className="h-12 w-10 rounded-tl-lg bg-[#1e1b4b]/85" />
        <div className="h-20 w-12 rounded-t-md bg-[#3b0764]/80" />
        <div className="h-28 w-8 rounded-tl-lg bg-[#2e1065]/75" />
      </div>
    </div>
  );
}

export function OceanDepthScale() {
  const markers = [
    { label: '0m', major: true },
    { label: '250m', major: false },
    { label: '500m', major: true },
    { label: '750m', major: false },
    { label: '1,000m', major: true },
    { label: '1,500m', major: true },
    { label: '2,000m', major: true },
  ];

  return (
    <div
      aria-hidden="true"
      className={`${monoFont.className} pointer-events-none relative flex h-full select-none flex-col items-end justify-between py-1 text-[9px] tabular-nums`}
    >
      {/* vertical rail */}
      <span className="absolute right-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan-300/50 via-violet-400/35 to-fuchsia-400/25" />

      {markers.map((depth, i) => (
        <div key={depth.label} className="relative z-[1] flex items-center gap-1.5">
          <span
            className={
              depth.major
                ? 'text-sky-200/70'
                : 'text-sky-200/40'
            }
          >
            {depth.label}
          </span>
          <span
            className={
              depth.major
                ? 'h-px w-3.5 bg-cyan-300/55'
                : 'h-px w-2 bg-sky-300/30'
            }
          />
          {/* “you are here” glow near mid-depth */}
          {i === 4 && (
            <span className="absolute -right-1 h-2 w-2 rounded-full bg-fuchsia-400/80 shadow-[0_0_10px_rgba(232,121,249,0.8)]" />
          )}
        </div>
      ))}
    </div>
  );
}
