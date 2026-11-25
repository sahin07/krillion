import { NextResponse } from 'next/server';
import { getDailyPackForDate, utcDateKey } from '@/lib/dive/daily';

export const dynamic = 'force-dynamic';

const DAYS = 14;

/** Recent Daily Dive archive metadata (no prompts). */
export async function GET() {
  const today = new Date();
  const todayKey = utcDateKey(today);
  const items: {
    date: string;
    diveNumber: number;
    title: string;
    packId: string;
    isToday: boolean;
  }[] = [];

  for (let i = 0; i < DAYS; i++) {
    const d = new Date(today);
    d.setUTCDate(d.getUTCDate() - i);
    const date = utcDateKey(d);
    const pack = getDailyPackForDate(d);
    items.push({
      date,
      diveNumber: pack.diveNumber,
      title: pack.title,
      packId: pack.id,
      isToday: date === todayKey,
    });
  }

  return NextResponse.json({ today: todayKey, items });
}
