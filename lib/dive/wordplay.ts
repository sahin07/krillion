import type { PublicDivePack } from '@/lib/dive/types';
import type { TierId } from '@/lib/dive/types';
import type { WordplayPromptDef } from '@/lib/dive/wordplay-validate';
import wordplay1 from '@/data/dives/wordplay-1.json';

export type WordplayPack = {
  id: string;
  title: string;
  diveNumber: number;
  prompts: WordplayPromptDef[];
};

const WP_PACKS: WordplayPack[] = [wordplay1 as WordplayPack];

export const WP_PROMPT_COUNT = 7;
export const WP_PROMPT_SECONDS = 45;

for (const pack of WP_PACKS) {
  if (pack.prompts.length !== WP_PROMPT_COUNT) {
    throw new Error(`Wordplay pack ${pack.id} must have ${WP_PROMPT_COUNT} prompts`);
  }
}

export const WORDPLAY_CONFIG = {
  promptsPerDive: WP_PROMPT_COUNT,
  promptSeconds: WP_PROMPT_SECONDS,
  label: 'Wordplay Krillion',
} as const;

/** Outline tier names */
export const WP_TIER_LABELS: Record<TierId, string> = {
  plankton: 'Common Word',
  too_clever: 'Unusual Word',
  schooler: 'Rare Word',
  rare: 'Very Rare Word',
  deep_cut: 'Ultra Rare Word',
  one_in_a_krillion: 'Wordplay Legend',
};

export function wpMeterFromTier(tier: TierId | null): number {
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

export type WordplayRank = {
  id: string;
  title: string;
  blurb: string;
};

export function wordplayRankForRun(score: number, prompts = WP_PROMPT_COUNT): WordplayRank {
  const avg = prompts > 0 ? score / prompts : 0;
  if (avg >= 75) {
    return {
      id: 'legend',
      title: 'Wordplay Legend',
      blurb: 'Highest rank — extraordinary word finds owned every round.',
    };
  }
  if (avg >= 55) {
    return {
      id: 'master',
      title: 'Word Master',
      blurb: 'Expert run — clever, uncommon words carried you.',
    };
  }
  if (avg >= 35) {
    return {
      id: 'hunter',
      title: 'Vocabulary Hunter',
      blurb: 'Advanced — you pushed past the first obvious answer.',
    };
  }
  if (avg >= 15) {
    return {
      id: 'explorer',
      title: 'Letter Explorer',
      blurb: 'Intermediate — keep hunting more specific words.',
    };
  }
  return {
    id: 'rookie',
    title: 'Word Rookie',
    blurb: 'Beginner rank — try again and skip the first word that pops up.',
  };
}

export function getWordplayPack(id?: string): WordplayPack {
  if (id) return WP_PACKS.find((p) => p.id === id) ?? WP_PACKS[0];
  return WP_PACKS[0];
}

export function getWordplayPackById(id: string): WordplayPack | null {
  return WP_PACKS.find((p) => p.id === id) ?? null;
}

export function getWordplayPrompt(
  pack: WordplayPack,
  promptId: string
): WordplayPromptDef | null {
  return pack.prompts.find((p) => p.id === promptId) ?? null;
}

export function toWordplayPublicPack(pack: WordplayPack): PublicDivePack {
  return {
    id: pack.id,
    title: pack.title,
    diveNumber: pack.diveNumber,
    promptSeconds: WORDPLAY_CONFIG.promptSeconds,
    prompts: pack.prompts.map((p) => ({ id: p.id, prompt: p.prompt })),
  };
}
