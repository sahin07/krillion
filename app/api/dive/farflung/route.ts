import { NextResponse } from 'next/server';
import { getFarflungPack, toFarflungPublicPack } from '@/lib/dive/farflung';

export const dynamic = 'force-dynamic';

/** Farflung public pack (no answer keys). */
export async function GET() {
  const pack = getFarflungPack();
  return NextResponse.json({
    mode: 'farflung' as const,
    pack: toFarflungPublicPack(pack),
  });
}
