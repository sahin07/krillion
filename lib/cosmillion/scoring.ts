import type { CosmillionOption, RarityBand } from '@/lib/cosmillion/types';

export const POINTS_POPULAR = 100;
export const POINTS_RARE = 300;
export const POINTS_ULTRA = 500;
export const STREAK_BONUS = 200;
export const RARE_STREAK_NEED = 3;

/** Share of the field that picked this option → point band (only for correct picks). */
export function bandForShare(share: number): RarityBand {
  if (share <= 0.25) return 'ultra';
  if (share <= 0.5) return 'rare';
  return 'popular';
}

export function pointsForBand(band: RarityBand): number {
  if (band === 'ultra') return POINTS_ULTRA;
  if (band === 'rare') return POINTS_RARE;
  return POINTS_POPULAR;
}

export function isRareBand(band: RarityBand): boolean {
  return band === 'rare' || band === 'ultra';
}

/**
 * Score one player's selections against the option set and pick counts.
 * `pickCounts[optionId]` = how many of the 8 selected that option.
 */
export function scoreSelections(
  selectedIds: string[],
  options: CosmillionOption[],
  pickCounts: Record<string, number>,
  fieldSize: number
): {
  points: number;
  rareHits: number;
  detail: { optionId: string; correct: boolean; band: RarityBand | null; points: number }[];
} {
  const byId = new Map(options.map((o) => [o.id, o]));
  let points = 0;
  let rareHits = 0;
  const detail: {
    optionId: string;
    correct: boolean;
    band: RarityBand | null;
    points: number;
  }[] = [];

  for (const id of selectedIds) {
    const opt = byId.get(id);
    if (!opt) continue;
    if (!opt.correct) {
      detail.push({ optionId: id, correct: false, band: null, points: 0 });
      continue;
    }
    const count = pickCounts[id] ?? 0;
    const share = fieldSize > 0 ? count / fieldSize : 1;
    const band = bandForShare(share);
    const pts = pointsForBand(band);
    points += pts;
    if (isRareBand(band)) rareHits += 1;
    detail.push({ optionId: id, correct: true, band, points: pts });
  }

  return { points, rareHits, detail };
}

/** Bot picks: bias toward correct options, with some noise and rarer skips. */
export function botSelect(options: CosmillionOption[]): string[] {
  const picked: string[] = [];
  for (const opt of options) {
    let p = 0.22;
    if (opt.correct) p = 0.55 + Math.random() * 0.35;
    else p = 0.08 + Math.random() * 0.18;
    if (Math.random() < p) picked.push(opt.id);
  }
  if (!picked.length && options.length) {
    const corrects = options.filter((o) => o.correct);
    const pool = corrects.length ? corrects : options;
    picked.push(pool[Math.floor(Math.random() * pool.length)].id);
  }
  return picked;
}

/** Survive if every selection is correct and at least one correct was picked. */
export function survivedRound(selectedIds: string[], options: CosmillionOption[]): boolean {
  if (!selectedIds.length) return false;
  const byId = new Map(options.map((o) => [o.id, o]));
  return selectedIds.every((id) => byId.get(id)?.correct === true);
}

export const CRYSTAL_RARE = 1;
export const CRYSTAL_ULTRA = 2;

/** Hunt mode: multiplier scales with crystal bank. */
export function huntMultiplier(crystals: number): number {
  return 1 + Math.floor(crystals / 3) * 0.5;
}

export function scoreHuntSelections(
  selectedIds: string[],
  options: CosmillionOption[],
  pickCounts: Record<string, number>,
  fieldSize: number,
  crystalsBefore: number
): {
  points: number;
  rareHits: number;
  crystalsGained: number;
  multiplier: number;
} {
  const base = scoreSelections(selectedIds, options, pickCounts, fieldSize);
  let crystalsGained = 0;
  let huntPoints = 0;
  const mult = huntMultiplier(crystalsBefore);

  for (const d of base.detail) {
    if (!d.correct || !d.band) continue;
    if (d.band === 'popular') {
      huntPoints += 50;
      continue;
    }
    if (d.band === 'rare') crystalsGained += CRYSTAL_RARE;
    if (d.band === 'ultra') crystalsGained += CRYSTAL_ULTRA;
    huntPoints += Math.round(d.points * mult);
  }

  return {
    points: huntPoints,
    rareHits: base.rareHits,
    crystalsGained,
    multiplier: mult,
  };
}
