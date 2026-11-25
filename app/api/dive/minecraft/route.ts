import { NextResponse } from 'next/server';
import {
  getMinecraftDailyPack,
  getMinecraftUnlimitedPack,
  toMinecraftPublicPack,
  utcDateKey,
} from '@/lib/dive/minecraft';

export const dynamic = 'force-dynamic';

/** Minecraft Krillion public packs (no answer keys). ?mode=daily|unlimited */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('mode') === 'unlimited' ? 'unlimited' : 'daily';
  const now = new Date();

  if (mode === 'unlimited') {
    const pack = getMinecraftUnlimitedPack();
    return NextResponse.json({
      mode: 'unlimited' as const,
      pack: toMinecraftPublicPack(pack),
    });
  }

  const pack = getMinecraftDailyPack(now);
  return NextResponse.json({
    date: utcDateKey(now),
    mode: 'daily' as const,
    pack: toMinecraftPublicPack(pack, { date: utcDateKey(now) }),
  });
}
