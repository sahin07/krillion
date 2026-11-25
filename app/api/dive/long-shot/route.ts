import { NextResponse } from 'next/server';
import {
  getLongShotDailyPack,
  getLongShotUnlimitedPack,
  toLongShotPublicPack,
  utcDateKey,
} from '@/lib/dive/long-shot';

export const dynamic = 'force-dynamic';

/** Long Shot Krillion public packs (no answer keys). ?mode=daily|unlimited */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('mode') === 'unlimited' ? 'unlimited' : 'daily';
  const now = new Date();

  if (mode === 'unlimited') {
    const pack = getLongShotUnlimitedPack();
    return NextResponse.json({
      mode: 'unlimited' as const,
      pack: toLongShotPublicPack(pack),
    });
  }

  const pack = getLongShotDailyPack(now);
  return NextResponse.json({
    date: utcDateKey(now),
    mode: 'daily' as const,
    pack: toLongShotPublicPack(pack, { date: utcDateKey(now) }),
  });
}
