import type { DiveMode, DivePack, PublicDivePack } from '@/lib/dive/types';
import { MODE_CONFIG, UNLIMITED_PROMPTS_PER_DIVE } from '@/lib/dive/types';
import { getDailyPackById } from '@/lib/dive/daily';
import { getMinecraftPackById } from '@/lib/dive/minecraft';
import { getPokemonPackById } from '@/lib/dive/pokemon';
import { getSportsPackById } from '@/lib/dive/sports';
import { getLongShotPackById } from '@/lib/dive/long-shot';
import { getOikPackById } from '@/lib/dive/one-in-a-krillion';
import { getStrangerThingsPackById } from '@/lib/dive/stranger-things';
import { getFarflungPackById } from '@/lib/dive/farflung';
import { getAnimalPackById } from '@/lib/dive/animal';
import { getSciencePackById } from '@/lib/dive/science';
import { getMedicalPackById } from '@/lib/dive/medical';
import { getGreatApePackById } from '@/lib/dive/great-ape';

import classic1 from '@/data/dives/classic-1.json';
import classic2 from '@/data/dives/classic-2.json';
import classic3 from '@/data/dives/classic-3.json';
import classic4 from '@/data/dives/classic-4.json';
import classic5 from '@/data/dives/classic-5.json';

const PACKS: DivePack[] = [
  classic1 as DivePack,
  classic2 as DivePack,
  classic3 as DivePack,
  classic4 as DivePack,
  classic5 as DivePack,
].sort((a, b) => a.diveNumber - b.diveNumber);

for (const pack of PACKS) {
  if (pack.prompts.length !== UNLIMITED_PROMPTS_PER_DIVE) {
    throw new Error(`Dive ${pack.id} must have ${UNLIMITED_PROMPTS_PER_DIVE} prompts`);
  }
}

export function toPublicPack(
  pack: DivePack,
  mode: DiveMode,
  extras?: { date?: string }
): PublicDivePack {
  return {
    id: pack.id,
    title: pack.title,
    diveNumber: pack.diveNumber,
    date: extras?.date,
    promptSeconds: MODE_CONFIG[mode].promptSeconds,
    prompts: pack.prompts.map((p) => ({ id: p.id, prompt: p.prompt })),
  };
}

/** Resolve any known pack for server-side judging */
export function resolvePackById(id: string): DivePack | null {
  const unlimited = PACKS.find((p) => p.id === id);
  if (unlimited) return unlimited;
  const daily = getDailyPackById(id);
  if (daily) return daily;
  const minecraft = getMinecraftPackById(id);
  if (minecraft) return minecraft;
  const pokemon = getPokemonPackById(id);
  if (pokemon) return pokemon;
  const sports = getSportsPackById(id);
  if (sports) return sports;
  const longShot = getLongShotPackById(id);
  if (longShot) return longShot;
  const oik = getOikPackById(id);
  if (oik) return oik;
  const st = getStrangerThingsPackById(id);
  if (st) return st;
  const farflung = getFarflungPackById(id);
  if (farflung) return farflung;
  const animal = getAnimalPackById(id);
  if (animal) return animal;
  const science = getSciencePackById(id);
  if (science) return science;
  const medical = getMedicalPackById(id);
  if (medical) return medical;
  return getGreatApePackById(id);
}

export function listDivePacks(): DivePack[] {
  return PACKS;
}

export function getDivePack(idOrNumber: string | number = 'classic-1'): DivePack {
  if (typeof idOrNumber === 'number') {
    return PACKS.find((p) => p.diveNumber === idOrNumber) ?? PACKS[0];
  }
  return PACKS.find((p) => p.id === idOrNumber) ?? PACKS[0];
}

export function getNextDivePack(currentId: string): DivePack {
  const idx = PACKS.findIndex((p) => p.id === currentId);
  if (idx < 0) return PACKS[0];
  return PACKS[(idx + 1) % PACKS.length];
}

export function getDivePackCount(): number {
  return PACKS.length;
}
