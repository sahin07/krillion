import { NextResponse } from 'next/server';
import {
  getSportsDailyPack,
  getSportsUnlimitedPack,
  toSportsPublicPack,
  utcDateKey,
} from '@/lib/dive/sports';

export const dynamic = 'force-dynamic';

/** Sports / NBA Krillion public packs (no answer keys). ?mode=daily|unlimited */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('mode') === 'unlimited' ? 'unlimited' : 'daily';
  const now = new Date();

  if (mode === 'unlimited') {
    const pack = getSportsUnlimitedPack();
    return NextResponse.json({
      mode: 'unlimited' as const,
      pack: toSportsPublicPack(pack),
    });
  }

  const pack = getSportsDailyPack(now);
  return NextResponse.json({
    date: utcDateKey(now),
    mode: 'daily' as const,
    pack: toSportsPublicPack(pack, { date: utcDateKey(now) }),
  });
}
