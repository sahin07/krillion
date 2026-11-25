import type { DivePack, PublicDivePack, TierId } from '@/lib/dive/types';
import { toPublicPack } from '@/lib/dive/dives';
import st1 from '@/data/dives/stranger-things-1.json';

const ST_PACKS: DivePack[] = [st1 as DivePack];

/** Seven Upside Down signals · longer clock for mystery answers. */
export const ST_PROMPT_COUNT = 7;
export const ST_PROMPT_SECONDS = 45;

for (const pack of ST_PACKS) {
  if (pack.prompts.length !== ST_PROMPT_COUNT) {
    throw new Error(`Stranger Things pack ${pack.id} must have ${ST_PROMPT_COUNT} prompts`);
  }
}

export const STRANGER_THINGS_CONFIG = {
  promptsPerDive: ST_PROMPT_COUNT,
  promptSeconds: ST_PROMPT_SECONDS,
  label: 'Stranger Things Krillion',
} as const;

/** Display labels for this mode (points stay KrillionPro curated values). */
export const ST_TIER_LABELS: Record<TierId, string> = {
  plankton: 'Common',
  too_clever: 'Unusual',
  schooler: 'Rare',
  rare: 'Very Rare',
  deep_cut: 'Ultra Rare',
  one_in_a_krillion: 'Upside Down Legendary',
};

/** Meter fill 0–1 from tier (null = empty). */
export function stMeterFromTier(tier: TierId | null): number {
  if (!tier) return 0;
  const order: TierId[] = [
    'plankton',
    'too_clever',
    'schooler',
    'rare',
    'deep_cut',
    'one_in_a_krillion',
  ];
  return (order.indexOf(tier) + 1) / order.length;
}

export function rareAnswerBonus(basePoints: number): number {
  if (basePoints >= 100) return 20;
  if (basePoints >= 85) return 15;
  if (basePoints >= 60) return 10;
  return 0;
}

export function streakBonus(streakLength: number): number {
  if (streakLength <= 1) return 0;
  if (streakLength === 2) return 5;
  if (streakLength === 3) return 10;
  if (streakLength === 4) return 15;
  return 20;
}

export type SurvivalRank = {
  id: string;
  title: string;
  blurb: string;
};

export function survivalRankForRun(score: number, prompts = ST_PROMPT_COUNT): SurvivalRank {
  const avg = prompts > 0 ? score / prompts : 0;
  if (avg >= 75) {
    return {
      id: 'legend',
      title: 'Upside Down Legend',
      blurb: 'Highest rank — unusual answers owned every round.',
    };
  }
  if (avg >= 55) {
    return {
      id: 'dimension',
      title: 'Dimension Explorer',
      blurb: 'Expert run — deep, uncommon answers carried you.',
    };
  }
  if (avg >= 35) {
    return {
      id: 'escapee',
      title: 'Lab Escapee',
      blurb: 'Advanced — you pushed past the crowd picks.',
    };
  }
  if (avg >= 15) {
    return {
      id: 'seeker',
      title: 'Mystery Seeker',
      blurb: 'Intermediate — keep hunting more specific answers.',
    };
  }
  return {
    id: 'visitor',
    title: 'Hawkins Visitor',
    blurb: 'Beginner rank — try again and avoid the first obvious answer.',
  };
}

export function getStrangerThingsPack(id?: string): DivePack {
  if (id) return ST_PACKS.find((p) => p.id === id) ?? ST_PACKS[0];
  return ST_PACKS[0];
}

export function getStrangerThingsPackById(id: string): DivePack | null {
  return ST_PACKS.find((p) => p.id === id) ?? null;
}

export function toStrangerThingsPublicPack(pack: DivePack): PublicDivePack {
  return {
    ...toPublicPack(pack, 'unlimited'),
    promptSeconds: STRANGER_THINGS_CONFIG.promptSeconds,
  };
}
