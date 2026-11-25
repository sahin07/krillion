import type { DivePack, PublicDivePack } from '@/lib/dive/types';
import { toPublicPack } from '@/lib/dive/dives';

import sportsDaily01 from '@/data/dives/sports-daily-01.json';
import sportsUnlimited1 from '@/data/dives/sports-unlimited-1.json';

const SP_DAILY: DivePack[] = [sportsDaily01 as DivePack];
const SP_UNLIMITED: DivePack[] = [sportsUnlimited1 as DivePack];

const SP_PROMPT_COUNT = 7;
const SP_PROMPT_SECONDS = 25;

for (const pack of [...SP_DAILY, ...SP_UNLIMITED]) {
  if (pack.prompts.length !== SP_PROMPT_COUNT) {
    throw new Error(`Sports pack ${pack.id} must have ${SP_PROMPT_COUNT} prompts`);
  }
}

export const SPORTS_CONFIG = {
  promptsPerDive: SP_PROMPT_COUNT,
  promptSeconds: SP_PROMPT_SECONDS,
  label: 'Sports Krillion',
} as const;

export function utcDateKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

export function getSportsDailyPack(d = new Date()): DivePack {
  const start = Date.UTC(2026, 0, 1);
  const today = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  const idx =
    ((Math.floor((today - start) / 86_400_000) % SP_DAILY.length) + SP_DAILY.length) %
    SP_DAILY.length;
  return SP_DAILY[idx];
}

export function getSportsUnlimitedPack(id?: string): DivePack {
  if (id) return SP_UNLIMITED.find((p) => p.id === id) ?? SP_UNLIMITED[0];
  return SP_UNLIMITED[0];
}

export function getSportsPackById(id: string): DivePack | null {
  return SP_DAILY.find((p) => p.id === id) ?? SP_UNLIMITED.find((p) => p.id === id) ?? null;
}

export function toSportsPublicPack(pack: DivePack, extras?: { date?: string }): PublicDivePack {
  return {
    ...toPublicPack(pack, 'daily', extras),
    promptSeconds: SPORTS_CONFIG.promptSeconds,
  };
}
