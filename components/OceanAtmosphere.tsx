'use client';

import LiveOceanCanvas from '@/components/LiveOceanCanvas';

/** Waterline high on the frame so most of the hero is underwater (lobby mock). */
export const SEA_LINE = 0.2;

/**
 * Full-bleed pixel ocean backdrop for the hero lobby.
 */
export default function OceanAtmosphere() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#020617]">
      <LiveOceanCanvas seaLine={SEA_LINE} />
    </div>
  );
}
