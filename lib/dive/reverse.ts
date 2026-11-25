import { METERS_PER_POINT } from '@/lib/dive/types';

/** Reverse / Noillirk uses the same classic packs as Unlimited. */
export const REVERSE_PROMPT_SECONDS = 20;
export const REVERSE_PROMPTS_PER_DIVE = 6;

export const REVERSE_CONFIG = {
  promptSeconds: REVERSE_PROMPT_SECONDS,
  promptsPerDive: REVERSE_PROMPTS_PER_DIVE,
  label: 'Noillirk',
} as const;

/** Altitude risen with consensus (mirrors depth meters, flipped metaphor). */
export function altitudeFromScore(score: number): number {
  return score * METERS_PER_POINT;
}

export function formatAltitude(meters: number): string {
  return `${meters.toLocaleString('en-US')}m`;
}

export function zoneForAltitude(meters: number): { title: string; blurb: string } {
  if (meters < 200) {
    return { title: 'STREET LEVEL', blurb: 'still thinking alone. find the crowd.' };
  }
  if (meters < 1000) {
    return { title: 'THE ROOFTOPS', blurb: 'a few people nod. keep rising.' };
  }
  if (meters < 3800) {
    return { title: 'THE CLOUDS', blurb: 'consensus is forming. stay obvious.' };
  }
  if (meters < 6000) {
    return { title: 'THE STRATOSPHERE', blurb: 'everybody said it. you scored.' };
  }
  return { title: 'EDGE OF SPACE', blurb: 'pure crowd hit. noillirk territory.' };
}
