import type { DivePack, PublicDivePack, TierId } from '@/lib/dive/types';
import medical1 from '@/data/dives/medical-1.json';

const MED_PACKS: DivePack[] = [medical1 as DivePack];

export const MED_PROMPT_COUNT = 7;
export const MED_PROMPT_SECONDS = 25;

for (const pack of MED_PACKS) {
  if (pack.prompts.length !== MED_PROMPT_COUNT) {
    throw new Error(`Medical pack ${pack.id} must have ${MED_PROMPT_COUNT} prompts`);
  }
}

export const MEDICAL_CONFIG = {
  promptsPerDive: MED_PROMPT_COUNT,
  promptSeconds: MED_PROMPT_SECONDS,
  label: 'Medical Krillion',
} as const;

export const MED_TIER_LABELS: Record<TierId, string> = {
  plankton: 'Common Knowledge',
  too_clever: 'Medical Student',
  schooler: 'Uncommon Finding',
  rare: 'Rare Discovery',
  deep_cut: 'Specialist Knowledge',
  one_in_a_krillion: 'Medical Legend',
};

export function medMeterFromTier(tier: TierId | null): number {
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

export type MedicalRank = {
  id: string;
  title: string;
  blurb: string;
};

export function medicalRankForRun(score: number, prompts = MED_PROMPT_COUNT): MedicalRank {
  const avg = prompts > 0 ? score / prompts : 0;
  if (avg >= 75) {
    return {
      id: 'legend',
      title: 'Medical Legend',
      blurb: 'Highest rank — specialist-level answers owned the mission.',
    };
  }
  if (avg >= 55) {
    return {
      id: 'specialist',
      title: 'Medical Specialist',
      blurb: 'Expert run — uncommon clinical terms carried you.',
    };
  }
  if (avg >= 35) {
    return {
      id: 'clinical',
      title: 'Clinical Thinker',
      blurb: 'Advanced — you pushed past textbook first answers.',
    };
  }
  if (avg >= 15) {
    return {
      id: 'explorer',
      title: 'Anatomy Explorer',
      blurb: 'Intermediate — keep hunting more specific findings.',
    };
  }
  return {
    id: 'rookie',
    title: 'Medical Rookie',
    blurb: 'Beginner rank — try again and skip the most obvious answer.',
  };
}

export function getMedicalPack(id?: string): DivePack {
  if (id) return MED_PACKS.find((p) => p.id === id) ?? MED_PACKS[0];
  return MED_PACKS[0];
}

export function getMedicalPackById(id: string): DivePack | null {
  return MED_PACKS.find((p) => p.id === id) ?? null;
}

export function toMedicalPublicPack(pack: DivePack): PublicDivePack {
  return {
    id: pack.id,
    title: pack.title,
    diveNumber: pack.diveNumber,
    promptSeconds: MEDICAL_CONFIG.promptSeconds,
    prompts: pack.prompts.map((p) => ({ id: p.id, prompt: p.prompt })),
  };
}
