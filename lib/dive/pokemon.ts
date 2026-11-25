import type { DivePack, PublicDivePack } from '@/lib/dive/types';
import { toPublicPack } from '@/lib/dive/dives';

import pokemonDaily01 from '@/data/dives/pokemon-daily-01.json';
import pokemonUnlimited1 from '@/data/dives/pokemon-unlimited-1.json';

const PK_DAILY: DivePack[] = [pokemonDaily01 as DivePack];
const PK_UNLIMITED: DivePack[] = [pokemonUnlimited1 as DivePack];

const PK_PROMPT_COUNT = 7;
const PK_PROMPT_SECONDS = 25;

for (const pack of [...PK_DAILY, ...PK_UNLIMITED]) {
  if (pack.prompts.length !== PK_PROMPT_COUNT) {
    throw new Error(`Pokémon pack ${pack.id} must have ${PK_PROMPT_COUNT} prompts`);
  }
}

export const POKEMON_CONFIG = {
  promptsPerDive: PK_PROMPT_COUNT,
  promptSeconds: PK_PROMPT_SECONDS,
  label: 'Pokémon Krillion',
} as const;

export function utcDateKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

export function getPokemonDailyPack(d = new Date()): DivePack {
  const start = Date.UTC(2026, 0, 1);
  const today = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  const idx =
    ((Math.floor((today - start) / 86_400_000) % PK_DAILY.length) + PK_DAILY.length) %
    PK_DAILY.length;
  return PK_DAILY[idx];
}

export function getPokemonUnlimitedPack(id?: string): DivePack {
  if (id) return PK_UNLIMITED.find((p) => p.id === id) ?? PK_UNLIMITED[0];
  return PK_UNLIMITED[0];
}

export function getPokemonPackById(id: string): DivePack | null {
  return PK_DAILY.find((p) => p.id === id) ?? PK_UNLIMITED.find((p) => p.id === id) ?? null;
}

export function listPokemonUnlimitedPacks(): DivePack[] {
  return PK_UNLIMITED;
}

export function toPokemonPublicPack(pack: DivePack, extras?: { date?: string }): PublicDivePack {
  return {
    ...toPublicPack(pack, 'daily', extras),
    promptSeconds: POKEMON_CONFIG.promptSeconds,
  };
}
