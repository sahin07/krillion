import type { AnswerEntry, TierId } from '@/lib/dive/types';

export const TIER_LABELS: Record<TierId, string> = {
  plankton: 'Plankton',
  too_clever: 'Too Clever',
  schooler: 'Schooler',
  rare: 'Rare',
  deep_cut: 'Deep Cut',
  one_in_a_krillion: 'One in a Krillion',
};

/** Labels when common answers win (Noillirk / Reverse Krillion). */
export const REVERSE_TIER_LABELS: Record<TierId, string> = {
  plankton: 'Lonely Pick',
  too_clever: 'Obscure',
  schooler: 'Niche',
  rare: 'Familiar',
  deep_cut: 'Popular',
  one_in_a_krillion: 'Crowd Hit',
};

type PointValue = AnswerEntry['points'];

/** Invert curated rarity so crowd favorites score highest. */
export const POINT_INVERT: Record<PointValue, PointValue> = {
  10: 100,
  15: 85,
  30: 60,
  60: 30,
  85: 15,
  100: 10,
};

export const TIER_INVERT: Record<TierId, TierId> = {
  plankton: 'one_in_a_krillion',
  too_clever: 'deep_cut',
  schooler: 'rare',
  rare: 'schooler',
  deep_cut: 'too_clever',
  one_in_a_krillion: 'plankton',
};

export function pointsToTier(points: number): TierId | null {
  switch (points) {
    case 10:
      return 'plankton';
    case 15:
      return 'too_clever';
    case 30:
      return 'schooler';
    case 60:
      return 'rare';
    case 85:
      return 'deep_cut';
    case 100:
      return 'one_in_a_krillion';
    default:
      return null;
  }
}
