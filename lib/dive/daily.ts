import type { DivePack } from '@/lib/dive/types';
import { DAILY_PROMPTS_PER_DIVE } from '@/lib/dive/types';

import daily01 from '@/data/dives/daily-01.json';
import daily02 from '@/data/dives/daily-02.json';
import daily03 from '@/data/dives/daily-03.json';
import daily04 from '@/data/dives/daily-04.json';
import daily05 from '@/data/dives/daily-05.json';

const DAILY_PACKS: DivePack[] = [
  daily01 as DivePack,
  daily02 as DivePack,
  daily03 as DivePack,
  daily04 as DivePack,
  daily05 as DivePack,
];

for (const pack of DAILY_PACKS) {
  if (pack.prompts.length !== DAILY_PROMPTS_PER_DIVE) {
    throw new Error(`Daily pack ${pack.id} must have ${DAILY_PROMPTS_PER_DIVE} prompts`);
  }
}

/** UTC calendar date YYYY-MM-DD */
export function utcDateKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

/** Stable day index from UTC date */
export function utcDayIndex(d = new Date()): number {
  const start = Date.UTC(2026, 0, 1);
  const today = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  return Math.floor((today - start) / 86_400_000);
}

export function getDailyPackForDate(d = new Date()): DivePack {
  const idx = ((utcDayIndex(d) % DAILY_PACKS.length) + DAILY_PACKS.length) % DAILY_PACKS.length;
  return DAILY_PACKS[idx];
}

export function getDailyPackById(id: string): DivePack | null {
  return DAILY_PACKS.find((p) => p.id === id) ?? null;
}

export function listDailyPacks(): DivePack[] {
  return DAILY_PACKS;
}
