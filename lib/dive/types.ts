export const METERS_PER_POINT = 10;

/** Unlimited defaults (extra dives) */
export const UNLIMITED_PROMPT_SECONDS = 20;
export const UNLIMITED_PROMPTS_PER_DIVE = 6;

/** Daily Dive defaults (shared day) — one set for everyone */
export const DAILY_PROMPT_SECONDS = 20;
export const DAILY_PROMPTS_PER_DIVE = 8;

/** @deprecated use mode-specific constants */
export const PROMPT_SECONDS = UNLIMITED_PROMPT_SECONDS;
/** @deprecated use mode-specific constants */
export const PROMPTS_PER_DIVE = UNLIMITED_PROMPTS_PER_DIVE;

export type DiveMode = 'unlimited' | 'daily';

export const MODE_CONFIG: Record<
  DiveMode,
  { promptSeconds: number; promptsPerDive: number; label: string }
> = {
  unlimited: {
    promptSeconds: UNLIMITED_PROMPT_SECONDS,
    promptsPerDive: UNLIMITED_PROMPTS_PER_DIVE,
    label: 'Unlimited',
  },
  daily: {
    promptSeconds: DAILY_PROMPT_SECONDS,
    promptsPerDive: DAILY_PROMPTS_PER_DIVE,
    label: 'Daily Dive',
  },
};

/** Rarity tiers */
export type TierId =
  | 'plankton'
  | 'too_clever'
  | 'schooler'
  | 'rare'
  | 'deep_cut'
  | 'one_in_a_krillion';

export type AnswerEntry = {
  label: string;
  aliases: string[];
  points: 10 | 15 | 30 | 60 | 85 | 100;
  tier: TierId;
};

export type DivePrompt = {
  id: string;
  prompt: string;
  answers: AnswerEntry[];
};

export type DivePack = {
  id: string;
  title: string;
  diveNumber: number;
  prompts: DivePrompt[];
};

/** Safe pack sent to the client (no answer key) */
export type PublicDivePack = {
  id: string;
  title: string;
  diveNumber: number;
  date?: string;
  promptSeconds: number;
  prompts: { id: string; prompt: string }[];
};

export type PromptResult = {
  promptId: string;
  prompt: string;
  submitted: string | null;
  acceptedLabel: string | null;
  tier: TierId | null;
  tierLabel: string | null;
  points: number;
  timedOut: boolean;
};

export type DiveRun = {
  packId: string;
  diveNumber: number;
  results: PromptResult[];
  score: number;
  depthMeters: number;
};

export type DivePhase = 'lobby' | 'predive' | 'prompt' | 'result' | 'summary';
