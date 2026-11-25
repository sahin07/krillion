import fs from 'fs';
import path from 'path';

let dictionary: Set<string> | null = null;
let freqRank: Map<string, number> | null = null;

function dataPath(file: string) {
  return path.join(process.cwd(), 'data', 'wordplay', file);
}

/** Extra Wordplay lexicon entries (rare challenge words). */
const LEXICON_EXTRAS = [
  'pulchritudinous',
  'beauteous',
  'resplendent',
  'sesquipedalian',
  'syzygy',
  'thalassic',
  'benthic',
  'pelagic',
  'quiescent',
  'onomatopoeia',
  'miaoued',
  'queueing',
  'imbue',
  'fortnight',
  'maelstrom',
  'sylph',
] as const;

/** Server-only English dictionary (lowercase a–z). */
export function getWordplayDictionary(): Set<string> {
  if (!dictionary) {
    const raw = fs.readFileSync(dataPath('dictionary.json'), 'utf8');
    dictionary = new Set(JSON.parse(raw) as string[]);
    for (const w of LEXICON_EXTRAS) dictionary.add(w);
  }
  return dictionary;
}

/** 1 = most common (Google 10k). Missing → not in top list. */
export function getWordplayFreqRank(): Map<string, number> {
  if (!freqRank) {
    const raw = fs.readFileSync(dataPath('freq-rank.json'), 'utf8');
    const obj = JSON.parse(raw) as Record<string, number>;
    freqRank = new Map(Object.entries(obj));
  }
  return freqRank;
}

export function isDictionaryWord(word: string): boolean {
  return getWordplayDictionary().has(word);
}
