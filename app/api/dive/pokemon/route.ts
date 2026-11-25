import { NextResponse } from 'next/server';
import {
  getPokemonDailyPack,
  getPokemonUnlimitedPack,
  toPokemonPublicPack,
  utcDateKey,
} from '@/lib/dive/pokemon';

export const dynamic = 'force-dynamic';

/** Pokémon Krillion public packs (no answer keys). ?mode=daily|unlimited */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('mode') === 'unlimited' ? 'unlimited' : 'daily';
  const now = new Date();

  if (mode === 'unlimited') {
    const pack = getPokemonUnlimitedPack();
    return NextResponse.json({
      mode: 'unlimited' as const,
      pack: toPokemonPublicPack(pack),
    });
  }

  const pack = getPokemonDailyPack(now);
  return NextResponse.json({
    date: utcDateKey(now),
    mode: 'daily' as const,
    pack: toPokemonPublicPack(pack, { date: utcDateKey(now) }),
  });
}
