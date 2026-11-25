import type { DivePack, PublicDivePack, TierId } from '@/lib/dive/types';
import { toPublicPack } from '@/lib/dive/dives';
import animal1 from '@/data/dives/animal-1.json';

const AK_PACKS: DivePack[] = [animal1 as DivePack];

/** Seven wildlife rounds · safari clock. */
export const AK_PROMPT_COUNT = 7;
export const AK_PROMPT_SECONDS = 45;

for (const pack of AK_PACKS) {
  if (pack.prompts.length !== AK_PROMPT_COUNT) {
    throw new Error(`Animal pack ${pack.id} must have ${AK_PROMPT_COUNT} prompts`);
  }
}

export const ANIMAL_CONFIG = {
  promptsPerDive: AK_PROMPT_COUNT,
  promptSeconds: AK_PROMPT_SECONDS,
  label: 'Animal Krillion',
} as const;

/** Display labels for this mode (Animal Krillion rarity bands). */
export const AK_TIER_LABELS: Record<TierId, string> = {
  plankton: 'Common',
  too_clever: 'Unusual',
  schooler: 'Rare',
  rare: 'Very Rare',
  deep_cut: 'Ultra Rare',
  one_in_a_krillion: 'Animal Legend',
};

export function akMeterFromTier(tier: TierId | null): number {
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

export type WildlifeRank = {
  id: string;
  title: string;
  blurb: string;
};

export function wildlifeRankForRun(score: number, prompts = AK_PROMPT_COUNT): WildlifeRank {
  const avg = prompts > 0 ? score / prompts : 0;
  if (avg >= 75) {
    return {
      id: 'legend',
      title: 'Animal Legend',
      blurb: 'Highest rank — extraordinary wildlife picks owned every round.',
    };
  }
  if (avg >= 55) {
    return {
      id: 'expert',
      title: 'Animal Expert',
      blurb: 'Expert run — deep, uncommon species carried you.',
    };
  }
  if (avg >= 35) {
    return {
      id: 'hunter',
      title: 'Rare Species Hunter',
      blurb: 'Advanced — you pushed past the zoo-favorite answers.',
    };
  }
  if (avg >= 15) {
    return {
      id: 'explorer',
      title: 'Jungle Explorer',
      blurb: 'Intermediate — keep hunting more specific animals.',
    };
  }
  return {
    id: 'rookie',
    title: 'Wildlife Rookie',
    blurb: 'Beginner rank — try again and avoid the first obvious animal.',
  };
}

export function getAnimalPack(id?: string): DivePack {
  if (id) return AK_PACKS.find((p) => p.id === id) ?? AK_PACKS[0];
  return AK_PACKS[0];
}

export function getAnimalPackById(id: string): DivePack | null {
  return AK_PACKS.find((p) => p.id === id) ?? null;
}

export function toAnimalPublicPack(pack: DivePack): PublicDivePack {
  return {
    ...toPublicPack(pack, 'unlimited'),
    promptSeconds: ANIMAL_CONFIG.promptSeconds,
  };
}
