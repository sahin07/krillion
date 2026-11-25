import {
  POINT_INVERT,
  REVERSE_TIER_LABELS,
  TIER_INVERT,
  TIER_LABELS,
} from '@/lib/dive/tiers';
import type { AnswerEntry, DivePack, DivePrompt, DiveRun, PromptResult } from '@/lib/dive/types';
import { METERS_PER_POINT } from '@/lib/dive/types';

export type ScoringMode = 'rare' | 'common';

export type JudgeOptions = {
  /** `common` = Noillirk / Reverse — crowd favorites score most */
  scoring?: ScoringMode;
};

/** Normalize for matching: lowercase, strip accents/punctuation, collapse spaces */
export function normalizeAnswer(raw: string): string {
  return raw
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function depthFromScore(score: number): number {
  return score * METERS_PER_POINT;
}

export function formatDepth(meters: number): string {
  return `${meters.toLocaleString('en-US')}m`;
}

function findMatch(prompt: DivePrompt, submitted: string): AnswerEntry | null {
  const key = normalizeAnswer(submitted);
  if (!key) return null;

  for (const answer of prompt.answers) {
    const candidates = [answer.label, ...answer.aliases].map(normalizeAnswer);
    if (candidates.includes(key)) return answer;
  }
  return null;
}

export function judgeAnswer(
  prompt: DivePrompt,
  submitted: string | null,
  timedOut: boolean,
  options?: JudgeOptions
): PromptResult {
  const scoring: ScoringMode = options?.scoring ?? 'rare';

  if (timedOut || !submitted || !normalizeAnswer(submitted)) {
    return {
      promptId: prompt.id,
      prompt: prompt.prompt,
      submitted: submitted?.trim() || null,
      acceptedLabel: null,
      tier: null,
      tierLabel: null,
      points: 0,
      timedOut: timedOut || !submitted?.trim(),
    };
  }

  const hit = findMatch(prompt, submitted);
  if (!hit) {
    return {
      promptId: prompt.id,
      prompt: prompt.prompt,
      submitted: submitted.trim(),
      acceptedLabel: null,
      tier: null,
      tierLabel: null,
      points: 0,
      timedOut: false,
    };
  }

  if (scoring === 'common') {
    const tier = TIER_INVERT[hit.tier];
    const points = POINT_INVERT[hit.points];
    return {
      promptId: prompt.id,
      prompt: prompt.prompt,
      submitted: submitted.trim(),
      acceptedLabel: hit.label,
      tier,
      tierLabel: REVERSE_TIER_LABELS[tier],
      points,
      timedOut: false,
    };
  }

  return {
    promptId: prompt.id,
    prompt: prompt.prompt,
    submitted: submitted.trim(),
    acceptedLabel: hit.label,
    tier: hit.tier,
    tierLabel: TIER_LABELS[hit.tier],
    points: hit.points,
    timedOut: false,
  };
}

export function createEmptyRun(pack: DivePack): DiveRun {
  return {
    packId: pack.id,
    diveNumber: pack.diveNumber,
    results: [],
    score: 0,
    depthMeters: 0,
  };
}

export function applyResult(run: DiveRun, result: PromptResult): DiveRun {
  const results = [...run.results, result];
  const score = results.reduce((sum, r) => sum + r.points, 0);
  return {
    ...run,
    results,
    score,
    depthMeters: depthFromScore(score),
  };
}

export function isDiveComplete(run: DiveRun, pack: DivePack): boolean {
  return run.results.length >= pack.prompts.length;
}
