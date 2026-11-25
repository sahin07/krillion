import type { DivePack, PublicDivePack, TierId } from '@/lib/dive/types';
import { toPublicPack } from '@/lib/dive/dives';
import science1 from '@/data/dives/science-1.json';

const SCI_PACKS: DivePack[] = [science1 as DivePack];

export const SCI_PROMPT_COUNT = 7;
export const SCI_PROMPT_SECONDS = 45;

for (const pack of SCI_PACKS) {
  if (pack.prompts.length !== SCI_PROMPT_COUNT) {
    throw new Error(`Science pack ${pack.id} must have ${SCI_PROMPT_COUNT} prompts`);
  }
}

export const SCIENCE_CONFIG = {
  promptsPerDive: SCI_PROMPT_COUNT,
  promptSeconds: SCI_PROMPT_SECONDS,
  label: 'Science Krillion',
} as const;

export const SCI_TIER_LABELS: Record<TierId, string> = {
  plankton: 'Common Discovery',
  too_clever: 'Unusual Discovery',
  schooler: 'Rare Discovery',
  rare: 'Advanced Discovery',
  deep_cut: 'Ultra Rare Discovery',
  one_in_a_krillion: 'Scientific Legend',
};

export function sciMeterFromTier(tier: TierId | null): number {
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
  if (basePoints >= 80) return 15;
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

export type ScienceRank = {
  id: string;
  title: string;
  blurb: string;
};

export function scienceRankForRun(score: number, prompts = SCI_PROMPT_COUNT): ScienceRank {
  const avg = prompts > 0 ? score / prompts : 0;
  if (avg >= 75) {
    return {
      id: 'legend',
      title: 'Scientific Legend',
      blurb: 'Highest rank — extraordinary discoveries owned every round.',
    };
  }
  if (avg >= 55) {
    return {
      id: 'master',
      title: 'Science Master',
      blurb: 'Expert run — deep, uncommon science carried you.',
    };
  }
  if (avg >= 35) {
    return {
      id: 'hunter',
      title: 'Discovery Hunter',
      blurb: 'Advanced — you pushed past the textbook answers.',
    };
  }
  if (avg >= 15) {
    return {
      id: 'researcher',
      title: 'Curious Researcher',
      blurb: 'Intermediate — keep hunting more specific discoveries.',
    };
  }
  return {
    id: 'rookie',
    title: 'Science Rookie',
    blurb: 'Beginner rank — try again and skip the first textbook answer.',
  };
}

export function getSciencePack(id?: string): DivePack {
  if (id) return SCI_PACKS.find((p) => p.id === id) ?? SCI_PACKS[0];
  return SCI_PACKS[0];
}

export function getSciencePackById(id: string): DivePack | null {
  return SCI_PACKS.find((p) => p.id === id) ?? null;
}

export function toSciencePublicPack(pack: DivePack): PublicDivePack {
  return {
    ...toPublicPack(pack, 'unlimited'),
    promptSeconds: SCIENCE_CONFIG.promptSeconds,
  };
}
