import type { DivePack, PublicDivePack } from '@/lib/dive/types';
import { toPublicPack } from '@/lib/dive/dives';

import longShotDaily01 from '@/data/dives/long-shot-daily-01.json';
import longShotUnlimited1 from '@/data/dives/long-shot-unlimited-1.json';

const LS_DAILY: DivePack[] = [longShotDaily01 as DivePack];
const LS_UNLIMITED: DivePack[] = [longShotUnlimited1 as DivePack];

/** Longer clock = “longer shots” — more time to hunt rare answers. */
const LS_PROMPT_COUNT = 7;
const LS_PROMPT_SECONDS = 35;

for (const pack of [...LS_DAILY, ...LS_UNLIMITED]) {
  if (pack.prompts.length !== LS_PROMPT_COUNT) {
    throw new Error(`Long Shot pack ${pack.id} must have ${LS_PROMPT_COUNT} prompts`);
  }
}

export const LONG_SHOT_CONFIG = {
  promptsPerDive: LS_PROMPT_COUNT,
  promptSeconds: LS_PROMPT_SECONDS,
  label: 'Long Shot Krillion',
} as const;

export function utcDateKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

export function getLongShotDailyPack(d = new Date()): DivePack {
  const start = Date.UTC(2026, 0, 1);
  const today = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  const idx =
    ((Math.floor((today - start) / 86_400_000) % LS_DAILY.length) + LS_DAILY.length) %
    LS_DAILY.length;
  return LS_DAILY[idx];
}

export function getLongShotUnlimitedPack(id?: string): DivePack {
  if (id) return LS_UNLIMITED.find((p) => p.id === id) ?? LS_UNLIMITED[0];
  return LS_UNLIMITED[0];
}

export function getLongShotPackById(id: string): DivePack | null {
  return LS_DAILY.find((p) => p.id === id) ?? LS_UNLIMITED.find((p) => p.id === id) ?? null;
}

export function toLongShotPublicPack(pack: DivePack, extras?: { date?: string }): PublicDivePack {
  return {
    ...toPublicPack(pack, 'daily', extras),
    promptSeconds: LONG_SHOT_CONFIG.promptSeconds,
  };
}
