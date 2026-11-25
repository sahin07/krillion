import { NextRequest, NextResponse } from 'next/server';
import { getDailyPackForDate, utcDateKey } from '@/lib/dive/daily';
import { toPublicPack } from '@/lib/dive/dives';

export const dynamic = 'force-dynamic';

function parseUtcDate(raw: string | null): Date | null {
  if (!raw) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) return null;
  const d = new Date(`${raw}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

/** Shared Daily Dive prompts (no answer key). Optional ?date=YYYY-MM-DD for archive. */
export async function GET(req: NextRequest) {
  const today = new Date();
  const todayKey = utcDateKey(today);
  const requested = parseUtcDate(req.nextUrl.searchParams.get('date'));

  let day = today;
  let date = todayKey;
  let practice = false;

  if (requested) {
    const key = utcDateKey(requested);
    // No future days; archive window = last 60 days
    const oldest = new Date(today);
    oldest.setUTCDate(oldest.getUTCDate() - 60);
    if (key > todayKey) {
      return NextResponse.json({ error: 'Future daily not available' }, { status: 400 });
    }
    if (requested < oldest) {
      return NextResponse.json({ error: 'Archive window exceeded' }, { status: 400 });
    }
    day = requested;
    date = key;
    practice = key !== todayKey;
  }

  const pack = getDailyPackForDate(day);

  return NextResponse.json({
    date,
    practice,
    mode: 'daily' as const,
    pack: toPublicPack(pack, 'daily', { date }),
  });
}
