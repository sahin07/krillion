import type { DivePack, PublicDivePack } from '@/lib/dive/types';
import { toPublicPack } from '@/lib/dive/dives';

import minecraftDaily01 from '@/data/dives/minecraft-daily-01.json';
import minecraftUnlimited1 from '@/data/dives/minecraft-unlimited-1.json';

const MC_DAILY: DivePack[] = [minecraftDaily01 as DivePack];
const MC_UNLIMITED: DivePack[] = [minecraftUnlimited1 as DivePack];

const MC_PROMPT_COUNT = 7;
const MC_PROMPT_SECONDS = 25;

for (const pack of [...MC_DAILY, ...MC_UNLIMITED]) {
  if (pack.prompts.length !== MC_PROMPT_COUNT) {
    throw new Error(`Minecraft pack ${pack.id} must have ${MC_PROMPT_COUNT} prompts`);
  }
}

export const MINECRAFT_CONFIG = {
  promptsPerDive: MC_PROMPT_COUNT,
  promptSeconds: MC_PROMPT_SECONDS,
  label: 'Minecraft Krillion',
} as const;

export function utcDateKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

export function getMinecraftDailyPack(d = new Date()): DivePack {
  const start = Date.UTC(2026, 0, 1);
  const today = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  const idx =
    ((Math.floor((today - start) / 86_400_000) % MC_DAILY.length) + MC_DAILY.length) %
    MC_DAILY.length;
  return MC_DAILY[idx];
}

export function getMinecraftUnlimitedPack(id?: string): DivePack {
  if (id) return MC_UNLIMITED.find((p) => p.id === id) ?? MC_UNLIMITED[0];
  return MC_UNLIMITED[0];
}

export function getMinecraftPackById(id: string): DivePack | null {
  return (
    MC_DAILY.find((p) => p.id === id) ?? MC_UNLIMITED.find((p) => p.id === id) ?? null
  );
}

export function listMinecraftUnlimitedPacks(): DivePack[] {
  return MC_UNLIMITED;
}

export function toMinecraftPublicPack(
  pack: DivePack,
  extras?: { date?: string }
): PublicDivePack {
  return {
    ...toPublicPack(pack, 'daily', extras),
    promptSeconds: MINECRAFT_CONFIG.promptSeconds,
  };
}
