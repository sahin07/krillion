import type { DivePack, PublicDivePack, TierId } from '@/lib/dive/types';
import greatApe1 from '@/data/dives/great-ape-1.json';

const GA_PACKS: DivePack[] = [greatApe1 as DivePack];

export const GA_PROMPT_COUNT = 7;
export const GA_PROMPT_SECONDS = 45;

for (const pack of GA_PACKS) {
  if (pack.prompts.length !== GA_PROMPT_COUNT) {
    throw new Error(`Great Ape pack ${pack.id} must have ${GA_PROMPT_COUNT} prompts`);
  }
}

export const GREAT_APE_CONFIG = {
  promptsPerDive: GA_PROMPT_COUNT,
  promptSeconds: GA_PROMPT_SECONDS,
  label: 'Great Ape Krillion',
} as const;

export const GA_TIER_LABELS: Record<TierId, string> = {
  plankton: 'Common Ape',
  too_clever: 'Unusual Discovery',
  schooler: 'Rare Species',
  rare: 'Deep Discovery',
  deep_cut: 'Ultra Rare',
  one_in_a_krillion: 'Great Ape Legend',
};

export function gaMeterFromTier(tier: TierId | null): number {
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

export type GreatApeRank = {
  id: string;
  title: string;
  blurb: string;
};

export function greatApeRankForRun(score: number, prompts = GA_PROMPT_COUNT): GreatApeRank {
  const avg = prompts > 0 ? score / prompts : 0;
  if (avg >= 75) {
    return {
      id: 'legend',
      title: 'Great Ape Legend',
      blurb: 'Exceptional performance — subspecies-level picks owned the canopy.',
    };
  }
  if (avg >= 55) {
    return {
      id: 'expert',
      title: 'Great Ape Expert',
      blurb: 'Strong knowledge — uncommon primates carried you.',
    };
  }
  if (avg >= 35) {
    return {
      id: 'hunter',
      title: 'Rare Species Hunter',
      blurb: 'Discovers unusual answers — you pushed past zoo favorites.',
    };
  }
  if (avg >= 15) {
    return {
      id: 'explorer',
      title: 'Primate Explorer',
      blurb: 'Knows the basics — keep hunting more specific apes.',
    };
  }
  return {
    id: 'rookie',
    title: 'Jungle Rookie',
    blurb: 'Beginner explorer — try again and skip the first obvious ape.',
  };
}

export function getGreatApePack(id?: string): DivePack {
  if (id) return GA_PACKS.find((p) => p.id === id) ?? GA_PACKS[0];
  return GA_PACKS[0];
}

export function getGreatApePackById(id: string): DivePack | null {
  return GA_PACKS.find((p) => p.id === id) ?? null;
}

export function toGreatApePublicPack(pack: DivePack): PublicDivePack {
  return {
    id: pack.id,
    title: pack.title,
    diveNumber: pack.diveNumber,
    promptSeconds: GREAT_APE_CONFIG.promptSeconds,
    prompts: pack.prompts.map((p) => ({ id: p.id, prompt: p.prompt })),
  };
}
