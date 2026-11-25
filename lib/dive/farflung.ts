import type { DivePack, PublicDivePack, TierId } from '@/lib/dive/types';
import { toPublicPack } from '@/lib/dive/dives';
import ff1 from '@/data/dives/farflung-1.json';

const FF_PACKS: DivePack[] = [ff1 as DivePack];

/** Seven cosmic signals · exploration clock. */
export const FF_PROMPT_COUNT = 7;
export const FF_PROMPT_SECONDS = 45;

for (const pack of FF_PACKS) {
  if (pack.prompts.length !== FF_PROMPT_COUNT) {
    throw new Error(`Farflung pack ${pack.id} must have ${FF_PROMPT_COUNT} prompts`);
  }
}

export const FARFLUNG_CONFIG = {
  promptsPerDive: FF_PROMPT_COUNT,
  promptSeconds: FF_PROMPT_SECONDS,
  label: 'Farflung',
} as const;

/** Display labels for this mode (points stay KrillionPro curated values). */
export const FF_TIER_LABELS: Record<TierId, string> = {
  plankton: 'Common',
  too_clever: 'Unusual',
  schooler: 'Rare',
  rare: 'Very Rare',
  deep_cut: 'Cosmic Rare',
  one_in_a_krillion: 'Farflung Legend',
};

export function ffMeterFromTier(tier: TierId | null): number {
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

export type ExplorationRank = {
  id: string;
  title: string;
  blurb: string;
};

export function explorationRankForRun(score: number, prompts = FF_PROMPT_COUNT): ExplorationRank {
  const avg = prompts > 0 ? score / prompts : 0;
  if (avg >= 75) {
    return {
      id: 'legend',
      title: 'Farflung Legend',
      blurb: 'Highest rank — extraordinary answers owned every round.',
    };
  }
  if (avg >= 55) {
    return {
      id: 'navigator',
      title: 'Galaxy Navigator',
      blurb: 'Expert run — deep, uncommon discoveries carried you.',
    };
  }
  if (avg >= 35) {
    return {
      id: 'discoverer',
      title: 'Rare Discoverer',
      blurb: 'Advanced — you pushed past the familiar picks.',
    };
  }
  if (avg >= 15) {
    return {
      id: 'explorer',
      title: 'Cosmic Explorer',
      blurb: 'Intermediate — keep hunting more specific finds.',
    };
  }
  return {
    id: 'tourist',
    title: 'Space Tourist',
    blurb: 'Beginner rank — try again and avoid the first obvious answer.',
  };
}

export function getFarflungPack(id?: string): DivePack {
  if (id) return FF_PACKS.find((p) => p.id === id) ?? FF_PACKS[0];
  return FF_PACKS[0];
}

export function getFarflungPackById(id: string): DivePack | null {
  return FF_PACKS.find((p) => p.id === id) ?? null;
}

export function toFarflungPublicPack(pack: DivePack): PublicDivePack {
  return {
    ...toPublicPack(pack, 'unlimited'),
    promptSeconds: FARFLUNG_CONFIG.promptSeconds,
  };
}
