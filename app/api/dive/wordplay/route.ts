import { NextResponse } from 'next/server';
import { getWordplayPack, toWordplayPublicPack } from '@/lib/dive/wordplay';

export const dynamic = 'force-dynamic';

/** Wordplay Krillion public pack (no answer keys). */
export async function GET() {
  const pack = getWordplayPack();
  return NextResponse.json({
    mode: 'wordplay' as const,
    pack: toWordplayPublicPack(pack),
  });
}
