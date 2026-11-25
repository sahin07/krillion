import { normalizeAnswer } from '@/lib/dive/engine';
import type { TierId } from '@/lib/dive/types';
import { isDictionaryWord, getWordplayFreqRank } from '@/lib/dive/wordplay-lexicon';

const TIER_LABELS: Record<TierId, string> = {
  plankton: 'Common Word',
  too_clever: 'Unusual Word',
  schooler: 'Rare Word',
  rare: 'Very Rare Word',
  deep_cut: 'Ultra Rare Word',
  one_in_a_krillion: 'Wordplay Legend',
};

export type WordplayRule =
  | { type: 'rhyme'; of: string }
  | { type: 'startsWith'; letter: string }
  | { type: 'endsWith'; suffix: string }
  | { type: 'synonymBank'; of: string; bank: string[] }
  | { type: 'associationBank'; of: string; bank: string[] }
  | { type: 'consecutiveVowels'; count: number }
  | { type: 'pattern'; regex: string; flags?: string };

export type WordplayPromptDef = {
  id: string;
  prompt: string;
  rule: WordplayRule;
  /** Optional curated rarity overrides (points). */
  rarityOverrides?: Record<string, 10 | 20 | 40 | 60 | 80 | 100>;
};

export type WordplayJudgeOk = {
  ok: true;
  word: string;
  points: 10 | 20 | 40 | 60 | 80 | 100;
  tier: TierId;
  tierLabel: string;
  reason: 'override' | 'frequency' | 'dictionary-rare';
};

export type WordplayJudgeFail = {
  ok: false;
  word: string | null;
  code: 'empty' | 'timeout' | 'duplicate' | 'not_a_word' | 'rule_fail';
  message: string;
};

export type WordplayJudgeResult = WordplayJudgeOk | WordplayJudgeFail;

const POINTS_TO_TIER: Record<number, TierId> = {
  10: 'plankton',
  20: 'too_clever',
  40: 'schooler',
  60: 'rare',
  80: 'deep_cut',
  100: 'one_in_a_krillion',
};

/** Simple rhyme families + ending overlap for open answers. */
const RHYME_FAMILIES: Record<string, string[]> = {
  blue: ['ue', 'ew', 'oo'],
  night: ['ight', 'ite'],
  light: ['ight', 'ite'],
};

function rhymeEndings(target: string): string[] {
  const t = normalizeAnswer(target);
  if (RHYME_FAMILIES[t]) return RHYME_FAMILIES[t];
  if (t.length >= 3) return [t.slice(-3), t.slice(-2)];
  return [t.slice(-2)];
}

function rhymesWith(word: string, target: string): boolean {
  const w = normalizeAnswer(word);
  const t = normalizeAnswer(target);
  if (!w || !t || w === t) return false;
  const endings = rhymeEndings(t);
  return endings.some((end) => end.length >= 2 && w.endsWith(end) && w !== end);
}

function matchesRule(word: string, rule: WordplayRule): boolean {
  switch (rule.type) {
    case 'rhyme':
      return rhymesWith(word, rule.of);
    case 'startsWith': {
      const letter = rule.letter.toLowerCase();
      return word.startsWith(letter);
    }
    case 'endsWith':
      return word.endsWith(rule.suffix.toLowerCase());
    case 'synonymBank':
    case 'associationBank':
      return rule.bank.map(normalizeAnswer).includes(word);
    case 'consecutiveVowels': {
      const re = new RegExp(`[aeiou]{${rule.count}}`);
      return re.test(word);
    }
    case 'pattern': {
      try {
        return new RegExp(rule.regex, rule.flags ?? 'i').test(word);
      } catch {
        return false;
      }
    }
    default:
      return false;
  }
}

/**
 * Frequency → rarity bands (not word length).
 * Lower rank # = more common in Google 10k.
 */
export function pointsFromFrequency(word: string): 10 | 20 | 40 | 60 | 80 | 100 {
  const rank = getWordplayFreqRank().get(word);
  if (rank == null) {
    // In dictionary but outside top ~10k → Ultra Rare default
    return 80;
  }
  if (rank <= 400) return 10;
  if (rank <= 1500) return 20;
  if (rank <= 4000) return 40;
  if (rank <= 7000) return 60;
  if (rank <= 10000) return 80;
  return 100;
}

export function judgeWordplayAnswer(opts: {
  prompt: WordplayPromptDef;
  answer: string | null;
  timedOut?: boolean;
  usedWords?: string[];
}): WordplayJudgeResult {
  const { prompt, answer, timedOut, usedWords = [] } = opts;

  if (timedOut) {
    return { ok: false, word: null, code: 'timeout', message: 'Time ran out.' };
  }

  const word = answer ? normalizeAnswer(answer) : '';
  if (!word) {
    return { ok: false, word: null, code: 'empty', message: 'Type a word.' };
  }

  // Single token only for this mode
  if (word.includes(' ')) {
    return {
      ok: false,
      word,
      code: 'rule_fail',
      message: 'Enter one word (no spaces).',
    };
  }

  if (usedWords.map(normalizeAnswer).includes(word)) {
    return {
      ok: false,
      word,
      code: 'duplicate',
      message: 'You already used that word this challenge.',
    };
  }

  if (!isDictionaryWord(word)) {
    return {
      ok: false,
      word,
      code: 'not_a_word',
      message: 'Not in the Wordplay dictionary.',
    };
  }

  if (!matchesRule(word, prompt.rule)) {
    return {
      ok: false,
      word,
      code: 'rule_fail',
      message: 'That word does not match this challenge.',
    };
  }

  const override = prompt.rarityOverrides?.[word];
  const points = (override ?? pointsFromFrequency(word)) as 10 | 20 | 40 | 60 | 80 | 100;
  const tier = POINTS_TO_TIER[points];

  return {
    ok: true,
    word,
    points,
    tier,
    tierLabel: TIER_LABELS[tier],
    reason: override != null ? 'override' : getWordplayFreqRank().has(word) ? 'frequency' : 'dictionary-rare',
  };
}
