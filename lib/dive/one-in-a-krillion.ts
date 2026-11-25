import type { DivePack, PublicDivePack } from '@/lib/dive/types';
import { toPublicPack } from '@/lib/dive/dives';
import oik1 from '@/data/dives/oik-1.json';

const OIK_PACKS: DivePack[] = [oik1 as DivePack];

/** Seven signals · 25s — chase rare answers (One in a Krillion mode). */
export const OIK_PROMPT_COUNT = 7;
export const OIK_PROMPT_SECONDS = 25;
/** Soft ceiling from brief: 7 × 100 pts × 10 m (bonuses can push past). */
export const OIK_MAX_DEPTH_METERS = 7000;

for (const pack of OIK_PACKS) {
  if (pack.prompts.length !== OIK_PROMPT_COUNT) {
    throw new Error(`One in a Krillion pack ${pack.id} must have ${OIK_PROMPT_COUNT} prompts`);
  }
}

export const OIK_CONFIG = {
  promptsPerDive: OIK_PROMPT_COUNT,
  promptSeconds: OIK_PROMPT_SECONDS,
  maxDepthMeters: OIK_MAX_DEPTH_METERS,
  label: 'One in a Krillion',
} as const;

/** Rare-answer bonus on base curated points. */
export function rareAnswerBonus(basePoints: number): number {
  if (basePoints >= 100) return 20;
  if (basePoints >= 85) return 15;
  if (basePoints >= 60) return 10;
  return 0;
}

/** Consecutive valid hits (points > 0 before this round's streak calc). */
export function streakBonus(streakLength: number): number {
  if (streakLength <= 1) return 0;
  if (streakLength === 2) return 5;
  if (streakLength === 3) return 10;
  if (streakLength === 4) return 15;
  return 20;
}

export type RarityRank = {
  id: string;
  title: string;
  blurb: string;
};

/** Final rarity rank from average points per prompt (including bonuses). */
export function rarityRankForRun(score: number, prompts = OIK_PROMPT_COUNT): RarityRank {
  const avg = prompts > 0 ? score / prompts : 0;
  if (avg >= 75) {
    return {
      id: 'one-in-a-krillion',
      title: 'One in a Krillion',
      blurb: 'Top rarity rank — unusual answers owned the dive.',
    };
  }
  if (avg >= 55) {
    return {
      id: 'deep-sea-genius',
      title: 'Deep-Sea Genius',
      blurb: 'Rare and deep-cut hits carried your descent.',
    };
  }
  if (avg >= 35) {
    return {
      id: 'rare-mind',
      title: 'Rare Mind',
      blurb: 'Solid uncommon thinking — keep pushing past the crowd.',
    };
  }
  if (avg >= 15) {
    return {
      id: 'uncommon-thinker',
      title: 'Uncommon Thinker',
      blurb: 'You landed hits, but obvious answers still weigh you down.',
    };
  }
  return {
    id: 'ocean-beginner',
    title: 'Ocean Beginner',
    blurb: 'Few rare catches this run — try again and go more specific.',
  };
}

export function getOikPack(id?: string): DivePack {
  if (id) return OIK_PACKS.find((p) => p.id === id) ?? OIK_PACKS[0];
  return OIK_PACKS[0];
}

export function getOikPackById(id: string): DivePack | null {
  return OIK_PACKS.find((p) => p.id === id) ?? null;
}

export function listOikPacks(): DivePack[] {
  return OIK_PACKS;
}

export function toOikPublicPack(pack: DivePack): PublicDivePack {
  return {
    ...toPublicPack(pack, 'unlimited'),
    promptSeconds: OIK_CONFIG.promptSeconds,
  };
}
