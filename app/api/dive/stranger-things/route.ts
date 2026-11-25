import { NextResponse } from 'next/server';
import {
  getStrangerThingsPack,
  toStrangerThingsPublicPack,
} from '@/lib/dive/stranger-things';

export const dynamic = 'force-dynamic';

/** Stranger Things Krillion public pack (no answer keys). */
export async function GET() {
  const pack = getStrangerThingsPack();
  return NextResponse.json({
    mode: 'stranger-things' as const,
    pack: toStrangerThingsPublicPack(pack),
  });
}
